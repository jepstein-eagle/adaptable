/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, Glyphicon, ButtonGroup} from 'react-bootstrap';


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
var placeholder = document.createElement("button");
placeholder.className = "placeholder"
placeholder.classList.add("list-group-item")
placeholder.type = "button"

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
            AvailableValues: availableValues.sort(),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: []
        };
    }
    render() {
        let itemsElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            return <ListGroupItem key={x} className="Selected"
                draggable={true}
                onClick={() => this.onClickCustomSortItem(x) }
                active={isActive}
                onDragStart={(event) => this.DragSelectedStart(event) }
                onDragEnd={ (event) => this.DragSelectedEnd(event) }>{x}</ListGroupItem>
        })

        let columnValuesElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            return <ListGroupItem active={isActive} className="Available"
                draggable={true}
                onClick={() => this.onClickColumnValuesItem(x) }
                key={x}
                onDragStart={(event) => this.DragAvailableStart(event) }
                onDragEnd={ (event) => this.DragAvailableEnd(event) }>{x}</ListGroupItem>
        })


        return (
            <Grid>
                <Row> 
                    <Col xs={4}>
                        <Panel header={this.props.HeaderAvailable} >
                            <ListGroup fill className="AvailableDropZone" style={listGroupStyle}
                                onDragEnter={(event) => this.DragEnterAvailable(event) }
                                onDragOver={(event) => this.DragOverAvailable(event) }
                                onDragLeave={(event) => this.DragLeaveAvailable(event) }>
                                {columnValuesElements}
                            </ListGroup>
                        </Panel>
                    </Col>
                    <Col xs={2}>
                    <ButtonGroup>
                        <Button disabled={this.state.AvailableValues.length == 0}
                            onClick={() => this.AddAll() } block >Add All <Glyphicon glyph="fast-forward"></Glyphicon></Button>
                        <Button disabled={this.state.UiSelectedAvailableValues.length == 0}
                            onClick={() => this.Add() } block>Add <Glyphicon glyph="step-forward"></Glyphicon></Button>
                        <Button disabled={this.state.UiSelectedSelectedValues.length == 0}
                            onClick={() => this.Remove() } block><Glyphicon glyph="step-backward"></Glyphicon> Remove</Button>
                        <Button disabled={this.state.SelectedValues.length == 0}
                            onClick={() => this.RemoveAll() } block><Glyphicon glyph="fast-backward"></Glyphicon> Remove All</Button>
                            </ButtonGroup>
                    </Col>
                    <Col xs={4} >
                        <Panel header={this.props.HeaderSelected}>
                            <ListGroup fill style={listGroupStyle} className="SelectedDropZone"
                                onDragEnter={(event) => this.DragEnterSelected(event) }
                                onDragOver={(event) => this.DragOverSelected(event) }
                                onDragLeave={(event) => this.DragLeaveSelected(event) }>
                                {itemsElements}
                            </ListGroup>
                        </Panel>
                    </Col>
                    <Col xs={2}>
                        <Button block disabled>Top</Button>
                        <Button block disabled>Up</Button>
                        <Button block disabled>Down</Button>
                        <Button block disabled>Bottom</Button>
                    </Col>
                </Row>
            </Grid>
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
        this.setState({
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    AddAll() {
        let newSelectedValues = [].concat(this.state.SelectedValues, this.state.AvailableValues);
        let newAvailableValues: string[] = [];
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        }, () => this.raiseOnChange());
    }

    RemoveAll() {
        let newSelectedValues: string[] = [];
        let newAvailableValues = [].concat(this.state.SelectedValues, this.state.AvailableValues);
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        }, () => this.raiseOnChange());
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
        this.setState({
            UiSelectedSelectedValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }
    private dragged: HTMLElement;
    private over: HTMLElement;
    DragSelectedStart(e: React.DragEvent) {
        this.dragged = e.currentTarget as HTMLElement;
    }
    DragSelectedEnd(e: React.DragEvent) {
        if (this.over) {

            //now we need to check in which drop area we dropped the selected item
            let to: number;
            let from = this.state.SelectedValues.indexOf(this.dragged.innerText);
            let newSelectedArray: Array<string>
            let newAvailableValues: Array<string>
            if (this.over.classList.contains("Available")) {
                to = this.state.AvailableValues.indexOf(this.over.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(to, 0, this.dragged.innerText)

            }
            else if (this.over.classList.contains("Selected")) {
                to = this.state.SelectedValues.indexOf(this.over.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newSelectedArray.splice(to, 0, this.dragged.innerText);
                newAvailableValues = [...this.state.AvailableValues];
            }
            //We remove our awesome placeholder 
            this.over.parentNode.removeChild(placeholder);
            this.over = null;
            this.dragged = null;
            // Update state

            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues
            } as DualListBoxEditorState
                , () => this.raiseOnChange());
        }
    }
    DragAvailableStart(e: React.DragEvent) {
        this.dragged = e.currentTarget as HTMLElement;
    }
    DragAvailableEnd(e: React.DragEvent) {
        if (this.over) {
            //always from Available to selected area
            let from = this.state.AvailableValues.indexOf(this.dragged.innerText);
            let to = this.state.SelectedValues.indexOf(this.over.innerText);;
            let newSelectedArray = [...this.state.SelectedValues];
            newSelectedArray.splice(to, 0, this.dragged.innerText)
            let newAvailableValues = [...this.state.AvailableValues];
            newAvailableValues.splice(from, 1);

            //We remove our awesome placeholder 
            this.over.parentNode.removeChild(placeholder);
            this.over = null;
            this.dragged = null;

            // Update state
            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues
            } as DualListBoxEditorState
                , () => this.raiseOnChange());
        }

    }
    DragEnterAvailable(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverAvailable(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        //we can only drop selected data into available
        if (!this.dragged.classList.contains("Selected")) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) return;
        this.over = targetElement;
        targetElement.parentNode.insertBefore(placeholder, targetElement);
    }
    DragLeaveAvailable(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("AvailableDropZone")) {
            if (this.over) {
                this.over.parentNode.removeChild(placeholder);
                this.over = null;

            }
        }
    }

    DragEnterSelected(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverSelected(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) return;
        this.over = targetElement;
        targetElement.parentNode.insertBefore(placeholder, targetElement);
    }
    DragLeaveSelected(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("SelectedDropZone")) {
            if (this.over) {
                this.over.parentNode.removeChild(placeholder);
                this.over = null;
            }
        }
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

