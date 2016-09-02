import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps,Panel} from 'react-bootstrap';



interface CustomSortEditorProps extends React.ClassAttributes<CustomSortEditor> {
    CustomSort: ICustomSort
    ColumnValues: Array<string>
    onChange: (SelectedValues: Array<string>) => void
        HeaderAvailable: string
        HeaderSelected: string
}

interface CustomSortEditorState extends React.ClassAttributes<CustomSortEditor> {
    SortValues: Array<string>
    ColumnValues: Array<string>
    SelectedColumnValues: Array<string>
    SelectedSortValues: Array<string>
}

export class CustomSortEditor extends React.Component<CustomSortEditorProps, CustomSortEditorState> {
    constructor(props: CustomSortEditorProps) {
        super(props);
        let columnValues = new Array<string>();
        this.props.ColumnValues.forEach(x => {
            if (this.props.CustomSort.CustomSortItems.indexOf(x) < 0) {
                columnValues.push(x);
            }
        })
        this.state = { SortValues: this.props.CustomSort.CustomSortItems, ColumnValues: columnValues, SelectedSortValues: [], SelectedColumnValues: [] };
    }
    render() {
        let index = 0;
        let itemsElements = this.state.SortValues.map(x => {
            index++;
            let isActive = this.state.SelectedSortValues.indexOf(x) >= 0;
            return <ListGroupItem key={index} draggable={true} onClick={() => this.onClickCustomSortItem(x) } active={isActive}>{x}</ListGroupItem>
        })

        let columnValuesElements = this.state.ColumnValues.map(x => {
            index++;
            let isActive = this.state.SelectedColumnValues.indexOf(x) >= 0;
            return <ListGroupItem active={isActive}  draggable={true} onClick={() => this.onClickColumnValuesItem(x) } key={index}>{x}</ListGroupItem>
        })


        return (
            //we use a container instead of the Grid as we do not want a full width table
            //<Grid >
            <Row>
                <Col xs={4}>
                    <Panel header={this.props.HeaderAvailable} >
                    <ListGroup fill style={listGroupStyle}>
                        {columnValuesElements}
                    </ListGroup>
                    </Panel>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <Button disabled={this.state.SelectedColumnValues.length == 0} onClick={() => this.Add() } >Add</Button>
                        <Button disabled={this.state.SelectedSortValues.length == 0} onClick={() => this.Remove() } >Remove</Button>
                        <Button >Top</Button>
                        <Button >Bottom</Button>
                    </ListGroup>
                </Col>
                <Col xs={4} >
                <Panel header={this.props.HeaderSelected}>
                    <ListGroup fill style={listGroupStyle}>
                        {itemsElements}
                    </ListGroup>
                    </Panel>
                </Col>
                
            </Row>
            //</Grid>
        );
    }

    Add() {
        let newSortedValues = [...this.state.SortValues];
        let newColumnValues = [...this.state.ColumnValues];
        this.state.SelectedColumnValues.forEach(x => {
            let index = newColumnValues.indexOf(x);
            newColumnValues.splice(index, 1);
            newSortedValues.push(x)
        })
        //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
        this.setState({ SelectedColumnValues: [], SortValues: newSortedValues, ColumnValues: newColumnValues } as CustomSortEditorState, () => this.raiseOnChange());
    }

        Remove() {
        let newSortedValues = [...this.state.SortValues];
        let newColumnValues = [...this.state.ColumnValues];
        this.state.SelectedSortValues.forEach(x => {
            let index = newSortedValues.indexOf(x);
            newSortedValues.splice(index, 1);
            newColumnValues.push(x)
        })
        //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
        this.setState({ SelectedSortValues: [], SortValues: newSortedValues, ColumnValues: newColumnValues } as CustomSortEditorState, () => this.raiseOnChange());
    }

    raiseOnChange() {
        this.props.onChange(this.state.SortValues);
    }

    isSelected(item: string) {
        return true;
    }
    onClickCustomSortItem(item: string) {
        let index = this.state.SelectedSortValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.SelectedSortValues];
            newArray.splice(index, 1);
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ SelectedSortValues: newArray } as CustomSortEditorState)
        }
        else {
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ SelectedSortValues: this.state.SelectedSortValues.concat(item) } as CustomSortEditorState)
        }
    }
    onClickColumnValuesItem(item: string) {
        let index = this.state.SelectedColumnValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.SelectedColumnValues];
            newArray.splice(index, 1);
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ SelectedColumnValues: newArray } as CustomSortEditorState)
        }
        else {
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ SelectedColumnValues: this.state.SelectedColumnValues.concat(item) } as CustomSortEditorState)
        }
    }

}

class AdaptableListGroupItem extends React.Component<ListGroupItemProps, {}> {
    render() {
        return (
            <ListGroupItem active>{this.props.children}</ListGroupItem>
        );
    }
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height' : '300px'
};

var panelStyle = {
    'maxHeight': '300px',
    'height' : '300px'
};