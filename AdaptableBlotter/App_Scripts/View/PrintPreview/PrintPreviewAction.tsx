/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {FormControl, Panel, Form, FormGroup, Button, Table, MenuItem, ControlLabel, Checkbox} from 'react-bootstrap';
import {IColumn, IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';
import * as PrintPreviewRedux from '../../Redux/ActionsReducers/PrintPreviewRedux'
import {AdaptableBlotterState} from '../../Redux/Store/Interface/IAdaptableStore'


interface PrintPreviewActionProps extends React.ClassAttributes<PrintPreviewActionComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    onApplyPrintPreview: () => PrintPreviewRedux.ApplyPrintPreviewAction,
}

class PrintPreviewActionComponent extends React.Component<PrintPreviewActionProps, {}> {

    render() {
        var blotter = this.props.AdaptableBlotter;
        return (
            <div >
                <Panel header="Print Preivew" bsStyle="primary">
                    <Form inline>
                        <div style={divStyle}>
                            <Button bsStyle="primary" onClick={() => this.props.onApplyPrintPreview() } >Print Preview</Button>
                        </div>
                    </Form>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.AdaptableBlotter,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyPrintPreview: () => dispatch(PrintPreviewRedux.ApplyPrintPreview()),
    };
}

export let PrintPreviewAction = connect(mapStateToProps, mapDispatchToProps)(PrintPreviewActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};