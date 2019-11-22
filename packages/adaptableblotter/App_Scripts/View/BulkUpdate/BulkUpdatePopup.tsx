import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MessageType, DataType } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptablePopover } from '../AdaptablePopover';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { UIHelper } from '../UIHelper';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { PreviewHelper } from '../../Utilities/Helpers/PreviewHelper';
import { ColumnValueSelector } from '../Components/Selectors/ColumnValueSelector';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import CheckBox from '../../components/CheckBox';
import { Box, Flex } from 'rebass';
import Input from '../../components/Input';
import SimpleButton from '../../components/SimpleButton';
import HelpBlock from '../../components/HelpBlock';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IStrategyActionReturn';

interface BulkUpdatePopupProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
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

export interface BulkUpdatePopupState {
  isShowingError: boolean;
  errorText: string;
  useSelector: boolean;
}

class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupProps, BulkUpdatePopupState> {
  constructor(props: BulkUpdatePopupProps) {
    super(props);
    this.state = { isShowingError: false, errorText: '', useSelector: false };
  }

  public componentDidMount() {
    this.props.onBulkUpdateValueChange('');
    this.props.onBulkUpdateCheckSelectedCells();
  }

  render() {
    let infoBody: any[] = [
      'Click ',
      <i>
        <b>Apply to Grid</b>
      </i>,
      ' button to update all selected cells with the value that you specify',
      <br />,
      <br />,
      'Edits that break Cell Validation Rules will be flagged and prevented.',
    ];

    let col: AdaptableBlotterColumn | undefined = this.props.BulkUpdateValidationResult.Column;

    let hasDataTypeError = false;
    let dataTypeErrorMessage = '';
    if (col && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
      // check that the update value is a number for a numeric column.  not issue for dates as we dont allow free text
      if (col.DataType == DataType.Number) {
        if (isNaN(Number(this.props.BulkUpdateValue))) {
          hasDataTypeError = true;
          dataTypeErrorMessage = 'This column only accepts numbers';
        }
      }
    }

    let globalValidationMessage: string = PreviewHelper.GetValidationMessage(
      this.props.PreviewInfo,
      this.props.BulkUpdateValue
    );

    let showPanel: boolean =
      this.props.PreviewInfo &&
      StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
      StringExtensions.IsNotNullOrEmpty(globalValidationMessage);

    let previewPanel = showPanel ? (
      <PreviewResultsPanel
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={col}
        ShowPanel={showPanel}
        ShowHeader={true}
      />
    ) : null;

    if (!col) {
      return null;
    }
    return (
      <PanelWithImage
        header={StrategyConstants.BulkUpdateStrategyName}
        glyphicon={StrategyConstants.BulkUpdateGlyph}
        infoBody={infoBody}
        variant="primary"
        bodyProps={{ padding: 2 }}
        style={{ height: '100%' }}
      >
        {col.DataType == DataType.Date ? (
          <>
            <HelpBlock marginTop={2} marginBottom={2}>
              Enter a date value. Alternatively, tick the checkbox and select from an existing
              column value.
            </HelpBlock>

            <Box>
              <CheckBox
                marginLeft={2}
                onChange={(checked: boolean) => this.onUseColumnValuesSelectorChanged(checked)}
                checked={this.state.useSelector}
              >
                {' '}
                Select from existing column values
              </CheckBox>
            </Box>

            <Flex padding={2} flexDirection="row" alignItems="center">
              <Flex alignItems="center" flexDirection="row" flex={1} marginRight={2}>
                {this.state.useSelector ? (
                  <ColumnValueSelector
                    SelectedColumnValue={this.props.BulkUpdateValue}
                    SelectedColumn={col}
                    Blotter={this.props.Blotter}
                    onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
                    AllowNew={false}
                    style={{ width: '100%', maxWidth: 'inherit' }}
                  />
                ) : (
                  <Input
                    style={{ width: '100%' }}
                    value={String(this.props.BulkUpdateValue)}
                    type={UIHelper.getDescriptionForDataType(col.DataType)}
                    placeholder={UIHelper.getPlaceHolderforDataType(col.DataType)}
                    onChange={(e: React.SyntheticEvent) => this.onBulkUpdateValueChange(e)}
                  />
                )}
              </Flex>

              <SimpleButton
                disabled={
                  StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                  this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent
                }
                onClick={() => {
                  this.onApplyClick();
                }}
                variant="raised"
                tone="accent"
              >
                Apply to Grid
              </SimpleButton>
            </Flex>
          </>
        ) : (
          <>
            <HelpBlock marginTop={2} marginBottom={2}>
              Select an existing column value from the dropdown, or enter a new value
            </HelpBlock>

            <Flex marginTop={2} flexDirection="row" alignItems="center">
              <Flex alignItems="center" flexDirection="row" flex={1} marginRight={2}>
                <ColumnValueSelector
                  SelectedColumnValue={this.props.BulkUpdateValue}
                  SelectedColumn={col}
                  Blotter={this.props.Blotter}
                  onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
                  style={{ width: '100%', maxWidth: 'inherit' }}
                />
              </Flex>
              <SimpleButton
                disabled={
                  StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) ||
                  this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent ||
                  hasDataTypeError
                }
                variant="raised"
                tone="accent"
                marginRight={2}
                onClick={() => {
                  this.onApplyClick();
                }}
              >
                Apply to Grid
              </SimpleButton>{' '}
              {hasDataTypeError && (
                <AdaptablePopover
                  headerText={'Update Error'}
                  bodyText={[dataTypeErrorMessage]}
                  MessageType={MessageType.Error}
                />
              )}
              {StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && (
                  <AdaptablePopover
                    headerText={'Validation Error'}
                    bodyText={[globalValidationMessage]}
                    MessageType={MessageType.Warning}
                  />
                )}
              {StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&
                !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning &&
                this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent && (
                  <AdaptablePopover
                    headerText={'Validation Error'}
                    bodyText={[globalValidationMessage]}
                    MessageType={MessageType.Error}
                  />
                )}
            </Flex>
          </>
        )}

        {previewPanel}
      </PanelWithImage>
    );
  }

  private onColumnValueSelectedChanged(selectedColumnValue: any) {
    this.props.onBulkUpdateValueChange(selectedColumnValue);
  }

  private onUseColumnValuesSelectorChanged(checked: boolean) {
    this.setState({ useSelector: checked } as BulkUpdatePopupState);
    this.props.onBulkUpdateValueChange('');
  }

  private onBulkUpdateValueChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.props.onBulkUpdateValueChange(e.value);
  }

  private onApplyClick(): void {
    this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
      ? this.onConfirmWarningCellValidation()
      : this.onApplyBulkUpdate();
  }

  private onApplyBulkUpdate(): void {
    this.props.onApplyBulkUpdate();
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
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
    PreviewInfo: state.System.BulkUpdatePreviewInfo,
    BulkUpdateValidationResult: state.System.BulkUpdateValidationResult,
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
  };
}

export let BulkUpdatePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkUpdatePopupComponent);
