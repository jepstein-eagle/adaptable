﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { StatusColour, MathOperation } from '../../PredefinedConfig/Common/Enums';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { Flex } from 'rebass';
import Input from '../../components/Input';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import Dropdown from '../../components/Dropdown';

interface SmartEditToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<SmartEditToolPanelComponent> {
  SmartEditValue: number | undefined;
  MathOperation: MathOperation | undefined;
  IsValidSelection: boolean;
  PreviewInfo: IPreviewInfo;

  onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
  onSmartEditOperationChange: (
    MathOperation: MathOperation
  ) => SmartEditRedux.SmartEditChangeOperationAction;
  onSmartEditCheckSelectedCells: () => SystemRedux.SmartEditCheckCellSelectionAction;
  onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
}

interface SmartEditToolPanelComponentState {
  SelectedColumnId: string;
  IsMinimised: boolean;
}

class SmartEditToolPanelComponent extends React.Component<
  SmartEditToolPanelComponentProps,
  SmartEditToolPanelComponentState
> {
  constructor(props: SmartEditToolPanelComponentProps) {
    super(props);
    this.state = {
      SelectedColumnId: '',
      IsMinimised: true,
    };
  }
  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable._on('CellsSelected', () => {
        this.props.onSmartEditCheckSelectedCells();
      });
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn = StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)
      ? ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns)
      : null;

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

    let operations: any[] = EnumExtensions.getNames(MathOperation)
      .filter(e => e != MathOperation.Replace)
      .map((operation: MathOperation, index) => {
        return {
          label: operation,
          value: operation,
        };
      });

    const applyButtonStyle = {
      color: statusColour,
      fill: 'currentColor',
    };

    let shouldDisable: boolean =
      this.props.AccessLevel == 'ReadOnly' ||
      !this.props.IsValidSelection ||
      this.props.Adaptable.api.internalApi.isGridInPivotMode();

    let content = (
      <Flex flexDirection="column" alignItems="stretch" className="ab-ToolPanel__SmartEdit__wrap">
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__SmartEdit__wrap">
          <Dropdown
            style={{ minWidth: 90 }}
            showEmptyItem={false}
            className="ab-ToolPanel__SmartEdit__select"
            value={this.props.MathOperation}
            options={operations}
            showClearButton={false}
            onChange={(mathOperation: string) => this.onchangeMathOperation(mathOperation)}
          />
          <Input
            style={{
              width: '5rem',
            }}
            className="ab-ToolPanel__SmartEdit__select-value"
            value={this.props.SmartEditValue.toString()}
            type="number"
            placeholder="Enter a Number"
            step="any"
            onChange={(e: React.SyntheticEvent) => this.onSmartEditValueChange(e)}
            disabled={shouldDisable}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__SmartEdit_wrap">
          {!shouldDisable && (
            <ButtonApply
              marginLeft={2}
              onClick={() => this.onApplyClick()}
              style={applyButtonStyle}
              className="ab-ToolPanel__SmartEdit__apply"
              tooltip="Apply Smart Edit"
              disabled={
                StringExtensions.IsNullOrEmpty(`${this.props.SmartEditValue}`) ||
                (this.props.PreviewInfo != null &&
                  this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
              }
              AccessLevel={this.props.AccessLevel}
            >
              Edit
            </ButtonApply>
          )}

          {!shouldDisable && (
            <AdaptablePopover
              headerText="Preview Results"
              className="ab-ToolPanel__SmartEdit__info"
              //  tooltipText="Preview Results"
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
        className="ab-ToolPanel__SmartEdit"
        headerText={StrategyConstants.SmartEditStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('SmartEdit')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  private onSmartEditValueChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.props.onSmartEditValueChange(Number(e.value));
  }

  private getStatusColour(): StatusColour {
    if (
      StringExtensions.IsNotNullOrEmpty(`${this.props.SmartEditValue}`) &&
      this.props.PreviewInfo
    ) {
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
      : this.onApplySmartEdit();
  }

  private onConfirmWarningCellValidation() {
    let confirmAction: Redux.Action = SmartEditRedux.SmartEditApply(true);
    let cancelAction: Redux.Action = SmartEditRedux.SmartEditApply(false);
    let confirmation: IUIConfirmation = this.props.Adaptable.ValidationService.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction
    );
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  private onchangeMathOperation(mathOperation: string) {
    this.props.onSmartEditOperationChange(mathOperation as MathOperation);
  }

  onApplySmartEdit(): any {
    this.props.onApplySmartEdit();
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<SmartEditToolPanelComponentProps> {
  return {
    SmartEditValue: state.SmartEdit.SmartEditValue,
    MathOperation: state.SmartEdit.MathOperation,
    IsValidSelection: state.System.IsValidSmartEditSelection,
    PreviewInfo: state.System.SmartEditPreviewInfo,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SmartEditToolPanelComponentProps> {
  return {
    onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
    onSmartEditOperationChange: (SmartEditOperation: MathOperation) =>
      dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
    onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
    onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SmartEditStrategyId,
          ScreenPopups.SmartEditPopup
        )
      ),
  };
}

export let SmartEditToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartEditToolPanelComponent);
