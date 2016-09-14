/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, Glyphicon, ButtonGroup} from 'react-bootstrap';


interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    onChange: (SelectedValues: Array<any>) => void
    HeaderAvailable: string
    HeaderSelected: string
    //if not primitive objects both DisplayMember and ValueMember need to be used
    DisplayMember?: string
    ValueMember?: string
}

interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    UiSelectedAvailableValues: Array<any>
    UiSelectedSelectedValues: Array<any>
}
var placeholder = document.createElement("button");
placeholder.className = "placeholder"
placeholder.classList.add("list-group-item")
placeholder.type = "button"

export class DualListBoxEditor extends React.Component<DualListBoxEditorProps, DualListBoxEditorState> {
    constructor(props: DualListBoxEditorProps) {
        super(props);
        let availableValues = new Array<any>();
        this.props.AvailableValues.forEach(x => {
            if (this.props.ValueMember) {
                if (this.props.SelectedValues.findIndex(y => y[this.props.ValueMember] == x[this.props.ValueMember]) < 0) {
                    availableValues.push(x);
                }
            }
            else {
                if (this.props.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
                }
            }
        })
        this.state = {
            SelectedValues: this.props.SelectedValues,
            AvailableValues: this.props.DisplayMember ? availableValues.sort((a, b) => (a[this.props.DisplayMember] < b[this.props.DisplayMember]) ? -1 : (a[this.props.DisplayMember] > b[this.props.DisplayMember]) ? 1 : 0) : availableValues.sort(),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: []
        };
    }
    componentWillReceiveProps(nextProps: DualListBoxEditorProps, nextContext: any) {
        let availableValues = new Array<any>();
        nextProps.AvailableValues.forEach(x => {
            if (nextProps.ValueMember) {
                if (nextProps.SelectedValues.findIndex(y => y[nextProps.ValueMember] == x[nextProps.ValueMember]) < 0) {
                    availableValues.push(x);
                }
            }
            else {
                if (nextProps.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
                }
            }
        })
        this.setState({
            SelectedValues: nextProps.SelectedValues,
            AvailableValues: nextProps ? availableValues.sort((a, b) => (a[nextProps.DisplayMember] < b[nextProps.DisplayMember]) ? -1 : (a[nextProps.DisplayMember] > b[nextProps.DisplayMember]) ? 1 : 0) : availableValues.sort(),
        } as DualListBoxEditorState);
    }
    render() {
        let itemsElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            return <ListGroupItem key={value} className="Selected"
                draggable={true}
                onClick={() => this.onClickCustomSortItem(x) }
                active={isActive}
                onDragStart={(event) => this.DragSelectedStart(event, x) }
                onDragEnd={ () => this.DragSelectedEnd() }
                value={value}>{display}</ListGroupItem>
        })

        let columnValuesElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            return <ListGroupItem active={isActive} className="Available"
                draggable={true}
                onClick={() => this.onClickColumnValuesItem(x) }
                key={value}
                onDragStart={(event) => this.DragAvailableStart(event, x) }
                onDragEnd={ () => this.DragAvailableEnd() }
                value={value}>{display}</ListGroupItem>
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
                    <Col xs={2} style={colButtonStyle} >
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
                    <Col xs={2} style={colButtonStyle} >
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
    private draggedHTMLElement: HTMLElement;
    private draggedElement: any;
    private overHTMLElement: HTMLElement;
    DragSelectedStart(e: React.DragEvent, listElement: any) {
        this.draggedHTMLElement = e.currentTarget as HTMLElement;
        this.draggedElement = listElement;
    }
    DragSelectedEnd() {
        if (this.overHTMLElement && this.draggedElement) {
            //now we need to check in which drop area we dropped the selected item
            let to: number;
            let from = this.state.SelectedValues.indexOf(this.draggedElement);
            let newSelectedArray: Array<any>
            let newAvailableValues: Array<any>
            if (this.overHTMLElement.classList.contains("Available")) {
                if (this.props.DisplayMember) {
                    to = this.state.AvailableValues.findIndex(x => x[this.props.DisplayMember] == this.overHTMLElement.innerText);
                }
                else {
                    to = this.state.AvailableValues.indexOf(this.overHTMLElement.innerText);
                }
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(to, 0, this.draggedElement)
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.push(this.draggedElement)
            }
            else if (this.overHTMLElement.classList.contains("Selected")) {
                if (this.props.DisplayMember) {
                    to = this.state.SelectedValues.findIndex(x => x[this.props.DisplayMember] == this.overHTMLElement.innerText);
                }
                else {
                    to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                }
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newSelectedArray.splice(to, 0, this.draggedElement);
                newAvailableValues = [...this.state.AvailableValues];
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newSelectedArray.push(this.draggedElement);
                newAvailableValues = [...this.state.AvailableValues];
            }
            //We remove our awesome placeholder 
            if (this.overHTMLElement.classList.contains('SelectedDropZone') || this.overHTMLElement.classList.contains('AvailableDropZone')) {
                this.overHTMLElement.removeChild(placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null
            // Update state

            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues
            } as DualListBoxEditorState
                , () => this.raiseOnChange());
        }
    }
    DragAvailableStart(e: React.DragEvent, listElement: any) {
        this.draggedHTMLElement = e.currentTarget as HTMLElement;
        this.draggedElement = listElement
    }
    DragAvailableEnd() {
        if (this.overHTMLElement && this.draggedElement) {
            let to: number;
            let from = this.state.AvailableValues.indexOf(this.draggedElement);
            let newSelectedArray: Array<any>
            let newAvailableValues: Array<any>

            if (this.overHTMLElement.classList.contains("Selected")) {
                from = this.state.AvailableValues.indexOf(this.draggedElement);
                if (this.props.DisplayMember) {
                    to = this.state.SelectedValues.findIndex(x => x[this.props.DisplayMember] == this.overHTMLElement.innerText);
                }
                else {
                    to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                }
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(to, 0, this.draggedElement)
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.push(this.draggedElement)
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }

            //We remove our awesome placeholder 
            if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                this.overHTMLElement.removeChild(placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null;

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
        if (!this.draggedHTMLElement.classList.contains("Selected")) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) return;
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
            targetElement.appendChild(placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(placeholder, targetElement);
        }
    }
    DragLeaveAvailable(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("AvailableDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                    this.overHTMLElement.removeChild(placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(placeholder);
                }
                this.overHTMLElement = null;

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
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
            targetElement.appendChild(placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(placeholder, targetElement);
        }
    }
    DragLeaveSelected(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("SelectedDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                    this.overHTMLElement.removeChild(placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(placeholder);
                }
                this.overHTMLElement = null;
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

var colButtonStyle = {
    transform: 'translateY(100px)'
}