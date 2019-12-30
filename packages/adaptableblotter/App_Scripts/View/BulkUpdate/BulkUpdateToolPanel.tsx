import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptablePopover } from '../AdaptablePopover';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ColumnValueSelector } from '../Components/Selectors/ColumnValueSelector';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { StatusColour, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import join from '../../components/utils/join';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';

interface BulkUpdateToolPanelControlComponentProps
  extends ToolPanelStrategyViewPopupProps<BulkUpdateToolPanelControlComponent> {
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

interface BulkUpdateToolPanelComponentState {
  Disabled: boolean;
  IsMinimised: boolean;
}

class BulkUpdateToolPanelControlComponent extends React.Component<
  BulkUpdateToolPanelControlComponentProps,
  BulkUpdateToolPanelComponentState
> {
  constructor(props: BulkUpdateToolPanelControlComponentProps) {
    super(props);
    this.state = {
      Disabled: true,
      IsMinimised: true,
    };
  }
  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable._on('CellsSelected', () => {
        this.checkSelectedCells();
      });
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn: AdaptableColumn = this.props.BulkUpdateValidationResult.Column;

    let previewPanel = (
      <PreviewResultsPanel
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={selectedColumn}
        ShowPanel={true}
        ShowHeader={false}
        ValidationService={this.props.Adaptable.ValidationService}
      />
    );

    let shouldDisable: boolean =
      this.props.AccessLevel == AccessLevel.ReadOnly ||
      !this.props.BulkUpdateValidationResult.IsValid ||
      this.props.Adaptable.api.internalApi.isGridInPivotMode();

    const applyStyle = {
      color: statusColour,
      fill: 'currentColor',
    };
    let content = (
      <Flex
        flexDirection="column"
        alignItems="stretch"
        className={join(
          shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '',
          'ab-ToolPanel__BulkUpdate__wrap'
        )}
      >
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className={join(
            shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-ToolPanel__BulkUpdate__wrap'
          )}
        >
          <ColumnValueSelector
            newLabel="New"
            existingLabel="Existing"
            dropdownButtonProps={{
              listMinWidth: 150,
            }}
            className="ab-DashboardToolPanel__BulkUpdate__select"
            disabled={shouldDisable}
            SelectedColumnValue={this.props.BulkUpdateValue}
            SelectedColumn={selectedColumn}
            Adaptable={this.props.Adaptable}
            onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
          />
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className={join(
            shouldDisable ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-ToolPanel__BulkUpdate__wrap'
          )}
        >
          {!shouldDisable && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
            <ButtonApply
              marginLeft={2}
              className="ab-DashboardToolPanel__BulkUpdate__apply"
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
              className="ab-DashboardToolPanel__BulkUpdate__info"
              headerText="Preview Results"
              bodyText={[previewPanel]}
              MessageType={UIHelper.getMessageTypeByStatusColour(statusColour)}
              useButton={true}
              showEvent={'focus'}
              hideEvent="blur"
            />
          )}
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__BulkUpdate"
        headerText={StrategyConstants.BulkUpdateStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('BulkUpdate')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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
    let confirmation: IUIConfirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(
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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
    BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
    PreviewInfo: state.System.BulkUpdatePreviewInfo,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onBulkUpdateValueChange: (value: string) =>
      dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
    onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
    onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.BulkUpdateStrategyId,
          ScreenPopups.BulkUpdatePopup
        )
      ),
  };
}

export let BulkUpdateToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkUpdateToolPanelControlComponent);
