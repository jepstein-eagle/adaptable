import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup} from 'react-bootstrap';


import * as AdaptableBlotterStore from '../Redux/Store/AdaptableBlotterStore'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

interface CustomSortConfigProps extends React.ClassAttributes<CustomSortConfig> {
    //TO replace with action
    onCreateCustomSort? : Function
    CustomSorts: Array<ICustomSort>
}

export class CustomSortConfig extends React.Component<CustomSortConfigProps, {}> {
    render(): any {
        let customSorts = this.props.CustomSorts.map((customSort: ICustomSort) => {
                return <CustomSortConfigItem CustomSort={customSort} 
                onEdit={(customSort) => this.onEditCustomSort(customSort)}></CustomSortConfigItem>
            });
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
                {customSorts}
            </ListGroup>
        </Panel>
    }

    private onEditCustomSort(customSort: ICustomSort){

    }
}

interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {
    CustomSort: ICustomSort
    onEdit: (CustomSort: ICustomSort) => void;
}
export class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>

            <Form horizontal>
                <FormGroup controlId="formCustomSortConfigItem">
                    <Col componentClass={ControlLabel} sm={2}>
                        {this.props.CustomSort.ColumnId}
                    </Col>
                    <Col sm={8}   componentClass={ControlLabel}>
                        {this.props.CustomSort.CustomSortItems}
                    </Col>
                    <Col sm={2} componentClass={Button} onClick={() => this.props.onEdit(this.props.CustomSort) }>
                        EDIT
                    </Col>
                </FormGroup>
            </Form>
        </li>
    }
}