/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, Button, Table, MenuItem, ControlLabel, Checkbox } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import * as PrintPreviewRedux from '../../Redux/ActionsReducers/PrintPreviewRedux'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'


interface PrintPreviewActionProps extends React.ClassAttributes<PrintPreviewActionComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    onApplyPrintPreview: () => PrintPreviewRedux.ApplyPrintPreviewAction,
}

class PrintPreviewActionComponent extends React.Component<PrintPreviewActionProps, {}> {

    public componentDidMount() {
        this.props.onApplyPrintPreview();
    }

    
        render() {
            return (
                <div >
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