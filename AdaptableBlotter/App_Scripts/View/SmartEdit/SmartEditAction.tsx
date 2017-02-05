/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, Modal } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { SmartEditOperation } from '../../Core/Enums'
import { ISmartEditPreview, ISmartEditPreviewResult } from '../../Core/Interface/ISmartEditStrategy'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../PanelWithImage';
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ErrorPopover } from '../ErrorPopover';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { ISmartEditStrategy } from '../../Core/Interface/ISmartEditStrategy';
import * as StrategyIds from '../../Core/StrategyIds'


interface SmartEditActionProps extends IStrategyViewPopupProps<SmartEditActionComponent> {
    SmartEditValue: number,
    SmartEditOperation: SmartEditOperation,
    Preview: ISmartEditPreview,
    Columns: IColumn[],
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditSetValueAction;
    onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => SmartEditRedux.SmartEditSetOperationAction;
    fetchSelectedCells: () => SmartEditRedux.SmartEditFetchPreviewAction;
    onWindowClose: () => PopupRedux.HidePopupAction,
}

class SmartEditActionComponent extends React.Component<SmartEditActionProps, {}> {

    constructor() {
        super();
        this.state = { isShowingError: false, errorText: "" }
    }

    public componentDidMount() {
        this.props.fetchSelectedCells();
    }


    render() {
        let previewHeader: string = this.props.Preview != null ? "Preview Results: " + this.props.Columns.find(c => c.ColumnId == this.props.Preview.ColumnId).FriendlyName : "";

        if (this.props.Preview && !isNaN(this.props.SmartEditValue)) {
            var previewItems = this.props.Preview.PreviewResults.map((previewResult: ISmartEditPreviewResult) => {
                let hasValidationErrors: boolean = previewResult.ValidationRules.length > 0;
                return <tr key={previewResult.Id}>
                    <td>{previewResult.InitialValue}</td>
                    <td>{previewResult.ComputedValue}</td>
                    {hasValidationErrors ?
                        <td>
                            <ErrorPopover headerText={"Validation Error"} bodyText={this.getValidationErrorMessage(previewResult.ValidationRules[0])} />
                        </td>
                        : <td> <Glyphicon glyph="ok" /> </td>}
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
        return (
            <div >
                <PanelWithImage header="Smart Edit Details" bsStyle="primary" glyphicon="pencil">
                    <Form inline>
                        <FormGroup controlId="formInlineName">
                            <InputGroup>
                                <DropdownButton title={SmartEditOperation[this.props.SmartEditOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                                    <MenuItem eventKey="1" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Sum)}>{SmartEditOperation[SmartEditOperation.Sum]}</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Ratio)}>{SmartEditOperation[SmartEditOperation.Ratio]}</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Absolute)}>{SmartEditOperation[SmartEditOperation.Absolute]}</MenuItem>
                                </DropdownButton>
                                <FormControl value={this.props.SmartEditValue.toString()} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onSmartEditValueChange(e)} />
                            </InputGroup>
                        </FormGroup>
                        {' '}
                        <Button bsStyle="info" disabled={isNaN(this.props.SmartEditValue)} onClick={() => this.onApplySmartEdit()} >Apply to Grid</Button>
                    </Form>
                </PanelWithImage>
                <Panel header={previewHeader} bsStyle="success" style={divStyle}>
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
        this.props.onSmartEditValueChange(parseFloat(e.value));
    }

    private getValidationErrorMessage(CellValidation: ICellValidationRule): string {
        let expressionDescription: string = (CellValidation.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, this.props.Columns, this.props.AdaptableBlotter) :
            "";
        return (CellValidation.Description + expressionDescription);
    }

    private onApplySmartEdit(): void {
        let smartEditStrategy: ISmartEditStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.SmartEditStrategyId) as ISmartEditStrategy;
        smartEditStrategy.ApplySmartEdit(this.props.Preview);
        this.props.onWindowClose();
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        SmartEditOperation: state.SmartEdit.SmartEditOperation,
        Preview: state.SmartEdit.Preview,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditSetValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => dispatch(SmartEditRedux.SmartEditSetOperation(SmartEditOperation)),
        fetchSelectedCells: () => dispatch(SmartEditRedux.SmartEditFetchPreview()),
        onWindowClose: () => dispatch(PopupRedux.HidePopup())
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