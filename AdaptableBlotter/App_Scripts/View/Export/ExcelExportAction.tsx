/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {FormControl, Panel, Form, FormGroup, Button, Table, MenuItem, ControlLabel, Checkbox} from 'react-bootstrap';
import {IColumn, IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

import {AdaptableBlotterState} from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExcelExportRedux from '../../Redux/ActionsReducers/ExcelExportRedux'

interface ExcelExportActionProps extends React.ClassAttributes<ExcelExportActionComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    FileName: string,
    AllPages: boolean,
    onApplyExport: () => ExcelExportRedux.ApplyExportAction,
    onFileNameChange: (FileName: string) => ExcelExportRedux.ExportSetFileNameAction;
    onAllPagesChange: (AllPages: boolean) => ExcelExportRedux.ExportSetAllPagesAction;

}

class ExcelExportActionComponent extends React.Component<ExcelExportActionProps, {}> {

    handleFileNameChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onFileNameChange(e.value);
    }

    handleAllPagesChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onAllPagesChange(e.checked);
    }

    render() {
        var blotter = this.props.AdaptableBlotter;
        return (
            <div >
                <Panel header="Export" bsStyle="primary">
                    <Form inline>
                        <div style={divStyle}>
                            <ControlLabel>Excel File Name: </ControlLabel>
                            {'   '}
                            <FormControl value={this.props.FileName} type="string" placeholder="Enter a Name for Exported Excel File"
                                onChange={(e: React.FormEvent) => this.handleFileNameChange(e) }/>
                        </div>
                        <div style={divStyle} >
                            <ControlLabel>Export All Pages: </ControlLabel>
                            {'   '}
                            <Checkbox disabled={!blotter.isGridPageable() } onChange={(e: React.FormEvent) => this.handleAllPagesChange(e) } checked={this.props.AllPages}></Checkbox>
                        </div>
                        <div style={divStyle}>
                            <Button bsStyle="primary" disabled={(this.props.FileName == null) } onClick={() => this.props.onApplyExport() } >Export</Button>
                        </div>
                    </Form>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FileName: state.Export.FileName,
        AllPages: state.Export.AllPages,
        AdaptableBlotter: ownProps.AdaptableBlotter,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: () => dispatch(ExcelExportRedux.ApplyExport()),
        onFileNameChange: (FileName: string) => dispatch(ExcelExportRedux.FileNameSetOperation(FileName)),
        onAllPagesChange: (AllPages: boolean) => dispatch(ExcelExportRedux.AllPagesSetOperation(AllPages)),
    };
}

export let ExcelExportAction = connect(mapStateToProps, mapDispatchToProps)(ExcelExportActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};