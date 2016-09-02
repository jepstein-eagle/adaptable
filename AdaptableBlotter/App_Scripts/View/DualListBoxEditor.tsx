/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps, Panel} from 'react-bootstrap';


interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<string>
    AvailableValues: Array<string>
    onChange: (SelectedValues: Array<string>) => void
    HeaderAvailable: string
    HeaderSelected: string
}

interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<string>
    AvailableValues: Array<string>
    UiSelectedAvailableValues: Array<string>
    UiSelectedSelectedValues: Array<string>
}

export class DualListBoxEditor extends React.Component<DualListBoxEditorProps, DualListBoxEditorState> {
    constructor(props: DualListBoxEditorProps) {
        super(props);
        let availableValues = new Array<string>();
        this.props.AvailableValues.forEach(x => {
            if (this.props.SelectedValues.indexOf(x) < 0) {
                availableValues.push(x);
            }
        })
        this.state = {
            SelectedValues: this.props.SelectedValues,
            AvailableValues: availableValues,
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: []
        };
    }
    render() {
        let index = 0;
        let itemsElements = this.state.SelectedValues.map(x => {
            index++;
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            return <ListGroupItem key={index} draggable={true} onClick={() => this.onClickCustomSortItem(x) } active={isActive}>{x}</ListGroupItem>
        })

        let columnValuesElements = this.state.AvailableValues.map(x => {
            index++;
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
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
                        <Button disabled={this.state.UiSelectedAvailableValues.length == 0} onClick={() => this.Add() } >Add</Button>
                        <Button disabled={this.state.UiSelectedSelectedValues.length == 0} onClick={() => this.Remove() } >Remove</Button>
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
        let newSelectedValues = [...this.state.SelectedValues];
        let newAvailableValues = [...this.state.AvailableValues];
        this.state.UiSelectedAvailableValues.forEach(x => {
            let index = newAvailableValues.indexOf(x);
            newAvailableValues.splice(index, 1);
            newSelectedValues.push(x)
        })
        //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
        this.setState({UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    Remove() {
        let newSelectedValues = [...this.state.SelectedValues];
        let newAvailableValues = [...this.state.AvailableValues];
        this.state.UiSelectedSelectedValues.forEach(x => {
            let index = newSelectedValues.indexOf(x);
            newSelectedValues.splice(index, 1);
            newAvailableValues.push(x)
        })
        //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
        this.setState({ UiSelectedSelectedValues: [], 
            SelectedValues: newSelectedValues, 
            AvailableValues: newAvailableValues } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    raiseOnChange() {
        this.props.onChange(this.state.SelectedValues);
    }

    isSelected(item: string) {
        return true;
    }
    onClickCustomSortItem(item: string) {
        let index = this.state.UiSelectedSelectedValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.splice(index, 1);
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ UiSelectedSelectedValues: newArray } as DualListBoxEditorState)
        }
        else {
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ UiSelectedSelectedValues: this.state.UiSelectedSelectedValues.concat(item) } as DualListBoxEditorState)
        }
    }
    onClickColumnValuesItem(item: string) {
        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ UiSelectedAvailableValues: newArray } as DualListBoxEditorState)
        }
        else {
            //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
            this.setState({ UiSelectedAvailableValues: this.state.UiSelectedAvailableValues.concat(item) } as DualListBoxEditorState)
        }
    }

}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};

var panelStyle = {
    'maxHeight': '300px',
    'height': '300px'
};