﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
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
import { StatusColour, MathOperation } from '../../PredefinedConfig/Common/Enums';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';
import Input from '../../components/Input';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';

interface SmartEditToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<SmartEditToolbarControlComponent> {
  SmartEditValue: number | string;
  MathOperation: MathOperation;
  IsValidSelection: boolean;
  PreviewInfo: IPreviewInfo;
  InPivotMode: Boolean;
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

interface SmartEditToolbarControlComponentState {
  SelectedColumnId: string;
}

class SmartEditToolbarControlComponent extends React.Component<
  SmartEditToolbarControlComponentProps,
  SmartEditToolbarControlComponentState
> {
  constructor(props: SmartEditToolbarControlComponentProps) {
    super(props);
    this.state = {
      SelectedColumnId: '',
    };
  }
  public componentDidMount() {
    if (this.props.api) {
      let adaptable: IAdaptable = this.props.api.internalApi.getAdaptableInstance();
      if (adaptable) {
        adaptable._on('CellsSelected', () => {
          this.props.onSmartEditCheckSelectedCells();
        });
      }
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn = StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)
      ? this.props.api.columnApi.getColumnFromId(this.state.SelectedColumnId)
      : null;

    let previewPanel = (
      <PreviewResultsPanel
        previewInfo={this.props.PreviewInfo}
        api={this.props.api}
        selectedColumn={selectedColumn}
        showPanel={true}
        showHeader={false}
      />
    );

    let operationMenuItems = EnumExtensions.getNames(MathOperation)
      .filter(e => e != MathOperation.Replace)
      .map((mathOperation: MathOperation, index) => {
        return {
          onClick: () => this.props.onSmartEditOperationChange(mathOperation),
          label: mathOperation as MathOperation,
        };
      });

    const applyButtonStyle = {
      color: statusColour,
      fill: 'currentColor',
    };

    let shouldDisable: boolean =
      this.props.accessLevel == 'ReadOnly' ||
      !this.props.IsValidSelection ||
      this.props.InPivotMode == true;

    let content = (
      <Flex alignItems="stretch" className={shouldDisable ? GeneralConstants.READ_ONLY_STYLE : ''}>
        <DropdownButton
          className="ab-DashboardToolbar__SmartEdit__select"
          marginRight={2}
          items={operationMenuItems}
          style={{ fontSize: 'small' }}
          columns={['label']}
          disabled={shouldDisable}
          variant="outlined"
        >
          {this.props.MathOperation}
        </DropdownButton>

        <Input
          style={{
            width: '5rem',
          }}
          className="ab-DashboardToolbar__SmartEdit__select-value"
          value={this.props.SmartEditValue.toString()}
          type="number"
          placeholder="Enter a Number"
          step="any"
          onChange={(e: React.SyntheticEvent) => this.onSmartEditValueChange(e)}
          disabled={shouldDisable}
        />

        {!shouldDisable && (
          <ButtonApply
            marginLeft={2}
            onClick={() => this.onApplyClick()}
            style={applyButtonStyle}
            className="ab-DashboardToolbar__SmartEdit__apply"
            tooltip="Apply Smart Edit"
            disabled={
              StringExtensions.IsNullOrEmpty(`${this.props.SmartEditValue}`) ||
              (this.props.PreviewInfo != null &&
                this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
            }
            accessLevel={this.props.accessLevel}
          />
        )}

        {!shouldDisable && (
          <AdaptablePopover
            headerText="Preview Results"
            className="ab-DashboardToolbar__SmartEdit__info"
            //  tooltipText="Preview Results"
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
        className="ab-DashboardToolbar__SmartEdit"
        headerText={StrategyConstants.SmartEditStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('SmartEdit')}
      >
        {content}
      </PanelDashboard>
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
    let confirmation: IUIConfirmation = this.props.api.internalApi
      .getValidationService()
      .createCellValidationUIConfirmation(confirmAction, cancelAction);
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  onApplySmartEdit(): any {
    this.props.onApplySmartEdit();
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<SmartEditToolbarControlComponentProps> {
  return {
    SmartEditValue: state.SmartEdit.SmartEditValue,
    MathOperation: state.SmartEdit.MathOperation,
    IsValidSelection: state.System.IsValidSmartEditSelection,
    PreviewInfo: state.System.SmartEditPreviewInfo,
    InPivotMode: state.Grid.IsGridInPivotMode,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SmartEditToolbarControlComponentProps> {
  return {
    onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
    onSmartEditOperationChange: (SmartEditOperation: MathOperation) =>
      dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
    onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
    onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SmartEditStrategyId,
          ScreenPopups.SmartEditPopup
        )
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let SmartEditToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartEditToolbarControlComponent);
