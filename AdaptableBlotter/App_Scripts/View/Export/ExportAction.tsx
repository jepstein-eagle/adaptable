/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, Button, ControlLabel, Checkbox, Col } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface ExportActionProps extends IStrategyViewPopupProps<ExportActionComponent> {
    FileName: string,
    AllPages: boolean,
    Filterable: boolean,
    onApplyExport: () => ExportRedux.ExportApplyAction,
    onFileNameChanged: (FileName: string) => ExportRedux.ExportSetFileNameAction;
    onAllPagesChanged: (AllPages: boolean) => ExportRedux.ExportSetAllPagesAction;
    onFilterableChanged: (Filterable: boolean) => ExportRedux.ExportSetFilterableAction;
}

class ExportActionComponent extends React.Component<ExportActionProps, {}> {

    handleFileNameChanged(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onFileNameChanged(e.value);
    }

    handleAllPagesChanged(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onAllPagesChanged(e.checked);
    }

    handleFilterableChanged(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onFilterableChanged(e.checked);
    }

    render() {
        return (
            <PanelWithImage header="Export" bsStyle="primary" glyphicon="export">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="fileName">
                        <Col xs={4} componentClass={ControlLabel}>File Name: </Col>
                        <Col xs={8}>
                            <FormControl value={this.props.FileName} type="string" placeholder="Enter Name for Exported File" onChange={e => this.handleFileNameChanged(e)} />
                        </Col>
                    </FormGroup>
                    {this.props.isGridPageable() &&
                        <FormGroup controlId="allPages">
                            <Col xs={4} componentClass={ControlLabel}>Export All Pages: </Col>
                            <Col xs={8}>
                                <Checkbox onChange={(e: React.FormEvent) => this.handleAllPagesChanged(e)} checked={this.props.AllPages}></Checkbox>
                            </Col>
                        </FormGroup>
                    }
                    <FormGroup controlId="filterable">
                        <Col xs={4} componentClass={ControlLabel}>Excel File Filterable: </Col>
                        <Col xs={8}>
                            <Checkbox onChange={(e: React.FormEvent) => this.handleFilterableChanged(e)} checked={this.props.Filterable}></Checkbox>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="exportButton">
                        <Col xs={4} ></Col>

                        <Col xs={1} componentClass={ControlLabel}>
                            <Button bsStyle="info" disabled={(this.props.FileName == null)} onClick={() => this.props.onApplyExport()} >Export</Button>
                        </Col>
                    </FormGroup>
                </AdaptableBlotterForm>
            </PanelWithImage>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FileName: state.Export.FileName,
        AllPages: state.Export.AllPages,
        Filterable: state.Export.Filterable,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: () => dispatch(ExportRedux.ExportApply()),
        onFileNameChanged: (FileName: string) => dispatch(ExportRedux.ExportSetFileName(FileName)),
        onAllPagesChanged: (AllPages: boolean) => dispatch(ExportRedux.ExportSetAllPages(AllPages)),
        onFilterableChanged: (Filterable: boolean) => dispatch(ExportRedux.ExportSetFilterable(Filterable)),
    };
}

export let ExportAction = connect(mapStateToProps, mapDispatchToProps)(ExportActionComponent);
