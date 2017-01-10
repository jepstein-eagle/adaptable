/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, Button, Table, MenuItem, ControlLabel, Checkbox, Col } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
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
            <Panel header="Export" bsStyle="primary">
                <Form horizontal>
                    <FormGroup controlId="fileName">
                        <Col xs={4} componentClass={ControlLabel}>File Name: </Col>
                        <Col xs={8}>
                            <FormControl value={this.props.FileName} type="string" placeholder="Enter Name for Exported Excel File" onChange={e => this.handleFileNameChange(e)} />
                        </Col>
                    </FormGroup>
                    {blotter.isGridPageable() ?
                        <FormGroup controlId="allPages">
                            <Col xs={4} componentClass={ControlLabel}>Export All Pages: </Col>
                            <Col xs={8}>
                                <Checkbox onChange={(e: React.FormEvent) => this.handleAllPagesChange(e)} checked={this.props.AllPages}></Checkbox>
                            </Col>
                        </FormGroup>
                        : null}
                    <FormGroup controlId="exportButton">
                            <Col xs={4} ></Col>
                       
                        <Col xs={1} componentClass={ControlLabel}>
                            <Button bsStyle="info" disabled={(this.props.FileName == null)} onClick={() => this.props.onApplyExport()} >Export</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
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