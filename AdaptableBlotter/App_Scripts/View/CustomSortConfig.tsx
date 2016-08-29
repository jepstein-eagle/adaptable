/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup} from 'react-bootstrap';

import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

interface CustomSortConfigProps extends React.ClassAttributes<CustomSortConfig> {

}

export class CustomSortConfig extends React.Component<CustomSortConfigProps, {}> {
    render(): any {
        let header = <Form horizontal>
            <FormGroup controlId="formHorizontal">
                <Col componentClass={ControlLabel} sm={2}>
                    Custom Sorts
                </Col>
                <Col smOffset={5} sm={2}>
                    <Button >Create Custom Sort</Button>
                </Col>
            </FormGroup>
        </Form>;
        return <Panel header={header} bsStyle="primary">
            <ListGroup>
                <CustomSortConfigItem></CustomSortConfigItem>
                <CustomSortConfigItem></CustomSortConfigItem>
                <CustomSortConfigItem></CustomSortConfigItem>
            </ListGroup>
        </Panel>
    }
}


interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {

}
export class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>

            <Form horizontal>
                <FormGroup controlId="formCustomSortConfigItem">
                    <Col componentClass={ControlLabel} sm={2}>
                        ColumnA
                    </Col>
                    <Col sm={8}   componentClass={ControlLabel}>
                        BLAHBLAHJ
                    </Col>
                    <Col sm={2} componentClass={Button}>
                        EDIT
                    </Col>
                </FormGroup>
            </Form>
        </li>
    }
}