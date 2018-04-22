import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { MathOperation, CellValidationMode, PopoverType } from '../../Core/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { IUIConfirmation } from '../../Core/Interface/IMessage';
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { IPreviewResult, IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { PreviewHelper } from "../../Core/Helpers/PreviewHelper";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";

interface SmartEditPopupProps extends StrategyViewPopupProps<SmartEditPopupComponent> {
    SmartEditValue: string;
    SmartEditOperation: MathOperation;
    PreviewInfo: IPreviewInfo;
    onSmartEditValueChange: (value: string) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (SmartEditOperation: MathOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SmartEditRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

class SmartEditPopupComponent extends React.Component<SmartEditPopupProps, {}> {

    constructor() {
        super();
        this.state = { isShowingError: false, errorText: "" }
    }

    public componentDidMount() {
        this.props.onSmartEditCheckSelectedCells();
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__smartedit";
        let infoBody: any[] = ["Click ", <i><b>Apply to Grid</b></i>,
            " button to update all selected cells with the values showing in the Preview Results grid.", <br />, <br />,
            "This value will be calculated based on the Maths operation selected in the dropdown", <br />, <br />,
            "Smart Edits that break Cell Validation Rules will be flagged and prevented."]

        let col: IColumn
        if (this.props.PreviewInfo) {
            col = this.props.Columns.find(c => c.ColumnId == this.props.PreviewInfo.ColumnId)
        }


        let globalValidationMessage: string = PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.SmartEditValue);

        let showPanel: boolean = this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue)

        let previewPanel = showPanel ?
            <PreviewResultsPanel
            cssClassName={cssClassName} 
            UpdateValue={this.props.SmartEditValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={col}
                ShowPanel={showPanel}
            /> :
            null

        let operationMenuItems = EnumExtensions.getNames(MathOperation).filter(e => e != MathOperation.Replace).map((mathOperation: MathOperation, index) => {
            return <MenuItem key={index} eventKey="index" onClick={() => this.props.onSmartEditOperationChange(mathOperation)}>{mathOperation as MathOperation}</MenuItem>
        })

        return (<div className={cssClassName}>
           <PanelWithImage  cssClassName={cssClassName} header={StrategyNames.SmartEditStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.SmartEditGlyph} infoBody={infoBody}>
                    <AdaptableBlotterForm inline onSubmit={() => this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit()}>
                        <FormGroup controlId="formInlineName">
                            <InputGroup>
                                <DropdownButton title={MathOperation[this.props.SmartEditOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                                    {operationMenuItems}
                                </DropdownButton>
                                <FormControl onKeyPress={(e) => this.onKeyPress(e)} value={this.props.SmartEditValue.toString()} type="number" placeholder="Enter a Number" step="any" onChange={(e) => this.onSmartEditValueChange(e)} />
                            </InputGroup>
                        </FormGroup>
                        {' '}
                        <Button bsStyle={this.getButtonStyle()}
                            disabled={StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || (this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)}
                            onClick={() => { this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit() }} >Apply to Grid</Button>
                        {' '}
                        {(this.props.PreviewInfo && this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning) &&
                            <AdaptablePopover  cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Warning} />}
                        {(this.props.PreviewInfo && !this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning && this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) &&
                            <AdaptablePopover  cssClassName={cssClassName} headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Error} />}
                    </AdaptableBlotterForm>
                </PanelWithImage>
                {previewPanel}
            </div>
        );
    }

    private onKeyPress(e: React.KeyboardEvent<any>): any {

        // do someting
        // let s: any = e.target;
        //let x: any = s.key;
    }

    private onSmartEditValueChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.props.onSmartEditValueChange(e.value);
    }

    private getValidationErrorMessage(CellValidations: ICellValidationRule[]): string {
        let returnString: string[] = []
        for (let CellValidation of CellValidations) {
            let expressionDescription: string = (CellValidation.HasExpression) ?
                " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, this.props.Columns, this.props.UserFilters) :
                "";
            returnString.push(CellValidation.Description + expressionDescription)
        }

        return returnString.join("\n");
    }

    private onApplySmartEdit(): void {
        this.props.onApplySmartEdit()
    }

    private onConfirmWarningCellValidation() {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: SmartEditRedux.SmartEditApply(false),
            ConfirmAction: SmartEditRedux.SmartEditApply(true),
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
        SmartEditValue: state.SmartEdit.SmartEditValue,
        SmartEditOperation: state.SmartEdit.SmartEditOperation,
        PreviewInfo: state.SmartEdit.PreviewInfo,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: string) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: MathOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SmartEditRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let SmartEditPopup = connect(mapStateToProps, mapDispatchToProps)(SmartEditPopupComponent);

