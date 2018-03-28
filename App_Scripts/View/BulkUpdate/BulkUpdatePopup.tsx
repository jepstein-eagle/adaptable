import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, Glyphicon, Checkbox, Col, Row } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { MathOperation, CellValidationMode, PopoverType, DataType } from '../../Core/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { IUIConfirmation } from '../../Core/Interface/IMessage';
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { IPreviewResult, IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { UIHelper } from "../UIHelper";
import { IColumn } from "../../Core/Interface/IColumn";
import { isNumber, isDate } from "util";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { PreviewHelper } from "../../Core/Helpers/PreviewHelper";
import { ColumnValueSelector } from "../Components/Selectors/ColumnValueSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";

interface BulkUpdatePopupProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
    BulkUpdateValue: string;
    PreviewInfo: IPreviewInfo;
     onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => BulkUpdateRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

export interface BulkUpdatePopupState {
    isShowingError: boolean,
    errorText: string,
    useSelector: boolean;
}

class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupProps, BulkUpdatePopupState> {


    constructor() {
        super();
        this.state = { isShowingError: false, errorText: "", useSelector: false }
    }

    public componentDidMount() {
        this.props.onBulkUpdateCheckSelectedCells();
        this.props.onBulkUpdateValueChange("");
    }


    render() {
        let infoBody: any[] = ["Click ", <i><b>Apply to Grid</b></i>,
            " button to update all selected cells with the value that you specify", <br />, <br />,
            "Edits that break Cell Validation Rules will be flagged and prevented."]

        let col: IColumn
        if (this.props.PreviewInfo) {
            col = this.props.Columns.find(c => c.ColumnId == this.props.PreviewInfo.ColumnId)
        }

        let hasDataTypeError = false;
        let dataTypeErrorMessage = ""
        if (col && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
            // check that the update value is a number for a numeric column.  not issue for dates as we dont allow free text
            if (col.DataType == DataType.Number) {
                if (isNaN(Number(this.props.BulkUpdateValue))) {
                    hasDataTypeError = true;
                    dataTypeErrorMessage = "This column only accepts numbers"
                }
            }
        }

        let globalValidationMessage: string = PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.BulkUpdateValue);

        let showPanel: boolean = this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && StringExtensions.IsNotNullOrEmpty(globalValidationMessage)

        let previewPanel = showPanel ?
            <PreviewResultsPanel
                UpdateValue={this.props.BulkUpdateValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={col}
                ShowPanel={showPanel}
            /> :
            null

        return (
            <div className="adaptable_blotter_style_popup_bulkupdate">
                {col &&
                      <div>
                        <PanelWithImage header={StrategyNames.BulkUpdateStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.BulkUpdateGlyph} infoBody={infoBody}>
                            <AdaptableBlotterForm onSubmit={() => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate()}>
                                <FormGroup controlId="formInlineKey">
                                    {col.DataType == DataType.Date ?
                                        <div>
                                            <Row>
                                                <Col xs={12}>
                                                    <Checkbox className="medium_margin_style" onChange={(e) => this.onUseColumnValuesSelectorChanged(e)} checked={this.state.useSelector}>{' '}Select from existing column values</Checkbox>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={9}>
                                                    {this.state.useSelector ?
                                                        <ColumnValueSelector
                                                            SelectedColumnValue={this.props.BulkUpdateValue}
                                                            SelectedColumn={col}
                                                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                                                            onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
                                                            AllowNew={false} />
                                                        :
                                                        <FormControl value={String(this.props.BulkUpdateValue)} type={UIHelper.getDescriptionForDataType(col.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(col.DataType)} onChange={(e) => this.onBulkUpdateValueChange(e)} />
                                                    }
                                                </Col>
                                                <Col xs={3}>
                                                    <Button bsStyle={this.getButtonStyle()}
                                                        disabled={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent}
                                                        onClick={() => { this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate() }} >Apply to Grid</Button>
                                                </Col>
                                            </Row>
                                        </div> :
                                        <Row>
                                            <Col xs={8}>
                                                <ColumnValueSelector
                                                    SelectedColumnValue={this.props.BulkUpdateValue}
                                                    SelectedColumn={col}
                                                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                                                    onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)} />
                                            </Col>
                                            <Col xs={4}>
                                                <Button bsStyle={this.getButtonStyle()}
                                                    disabled={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent || hasDataTypeError}
                                                    onClick={() => { this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate() }} >Apply to Grid</Button>
                                                {' '}
                                                {(hasDataTypeError) &&
                                                    <AdaptablePopover headerText={"Update Error"} bodyText={[dataTypeErrorMessage]} popoverType={PopoverType.Error} />}
                                                {(StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                                                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Warning} />}
                                                {(StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                                                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Error} />}
                                            </Col>
                                        </Row>
                                    }
                                </FormGroup>
                            </AdaptableBlotterForm>
                        </PanelWithImage>
                        {previewPanel}
                    </div>
                }
            </div>

        );

    }

    private onColumnValueSelectedChanged(selectedColumnValue: any) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    }

    private onUseColumnValuesSelectorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ useSelector: e.checked } as BulkUpdatePopupState)
        this.props.onBulkUpdateValueChange("");
    }

    private onBulkUpdateValueChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.props.onBulkUpdateValueChange(e.value);
    }


    private onApplyBulkUpdate(): void {
        this.props.onApplyBulkUpdate()
    }

    private onConfirmWarningCellValidation() {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: BulkUpdateRedux.BulkUpdateApply(false),
            ConfirmAction: BulkUpdateRedux.BulkUpdateApply(true),
            ShowCommentBox: true
        }
        this.props.onConfirmWarningCellValidation(confirmation)
    }

    private getButtonStyle(): string {
        if (this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return "default";
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return "warning";
            }
        }
        return "success";
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.BulkUpdate.PreviewInfo,
       };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onBulkUpdateValueChange: (value: string) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(BulkUpdateRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let BulkUpdatePopup = connect(mapStateToProps, mapDispatchToProps)(BulkUpdatePopupComponent);

