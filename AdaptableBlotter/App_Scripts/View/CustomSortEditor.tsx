import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps,Panel} from 'react-bootstrap';
import {DualListBoxEditor} from './DualListBoxEditor'

interface CustomSortEditorProps extends React.ClassAttributes<CustomSortEditor> {
    CustomSort: ICustomSort
    ColumnValues: Array<string>
    onChange: (SelectedValues: Array<string>) => void
}

export class CustomSortEditor extends React.Component<CustomSortEditorProps, {}> {
    render() {
        return (
            <Panel header={"Custom Sort " + this.props.CustomSort.ColumnId }>
            <DualListBoxEditor AvailableValues={this.props.ColumnValues}
            SelectedValues={this.props.CustomSort.CustomSortItems}
            HeaderAvailable="Column Values"
            HeaderSelected="Custom Sort Values"
            onChange={(SelectedValues) => this.props.onChange(SelectedValues)}></DualListBoxEditor>       
        </Panel>
        );
    }
}