/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {Helper} from '../Core/Helper'
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
        //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
        let uiAvailableSelected: Array<any>
        let uiSelectedSelected: Array<any>
        if (nextProps.ValueMember) {
            uiAvailableSelected = []
            this.state.UiSelectedAvailableValues.forEach(x => {
                let item = availableValues.find(y => y[nextProps.ValueMember] == x[nextProps.ValueMember])
                if (item) {
                    uiAvailableSelected.push(item)
                }
            })
            uiSelectedSelected = []
            this.state.UiSelectedSelectedValues.forEach(x => {
                let item = nextProps.SelectedValues.find(y => y[nextProps.ValueMember] == x[nextProps.ValueMember])
                if (item) {
                    uiSelectedSelected.push(item)
                }
            })
        }
        else {
            uiAvailableSelected = this.state.UiSelectedAvailableValues
            uiSelectedSelected = this.state.UiSelectedSelectedValues
        }
        this.setState({
            SelectedValues: nextProps.SelectedValues,
            AvailableValues: nextProps ? availableValues.sort((a, b) => (a[nextProps.DisplayMember] < b[nextProps.DisplayMember]) ? -1 : (a[nextProps.DisplayMember] > b[nextProps.DisplayMember]) ? 1 : 0) : availableValues.sort(),
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected
        });
    }
    render() {
        let itemsElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            return <ListGroupItem key={value} className="Selected"
                draggable={true}
                onClick={() => this.onClickSelectedItem(x) }
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
                onClick={() => this.onClickAvailableValuesItem(x) }
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
                            <Button style={{ marginBottom: "10px" }} disabled={this.state.UiSelectedAvailableValues.length == 0}
                                onClick={() => this.Add() } block>Add <Glyphicon glyph="step-forward"></Glyphicon></Button>
                            <Button style={{ marginTop: "10px" }} disabled={this.state.UiSelectedSelectedValues.length == 0}
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
                        <ButtonGroup>
                            <Button block disabled={!this.canGoTopOrUp() }
                                onClick={() => this.Top() }><Glyphicon glyph="triangle-top"/> Top</Button>
                            <Button style={{ marginBottom: "10px" }} block disabled={!this.canGoTopOrUp() }
                                onClick={() => this.Up() }><Glyphicon glyph="menu-up"/> Up</Button>
                            <Button style={{ marginTop: "10px" }} block disabled={!this.canGoDownOrBottom() }
                                onClick={() => this.Down() }><Glyphicon glyph="menu-down"/> Down</Button>
                            <Button block disabled={!this.canGoDownOrBottom() }
                                onClick={() => this.Bottom() }><Glyphicon glyph="triangle-bottom"/> Bottom</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }

    canGoTopOrUp(): boolean {
        return this.state.UiSelectedSelectedValues.length != 0
            && this.state.UiSelectedSelectedValues.every(x => this.state.SelectedValues.indexOf(x) > 0);
    }

    canGoDownOrBottom(): boolean {
        return this.state.UiSelectedSelectedValues.length != 0
            && this.state.UiSelectedSelectedValues.every(x => this.state.SelectedValues.indexOf(x) < (this.state.SelectedValues.length - 1));
    }

    Top(): void {
        let newSelectedValues = [].concat(this.state.UiSelectedSelectedValues,
            this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0));

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    Up(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (let selElement of this.state.UiSelectedSelectedValues) {
            let index = newSelectedValues.indexOf(selElement)
            Helper.moveArray(newSelectedValues, index, index - 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    Bottom(): void {
        let newSelectedValues = [].concat(this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0),
            this.state.UiSelectedSelectedValues);

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => this.raiseOnChange());

    }

    Down(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
            let indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index])
            Helper.moveArray(newSelectedValues, indexglob, indexglob + 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => this.raiseOnChange());

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

    onClickSelectedItem(item: any) {
        let index = this.state.UiSelectedSelectedValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedSelectedValues: newArray } as DualListBoxEditorState)
        }
        else {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.push(item)
            //we reorder the array so UiSelectedSelectedValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.SelectedValues.indexOf(a) < this.state.SelectedValues.indexOf(b)) ? -1 : (this.state.SelectedValues.indexOf(a) > this.state.SelectedValues.indexOf(b)) ? 1 : 0)
            this.setState({ UiSelectedSelectedValues: newArray } as DualListBoxEditorState)
        }
    }
    onClickAvailableValuesItem(item: any) {
        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedAvailableValues: newArray } as DualListBoxEditorState)
        }
        else {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.push(item)
            //we reorder the array so UiSelectedAvailableValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.AvailableValues.indexOf(a) < this.state.AvailableValues.indexOf(b)) ? -1 : (this.state.AvailableValues.indexOf(a) > this.state.AvailableValues.indexOf(b)) ? 1 : 0)
            this.setState({ UiSelectedAvailableValues: newArray } as DualListBoxEditorState)
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
