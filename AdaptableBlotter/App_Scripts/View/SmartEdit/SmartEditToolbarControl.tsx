/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { SmartEditOperation, CellValidationMode, PopoverType } from '../../Core/Enums'
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ISmartEditPreview, ISmartEditPreviewResult } from '../../Core/Interface/ISmartEditStrategy'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt, IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControl } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { AdaptablePopover } from '../AdaptablePopover';
import * as StrategyIds from '../../Core/StrategyIds'


interface SmartEditToolbarControlComponentProps extends IStrategyViewPopupProps<SmartEditToolbarControlComponent> {
    SmartEditValue: string;
    SmartEditOperation: SmartEditOperation;
    Preview: ISmartEditPreview;
    onSmartEditValueChange: (value: string) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    SmartEditDashboardControl: IDashboardStrategyControl
}



class SmartEditToolbarControlComponent extends React.Component<SmartEditToolbarControlComponentProps, {}> {

    render(): any {

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
            })}

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

        let collapsedContent = <span style={labelStyle}> I'm collapsed</span>

        let SmartEditContent = <FormGroup controlId="formAdvancedSearch">

            <AdaptableBlotterForm inline onSubmit={() => globalHasValidationWarning ? this.onConfirmWarningCellValidation() : this.onApplySmartEdit()}>
                <FormGroup controlId="formInlineName">
                    <InputGroup>
                        <DropdownButton title={SmartEditOperation[this.props.SmartEditOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                            <MenuItem eventKey="1" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Add)}>{SmartEditOperation[SmartEditOperation.Add]}</MenuItem>
                            <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Multiply)}>{SmartEditOperation[SmartEditOperation.Multiply]}</MenuItem>
                            <MenuItem eventKey="3" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Replace)}>{SmartEditOperation[SmartEditOperation.Replace]}</MenuItem>
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
                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Warning} />}
                {(!globalHasValidationWarning && globalHasValidationPrevent) &&
                    <AdaptablePopover headerText={"Validation Error"} bodyText={[globalValidationMessage]} popoverType={PopoverType.Error} />}
            </AdaptableBlotterForm>

        </FormGroup>

        return <Panel className="small-padding-panel" >
            <AdaptableBlotterForm className='navbar-form' inline>
                <div style={headerStyle}>
                    <Glyphicon glyph="pencil" /> {' '}
                    <ControlLabel>SmartEdit:</ControlLabel>
                </div>
                {!this.props.SmartEditDashboardControl.IsCollapsed ? SmartEditContent :
                    collapsedContent
                }
                {' '}
                {this.props.SmartEditDashboardControl.IsCollapsed ?
                    <OverlayTrigger overlay={<Tooltip id="toolexpand">Expand</Tooltip>}>
                        <Button bsSize='small' style={marginBottomStyle} onClick={() => this.expandCollapseClicked()}>&gt;&gt;</Button>
                    </OverlayTrigger>
                    :
                    <OverlayTrigger overlay={<Tooltip id="toolcollapse">Collapse</Tooltip>}>
                        <Button bsSize='small' onClick={() => this.expandCollapseClicked()}>&lt;&lt;</Button>
                    </OverlayTrigger>
                }
            </AdaptableBlotterForm>
        </Panel>

    }

    private onSmartEditValueChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onSmartEditValueChange(e.value);
    }

    private onApplySmartEdit(): void {
        this.props.onApplySmartEdit()
    }
    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.SmartEditDashboardControl.Strategy, !this.props.SmartEditDashboardControl.IsCollapsed);
    }

    private getButtonStyle(globalHasOnlyValidationPrevent: boolean, globalHasValidationPrevent: boolean, globalHasValidationWarning: boolean): string {
        if (globalHasOnlyValidationPrevent) {
            return "default";
        }
        if (globalHasValidationWarning || globalHasValidationPrevent) {
            return "warning";
        }
        return "info";
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


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        SmartEditOperation: state.SmartEdit.SmartEditOperation,
        Preview: state.SmartEdit.Preview,
        SmartEditDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.SmartEditStrategyId),

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: string) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
        onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let SmartEditToolbarControl = connect(mapStateToProps, mapDispatchToProps)(SmartEditToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};


var headerStyle = {
    marginBottom: '2px'
};

var marginBottomStyle = {
    marginBottom: '4px'
};

