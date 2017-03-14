/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, Modal } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { SmartEditOperation, CellValidationMode, PopoverType } from '../../Core/Enums'
import { ISmartEditPreview, ISmartEditPreviewResult } from '../../Core/Interface/ISmartEditStrategy'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import * as StrategyIds from '../../Core/StrategyIds'
import { StringExtensions } from '../../Core/Extensions';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface SmartEditActionProps extends IStrategyViewPopupProps<SmartEditActionComponent> {
    SmartEditValue: string;
    SmartEditOperation: SmartEditOperation;
    Preview: ISmartEditPreview;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    onSmartEditValueChange: (value: string) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SmartEditRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

class SmartEditActionComponent extends React.Component<SmartEditActionProps, {}> {

    constructor() {
        super();
        this.state = { isShowingError: false, errorText: "" }
    }

    public componentDidMount() {
        this.props.onSmartEditCheckSelectedCells();
    }


    render() {
        let previewHeader: string = this.props.Preview != null ? "Preview Results: " + this.props.Columns.find(c => c.ColumnId == this.props.Preview.ColumnId).FriendlyName : "";
        let globalHasValidationPrevent = false
        let globalHasValidationWarning = false
        let globalHasOnlyValidationPrevent = true
        if (this.props.Preview && StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue)) {
            var previewItems = this.props.Preview.PreviewResults.map((previewResult: ISmartEditPreviewResult) => {
                let hasValidationErrors: boolean = previewResult.ValidationRules.length > 0;
                let localHasValidationPrevent: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.Prevent).length > 0
                let localHasValidationWarning: boolean = previewResult.ValidationRules.filter(x => x.CellValidationMode == CellValidationMode.Warning).length > 0
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
                                <AdaptablePopover headerText={"Validation Error"} bodyText={this.getValidationErrorMessage(previewResult.ValidationRules)} popoverType={PopoverType.Error} />
                            }
                            {localHasValidationWarning == true &&
                                <AdaptablePopover headerText={"Validation Error"} bodyText={this.getValidationErrorMessage(previewResult.ValidationRules)} popoverType={PopoverType.Warning} />
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
                    <th>Valid Edit</th>
                </tr>
            </thead>;
        }

        let globalValidationMessage: string
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
                <PanelWithImage header="Smart Edit Details" bsStyle="primary" glyphicon="pencil">
                    <AdaptableBlotterForm inline onSubmit={() => globalHasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit()}>
                        <FormGroup controlId="formInlineName">
                            <InputGroup>
                                <DropdownButton title={SmartEditOperation[this.props.SmartEditOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                                    <MenuItem eventKey="1" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Sum)}>{SmartEditOperation[SmartEditOperation.Sum]}</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Ratio)}>{SmartEditOperation[SmartEditOperation.Ratio]}</MenuItem>
                                    <MenuItem eventKey="3" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Absolute)}>{SmartEditOperation[SmartEditOperation.Absolute]}</MenuItem>
                                </DropdownButton>
                                <FormControl value={this.props.SmartEditValue.toString()} type="number" placeholder="Enter a Number" step="any" onChange={(e: React.FormEvent) => this.onSmartEditValueChange(e)} />
                            </InputGroup>
                        </FormGroup>
                        {' '}
                        <Button bsStyle={this.getButtonStyle(globalHasOnlyValidationPrevent, globalHasValidationPrevent, globalHasValidationWarning)}
                            disabled={StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) || globalHasOnlyValidationPrevent}
                            onClick={() => { globalHasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit() }} >Apply to Grid</Button>
                        {' '}
                        {(globalHasValidationWarning) &&
                            <AdaptablePopover headerText={"Validation Error"} bodyText={globalValidationMessage} popoverType={PopoverType.Warning} />}
                        {(!globalHasValidationWarning && globalHasValidationPrevent) &&
                            <AdaptablePopover headerText={"Validation Error"} bodyText={globalValidationMessage} popoverType={PopoverType.Error} />}
                    </AdaptableBlotterForm>
                </PanelWithImage>
                <Panel header={previewHeader} bsStyle="info" style={divStyle}>
                    <Table >
                        {header}
                        <tbody>
                            {previewItems}
                        </tbody>
                    </Table>
                </Panel>
            </div>
        );
    }

    private onSmartEditValueChange(event: React.FormEvent) {
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
            CancelText: "Cancel",
            ConfirmationTitle: "Do you want to continue?",
            ConfirmationMsg: "This edit breaks Cell Validation rules that you have set.\nClick 'OK' to bypass these rules.\nClick 'Cancel' if you wish not to proceed with the edit.",
            ConfirmationText: "OK",
            CancelAction: SmartEditRedux.SmartEditApply(false),
            ConfirmAction: SmartEditRedux.SmartEditApply(true)
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
        SmartEditValue: state.SmartEdit.SmartEditValue,
        SmartEditOperation: state.SmartEdit.SmartEditOperation,
        Preview: state.SmartEdit.Preview,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: string) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onSmartEditCheckSelectedCells: () => dispatch(SmartEditRedux.SmartEditCheckCellSelection()),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}

export let SmartEditAction = connect(mapStateToProps, mapDispatchToProps)(SmartEditActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px'
};

let buttonFloatRightStyle = {
    float: 'right'
};