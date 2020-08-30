﻿import * as React from 'react';
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
import { StatusColour } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import join from '../../components/utils/join';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
import { IAdaptable } from '../../types';

interface BulkUpdateToolPanelControlComponentProps
  extends ToolPanelStrategyViewPopupProps<BulkUpdateToolPanelControlComponent> {
  BulkUpdateValue: string | undefined;
  BulkUpdateValidationResult: BulkUpdateValidationResult;
  PreviewInfo: IPreviewInfo;
  InPivotMode: Boolean;
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
    if (this.props.api) {
      let adaptable: IAdaptable = this.props.api.internalApi.getAdaptableInstance();
      if (adaptable) {
        this.props.api.internalApi.getAdaptableInstance()._on('CellsSelected', () => {
          this.checkSelectedCells();
        });
      }
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn: AdaptableColumn | undefined = this.props.BulkUpdateValidationResult.Column;

    let previewPanel = (
      <PreviewResultsPanel
        previewInfo={this.props.PreviewInfo}
        api={this.props.api}
        selectedColumn={selectedColumn}
        showPanel={true}
        showHeader={false}
      />
    );

    let shouldDisable: boolean =
      this.props.accessLevel == 'ReadOnly' ||
      !this.props.BulkUpdateValidationResult.IsValid ||
      this.props.InPivotMode == true;

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
          width="100%"
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
            className="ab-ToolPanel__BulkUpdate__select"
            disabled={shouldDisable}
            selectedColumnValue={this.props.BulkUpdateValue}
            selectedColumn={selectedColumn}
            api={this.props.api}
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
              className="ab-ToolPanel__BulkUpdate__apply"
              onClick={() => this.onApplyClick()}
              style={applyStyle}
              tooltip="Apply Bulk Update"
              disabled={
                StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                (this.props.PreviewInfo != null &&
                  this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
              }
              AccessLevel={this.props.accessLevel}
            >
              Update
            </ButtonApply>
          )}

          {!shouldDisable && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && (
            <AdaptablePopover
              className="ab-ToolPanel__BulkUpdate__info"
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
    let confirmation: IUIConfirmation = this.props.api.internalApi
      .getValidationService()
      .createCellValidationUIConfirmation(confirmAction, cancelAction);
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  onApplyBulkUpdate(): any {
    this.props.onApplyBulkUpdate();
    this.props.onBulkUpdateValueChange('');
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<BulkUpdateToolPanelControlComponentProps> {
  return {
    BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
    BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
    PreviewInfo: state.System.BulkUpdatePreviewInfo,
    InPivotMode: state.Grid.IsGridInPivotMode,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<BulkUpdateToolPanelControlComponentProps> {
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
