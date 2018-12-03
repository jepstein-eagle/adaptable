import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, Glyphicon, Checkbox, Col, Row, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { MathOperation, MessageType, DataType } from '../../Utilities/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IUIConfirmation } from '../../api/Interface/IMessage';
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { IPreviewResult, IPreviewInfo } from "../../api/Interface/IPreview";
import { UIHelper } from "../UIHelper";
import { IColumn } from "../../api/Interface/IColumn";
import { isNumber, isDate } from "util";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { PreviewHelper } from "../../Utilities/Helpers/PreviewHelper";
import { ColumnValueSelector } from "../Components/Selectors/ColumnValueSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { WARNING_BSSTYLE, DEFAULT_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";

interface BulkUpdatePopupProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
    BulkUpdateValue: string;
    PreviewInfo: IPreviewInfo;
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

export interface BulkUpdatePopupState {
    isShowingError: boolean,
    errorText: string,
    useSelector: boolean;
}

class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupProps, BulkUpdatePopupState> {


    constructor(props: BulkUpdatePopupProps) {
        super(props);
        this.state = { isShowingError: false, errorText: "", useSelector: false }
    }

    public componentDidMount() {
        this.props.onBulkUpdateCheckSelectedCells();
        //      this.props.onBulkUpdateValueChange("");
    }


    render() {

        let cssClassName: string = this.props.cssClassName + "__bulkupdate";

        let infoBody: any[] = ["Click ", <i><b>Apply to Grid</b></i>,
            " button to update all selected cells with the value that you specify", <br />, <br />,
            "Edits that break Cell Validation Rules will be flagged and prevented."]

        let col: IColumn
        if (this.props.PreviewInfo) {
            col  = ColumnHelper.getColumnFromId(this.props.PreviewInfo.ColumnId, this.props.Columns);
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
                cssClassName={cssClassName}
                UpdateValue={this.props.BulkUpdateValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={col}
                ShowPanel={showPanel}
                ShowHeader={true}
            /> :
            null

        return (<div className={cssClassName}>
            {col &&
                <div>
                    <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.BulkUpdateStrategyName} bsStyle="primary" glyphicon={StrategyConstants.BulkUpdateGlyph} infoBody={infoBody}>
                        <AdaptableBlotterForm onSubmit={() => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate()}>
                            <FormGroup controlId="formInlineKey">
                                {col.DataType == DataType.Date ?
                                    <div>
                                        <Col xs={12}>
                                            <HelpBlock>Enter a date value.  Alternatively, tick the checkbox and select from an existing column value.</HelpBlock>
                                        </Col>
                                        <Row>
                                            <Col xs={12}>
                                                <Checkbox className="ab_medium_margin" onChange={(e) => this.onUseColumnValuesSelectorChanged(e)} checked={this.state.useSelector}>{' '}Select from existing column values</Checkbox>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={9}>
                                                {this.state.useSelector ?
                                                    <ColumnValueSelector
                                                        cssClassName={cssClassName}
                                                        SelectedColumnValue={this.props.BulkUpdateValue}
                                                        SelectedColumn={col}
                                                        Blotter={this.props.Blotter}
                                                        onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)}
                                                        AllowNew={false} />
                                                    :
                                                    <FormControl value={String(this.props.BulkUpdateValue)} type={UIHelper.getDescriptionForDataType(col.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(col.DataType)} onChange={(e) => this.onBulkUpdateValueChange(e)} />
                                                }
                                            </Col>
                                            <Col xs={3}>
                                                <Button bsStyle={this.getButtonStyle()}
                                                    disabled={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent}
                                                    onClick={() => { this.onApplyClick() }} >Apply to Grid</Button>
                                            </Col>
                                        </Row>
                                    </div> :
                                    <div>
                                        <Col xs={12}>
                                            <HelpBlock>Select an existing column value from the dropdown, or enter a new value</HelpBlock>
                                        </Col> <Row>
                                            <Col xs={8}>
                                                <ColumnValueSelector
                                                    cssClassName={cssClassName}
                                                    SelectedColumnValue={this.props.BulkUpdateValue}
                                                    SelectedColumn={col}
                                                   Blotter = {this.props.Blotter} 
                                                    onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)} />
                                            </Col>
                                            <Col xs={4}>
                                                <Button bsStyle={this.getButtonStyle()}
                                                    disabled={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent || hasDataTypeError}
                                                    onClick={() => { this.onApplyClick() }} >Apply to Grid</Button>
                                                {' '}
                                                {(hasDataTypeError) &&
                                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Update Error"} bodyText={[dataTypeErrorMessage]} MessageType={MessageType.Error} />}
                                                {(StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} MessageType={MessageType.Warning} />}
                                                {(StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} MessageType={MessageType.Error} />}
                                            </Col>
                                        </Row>
                                    </div>
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

    private onApplyClick(): void {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplyBulkUpdate()
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
                return DEFAULT_BSSTYLE;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return WARNING_BSSTYLE;
            }
        }
        return "success";
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.System.BulkUpdatePreviewInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onBulkUpdateValueChange: (value: string) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(SystemRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let BulkUpdatePopup = connect(mapStateToProps, mapDispatchToProps)(BulkUpdatePopupComponent);

