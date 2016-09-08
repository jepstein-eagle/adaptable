/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {FormControl, Panel, Form, FormGroup, DropdownButton, Button, Table, MenuItem, InputGroup} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as SmartEditRedux from '../Redux/ActionsReducers/SmartEditRedux'

import {SmartEditOperation} from '../Core/Enums'
import {ISmartEditPreview, ISmartEditValueTuple} from '../Core/Interface/ISmartEditStrategy'

interface SmartEditActionProps extends React.ClassAttributes<SmartEditActionComponent> {
    SmartEditValue: number,
    SmartEditOperation: SmartEditOperation,
    Preview: ISmartEditPreview,
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditSetValueAction;
    onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => SmartEditRedux.SmartEditSetOperationAction;
    fetchSelectedCells: () => SmartEditRedux.SmartEditFetchPreviewAction;
    onApplySmartEdit: () => SmartEditRedux.ApplySmarteditAction,
}

class SmartEditActionComponent extends React.Component<SmartEditActionProps, {}> {
    public componentDidMount() {
        this.props.fetchSelectedCells();
    }
    handleSmartEditValueChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onSmartEditValueChange(parseFloat(e.value));
    }
    render() {
        if (this.props.Preview && !isNaN(this.props.SmartEditValue)) {
            var previewItems = this.props.Preview.Values.map((tuple: ISmartEditValueTuple) => {
                return <tr key={tuple.Id}>
                    <td>{tuple.InitialValue}</td>
                    <td>{tuple.ComputedValue}</td>
                </tr>
            });
            var header = <thead>
                <tr>
                    <th>{this.props.Preview.InitialValueLabel}</th>
                    <th>{this.props.Preview.ComputedValueLabel}</th>
                </tr>
            </thead>;
        }
        return (
            <div >
                <Panel header="Edit Details" bsStyle="primary">
                    <Form inline>
                        <FormGroup controlId="formInlineName">
                            <InputGroup>
                                <DropdownButton title={SmartEditOperation[this.props.SmartEditOperation]} id="SmartEdit_Operation" componentClass={InputGroup.Button}>
                                    <MenuItem eventKey="1" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Sum) }>{SmartEditOperation[SmartEditOperation.Sum]}</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Ratio) }>{SmartEditOperation[SmartEditOperation.Ratio]}</MenuItem>
                                    <MenuItem eventKey="2" onClick={() => this.props.onSmartEditOperationChange(SmartEditOperation.Absolute) }>{SmartEditOperation[SmartEditOperation.Absolute]}</MenuItem>
                                </DropdownButton>
                                <FormControl value={this.props.SmartEditValue} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.handleSmartEditValueChange(e) }/>
                            </InputGroup>
                        </FormGroup>
                        {' '}
                        <Button bsStyle="primary" disabled={isNaN(this.props.SmartEditValue) } onClick={() => this.props.onApplySmartEdit() } >Apply to Grid</Button>
                    </Form>
                </Panel>
                <Panel header="Preview Results" bsStyle="success" style={divStyle}>
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
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        SmartEditValue: state.SmartEdit.SmartEditValue,
        SmartEditOperation: state.SmartEdit.SmartEditOperation,
        Preview: state.SmartEdit.Preview
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditSetValue(value)),
        onSmartEditOperationChange: (SmartEditOperation: SmartEditOperation) => dispatch(SmartEditRedux.SmartEditSetOperation(SmartEditOperation)),
        onApplySmartEdit: () => dispatch(SmartEditRedux.ApplySmartedit()),
        fetchSelectedCells: () => dispatch(SmartEditRedux.SmartEditFetchPreview())
    };
}

export let SmartEditAction = connect(mapStateToProps, mapDispatchToProps)(SmartEditActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px'
};