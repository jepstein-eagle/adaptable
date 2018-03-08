import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormControl, Panel, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, Glyphicon } from 'react-bootstrap';
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
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { IPreviewResult, IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { UIHelper } from "../UIHelper";
import { IColumn } from "../../Core/Interface/IColumn";

interface BulkUpdatePopupProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
    BulkUpdateValue: string;
    PreviewInfo: IPreviewInfo;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => BulkUpdateRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupProps, {}> {

    
    constructor() {
        super();
        this.state = { isShowingError: false, errorText: "" }
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

        let previewHeader: string = this.props.PreviewInfo != null ? "Preview Results: " + (col ? col.FriendlyName : "") : "";
        let globalHasValidationPrevent = false
        let globalHasValidationWarning = false
        let globalHasOnlyValidationPrevent = true
        if (this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue)) {
            var previewItems = this.props.PreviewInfo.PreviewResults.map((previewResult: IPreviewResult) => {
                let hasValidationErrors: boolean = previewResult.ValidationRules.length > 0;
                let localHasValidationPrevent: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.StopEdit).length > 0
                let localHasValidationWarning: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.WarnUser).length > 0
                globalHasValidationPrevent = globalHasValidationPrevent || localHasValidationPrevent;
                globalHasValidationWarning = globalHasValidationWarning || localHasValidationWarning;
                if (!hasValidationErrors || localHasValidationWarning) {
                    globalHasOnlyValidationPrevent = false;
                }

                return <tr key={previewResult.Id}>
                    <td>{previewResult.InitialValue}</td>
                    <td>{previewResult.ComputedValue}</td>
                    {hasValidationErrors ?
                        <td>
                            {localHasValidationPrevent == true &&
                                <AdaptablePopover headerText={"Validation Error"} bodyText={[this.getValidationErrorMessage(previewResult.ValidationRules)]} popoverType={PopoverType.Error} />
                            }
                            {localHasValidationWarning == true &&
                                <AdaptablePopover headerText={"Validation Error"} bodyText={[this.getValidationErrorMessage(previewResult.ValidationRules)]} popoverType={PopoverType.Warning} />
                            }
                        </td>
                        :
                        <td> <Glyphicon glyph="ok" /> </td>
                    }
                </tr>
            });
            var header = <thead>
                <tr>
                    <th>Initial Value</th>
                    <th>Computed Value</th>
                    <th>Is Valid Edit</th>
                </tr>
            </thead>;
        }

        let globalValidationMessage: string = ""
        if (globalHasOnlyValidationPrevent) {
            globalValidationMessage = "All Cell Validations have failed (see Preview for details)."
        }
        else if (globalHasValidationPrevent && globalHasValidationWarning) {
            globalValidationMessage = "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm the updates which are set to 'warning' before they will be applied; those which are set to 'prevent' will be ignored."
        }
        else if (globalHasValidationWarning) {
            globalValidationMessage = "Some Cell Validations have failed (see Preview for details).\nYou will be asked to confirm these updates before they will be applied.";
        }
        else if (globalHasValidationPrevent) {
            globalValidationMessage = "Some Cell Validations have failed (see Preview for details).\nThese updates will be ignored.";
        }


        return (
            <div >
                {col &&
                    <div>
                        <PanelWithImage header={StrategyNames.BulkUpdateStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.BulkUpdateGlyph} infoBody={infoBody}>
                            <AdaptableBlotterForm inline onSubmit={() => globalHasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate()}>
                                <FormControl style={{ width: "300" }} value={String(this.props.BulkUpdateValue)} type={UIHelper.getDescriptionForDataType(col.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(col.DataType)} onChange={(e) => this.onBulkUpdateValueChange(e)} />
                                {' '}
                                <Button bsStyle={this.getButtonStyle(globalHasOnlyValidationPrevent, globalHasValidationPrevent, globalHasValidationWarning)}
                                    disabled={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || globalHasOnlyValidationPrevent}
                                    onClick={() => { globalHasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplyBulkUpdate() }} >Apply to Grid</Button>
                                {' '}
                                {(globalHasValidationWarning) &&
                                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Warning} />}
                                {(!globalHasValidationWarning && globalHasValidationPrevent) &&
                                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Error} />}
                            </AdaptableBlotterForm>
                        </PanelWithImage>
                        {StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && StringExtensions.IsNotNullOrEmpty(globalValidationMessage) &&
                            <Panel header={previewHeader} bsStyle="info" style={divStyle}>
                                <Table >
                                    {header}
                                    <tbody>
                                        {previewItems}
                                    </tbody>
                                </Table>
                            </Panel>
                        }
                    </div>
                }
            </div>

        );
    }

    private onBulkUpdateValueChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        
        this.props.onBulkUpdateValueChange(e.value);
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

    private getButtonStyle(globalHasOnlyValidationPrevent: boolean, globalHasValidationPrevent: boolean, globalHasValidationWarning: boolean): string {
        if (globalHasOnlyValidationPrevent) {
            return "default";
        }
        if (globalHasValidationWarning || globalHasValidationPrevent) {
            return "warning";
        }
        return "success";
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.BulkUpdate.PreviewInfo,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters
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

var divStyle: React.CSSProperties = {
    overflowY: 'auto',
    maxHeight: '400px'
};

