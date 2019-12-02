import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MathOperation, MessageType } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptablePopover } from '../AdaptablePopover';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { PreviewHelper } from '../../Utilities/Helpers/PreviewHelper';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import Input from '../../components/Input';
import { Flex } from 'rebass';
import DropdownButton from '../../components/DropdownButton';
import SimpleButton from '../../components/SimpleButton';
import { SyntheticEvent } from 'react';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();
interface SmartEditPopupProps extends StrategyViewPopupProps<SmartEditPopupComponent> {
  SmartEditValue: number;
  MathOperation: MathOperation;
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

class SmartEditPopupComponent extends React.Component<SmartEditPopupProps, {}> {
  constructor(props: SmartEditPopupProps) {
    super(props);
    this.state = { isShowingError: false, errorText: '' };
  }

  public componentDidMount() {
    this.props.onSmartEditCheckSelectedCells();
  }

  render() {
    let infoBody: any[] = [
      'Click ',
      <i>
        <b>Apply to Grid</b>
      </i>,
      ' button to update all selected cells with the values showing in the Preview Results grid.',
      <br />,
      <br />,
      'This value will be calculated based on the Maths operation selected in the dropdown',
      <br />,
      <br />,
      'Smart Edits that break Cell Validation Rules will be flagged and prevented.',
    ];

    let col: AdaptableBlotterColumn;
    if (this.props.PreviewInfo) {
      col = ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns);
    }

    let globalValidationMessage: string = PreviewHelper.GetValidationMessage(
      this.props.PreviewInfo,
      `${this.props.SmartEditValue}`
    );

    let showPanel: boolean =
      this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(`${this.props.SmartEditValue}`);

    let previewPanel = showPanel ? (
      <PreviewResultsPanel
        style={{ flex: '1 1 100%', overflow: 'initial' }}
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={col}
        ShowPanel={showPanel}
        ShowHeader={true}
        ValidationService={this.props.Blotter.ValidationService}
      />
    ) : null;

    let operationMenuItems = EnumExtensions.getNames(MathOperation)
      .filter(e => e != MathOperation.Replace)
      .map((mathOperation: MathOperation, index) => {
        return {
          label: mathOperation,
          onClick: () => {
            this.props.onSmartEditOperationChange(mathOperation);
          },
        };
      });

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.SmartEditStrategyName}
        glyphicon={StrategyConstants.SmartEditGlyph}
        infoBody={infoBody}
        bodyScroll={true}
        onKeyDown={(e: SyntheticEvent) => {
          if ((e as any).key === 'Enter') {
            this.submit();
          }
        }}
      >
        <Flex flexDirection="row" padding={2}>
          <DropdownButton
            items={operationMenuItems}
            columns={['label']}
            onMouseDown={preventDefault}
          >
            {MathOperation[this.props.MathOperation]}
          </DropdownButton>
          <Input
            value={this.props.SmartEditValue.toString()}
            marginLeft={2}
            marginRight={2}
            type="number"
            placeholder="Enter a Number"
            onChange={(e: React.SyntheticEvent) => this.onSmartEditValueChange(e)}
          />
          <SimpleButton
            tone={this.getButtonStyle() as 'neutral' | 'error' | 'success'}
            variant="raised"
            disabled={
              StringExtensions.IsNullOrEmpty(`${this.props.SmartEditValue}`) ||
              (this.props.PreviewInfo &&
                this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
            }
            onClick={() => {
              this.submit();
            }}
            marginRight={2}
          >
            Apply to Grid
          </SimpleButton>{' '}
          {this.props.PreviewInfo &&
            this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && (
              <AdaptablePopover
                headerText={'Validation Error'}
                bodyText={[globalValidationMessage]}
                MessageType={MessageType.Warning}
              />
            )}
          {this.props.PreviewInfo &&
            !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning &&
            this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent && (
              <AdaptablePopover
                headerText={'Validation Error'}
                bodyText={[globalValidationMessage]}
                MessageType={MessageType.Error}
              />
            )}
        </Flex>
        {previewPanel}
      </PanelWithImage>
    );
  }

  private submit() {
    this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
      ? this.onConfirmWarningCellValidation()
      : this.onApplySmartEdit();
  }

  private onSmartEditValueChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.props.onSmartEditValueChange(Number(e.value));
  }

  private onApplySmartEdit(): void {
    this.props.onApplySmartEdit();
  }

  private onConfirmWarningCellValidation() {
    let confirmAction: Redux.Action = SmartEditRedux.SmartEditApply(true);
    let cancelAction: Redux.Action = SmartEditRedux.SmartEditApply(false);
    let confirmation: IUIConfirmation = this.props.Blotter.ValidationService.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction
    );
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  private getButtonStyle(): string {
    if (this.props.PreviewInfo) {
      if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
        return 'neutral';
      }
      if (
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent
      ) {
        return 'error';
      }
    }
    return 'success';
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    SmartEditValue: state.SmartEdit.SmartEditValue,
    MathOperation: state.SmartEdit.MathOperation,
    PreviewInfo: state.System.SmartEditPreviewInfo,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
    onSmartEditOperationChange: (SmartEditOperation: MathOperation) =>
      dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
    onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
    onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
  };
}

export let SmartEditPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartEditPopupComponent);
