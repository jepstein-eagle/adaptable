import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptablePopover } from '../AdaptablePopover';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ColumnValueSelector } from '../Components/Selectors/ColumnValueSelector';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { StatusColour, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { CELLS_SELECTED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import { Flex } from 'rebass';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IStrategyActionReturn';
import { IColumn } from '../../Utilities/Interface/IColumn';

interface BulkUpdateToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<BulkUpdateToolbarControlComponent> {
  BulkUpdateValue: string;
  BulkUpdateValidationResult: BulkUpdateValidationResult;
  PreviewInfo: IPreviewInfo;

  onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
  onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
  onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
}

class BulkUpdateToolbarControlComponent extends React.Component<
  BulkUpdateToolbarControlComponentProps,
  {}
> {
  constructor(props: BulkUpdateToolbarControlComponentProps) {
    super(props);
    this.state = {
      Disabled: true,
    };
  }
  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.on(CELLS_SELECTED_EVENT, () => {
        this.checkSelectedCells();
      });
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn: IColumn = this.props.BulkUpdateValidationResult.Column;

    let previewPanel = (
      <PreviewResultsPanel
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={selectedColumn}
        ShowPanel={true}
        ShowHeader={false}
      />
    );

    let shouldDisable: boolean =
      this.props.AccessLevel == AccessLevel.ReadOnly ||
      !this.props.BulkUpdateValidationResult.IsValid ||
      this.props.Blotter.api.gridApi.IsGridInPivotMode();

    const applyStyle = {
      color: statusColour,
      fill: 'currentColor',
    };
    let content = (
      <Flex alignItems="stretch" className={shouldDisable ? GeneralConstants.READ_ONLY_STYLE : ''}>
        <ColumnValueSelector
          newLabel="New"
          existingLabel="Existing"
          dropdownButtonProps={{
            listMinWidth: 150,
          }}
          disabled={shouldDisable}
          SelectedColumnValue={this.props.BulkUpdateValue}
          SelectedColumn={selectedColumn}
          Blotter={this.props.Blotter}
          onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
        />

        {!shouldDisable && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
          <ButtonApply
            marginLeft={2}
            onClick={() => this.onApplyClick()}
            style={applyStyle}
            tooltip="Apply Bulk Update"
            disabled={
              StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
              (this.props.PreviewInfo != null &&
                this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
            }
            AccessLevel={this.props.AccessLevel}
          />
        )}

        {!shouldDisable && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
          <AdaptablePopover
            headerText="Preview Results"
            bodyText={[previewPanel]}
            MessageType={UIHelper.getMessageTypeByStatusColour(statusColour)}
            useButton={true}
            showEvent={'focus'}
            hideEvent="blur"
          />
        )}
      </Flex>
    );

    return (
      <PanelDashboard
        headerText={StrategyConstants.BulkUpdateStrategyName}
        glyphicon={StrategyConstants.BulkUpdateGlyph}
        onClose={() => this.props.onClose(StrategyConstants.BulkUpdateStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onColumnValueSelectedChanged(selectedColumnValue: any) {
    this.props.onBulkUpdateValueChange(selectedColumnValue);
  }

  private checkSelectedCells() {
    this.props.onBulkUpdateCheckSelectedCells();
    if (StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
      this.props.onBulkUpdateValueChange('');
    }
  }

  private getStatusColour(): StatusColour {
    if (StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo) {
      if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
        return StatusColour.Red;
      }
      if (
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent
      ) {
        return StatusColour.Amber;
      }
    }
    return StatusColour.Green;
  }

  private onApplyClick(): void {
    this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
      ? this.onConfirmWarningCellValidation()
      : this.onApplyBulkUpdate();
  }

  private onConfirmWarningCellValidation() {
    let confirmAction: Redux.Action = BulkUpdateRedux.BulkUpdateApply(true);
    let cancelAction: Redux.Action = BulkUpdateRedux.BulkUpdateApply(false);
    let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction
    );
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  onApplyBulkUpdate(): any {
    this.props.onApplyBulkUpdate();
    this.props.onBulkUpdateValueChange('');
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
    BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
    PreviewInfo: state.System.BulkUpdatePreviewInfo,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onBulkUpdateValueChange: (value: string) =>
      dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
    onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
    onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.BulkUpdateStrategyId,
          ScreenPopups.BulkUpdatePopup
        )
      ),
  };
}

export let BulkUpdateToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkUpdateToolbarControlComponent);
