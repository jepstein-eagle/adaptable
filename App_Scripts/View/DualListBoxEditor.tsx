import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, Glyphicon, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { SortOrder } from '../Core/Enums'
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent'

interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    onChange: (SelectedValues: Array<any>) => void
    HeaderAvailable: string
    HeaderSelected: string
    //if not primitive objects all DisplayMember and ValueMember and sortmember need to be used
    DisplayMember?: string
    ValueMember?: string
    SortMember?: string
}

interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    UiSelectedAvailableValues: Array<any>
    UiSelectedSelectedValues: Array<any>
    FilterValue: string
    SortOrder: SortOrder
}

export class DualListBoxEditor extends React.Component<DualListBoxEditorProps, DualListBoxEditorState> {
    private placeholder: HTMLButtonElement
    constructor(props: DualListBoxEditorProps) {
        super(props);
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder"
        this.placeholder.classList.add("list-group-item")
        this.placeholder.type = "button"
        let availableValues = new Array<any>();
        this.props.AvailableValues.forEach(x => {
            if (this.props.ValueMember) {
                if (this.props.SelectedValues.findIndex(y => y == x[this.props.ValueMember]) < 0) {
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
            AvailableValues: Helper.sortArrayWithProperty(SortOrder.Ascending, availableValues, this.props.SortMember),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: "",
            SortOrder: SortOrder.Ascending
        };
    }
    componentWillReceiveProps(nextProps: DualListBoxEditorProps, nextContext: any) {
        let availableValues = new Array<any>();
        nextProps.AvailableValues.forEach(x => {
            if (nextProps.ValueMember) {
                if (nextProps.SelectedValues.findIndex(y => y == x[nextProps.ValueMember]) < 0) {
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
                let item = nextProps.SelectedValues.find(y => y == x)
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
            AvailableValues: Helper.sortArrayWithProperty(this.state.SortOrder, availableValues, nextProps.SortMember),
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder
        });
    }
    render() {
        let setRefFirstSelected = true
        let itemsElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            if (isActive && setRefFirstSelected) {
                setRefFirstSelected = false
                return <ListGroupItem key={x} className="Selected"
                    draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    active={isActive}
                    ref="FirstSelectedSelected"
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
            else {
                return <ListGroupItem key={x} className="Selected"
                    draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    active={isActive}
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
        })

        let columnValuesElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            if (this.state.FilterValue != "" && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem active={isActive} className="Available"
                    draggable={true}
                    onClick={() => this.onClickAvailableValuesItem(x)}
                    key={value}
                    onDragStart={(event) => this.DragAvailableStart(event, x)}
                    onDragEnd={() => this.DragAvailableEnd()}
                    value={value}>{display}</ListGroupItem>
            }
        })

        let headerFirstListBox = <ListBoxFilterSortComponent FilterValue={this.state.FilterValue} sortColumnValues={() => this.sortColumnValues()}
            SortOrder={this.state.SortOrder} handleChangeFilterValue={(e) => this.handleChangeFilterValue(e)}></ListBoxFilterSortComponent>

        return (
            <Row style={rowStyle}>
                <Col xs={4}>
                    <Panel header={this.props.HeaderAvailable} className="no-padding-panel" bsStyle="info">
                        <div>
                            {headerFirstListBox}
                            <ListGroup fill className="AvailableDropZone" style={listGroupStyleAvailable}
                                onDragEnter={(event) => this.DragEnterAvailable(event)}
                                onDragOver={(event) => this.DragOverAvailable(event)}
                                onDragLeave={(event) => this.DragLeaveAvailable(event)}>
                                {columnValuesElements}
                            </ListGroup>
                        </div>
                    </Panel>
                </Col>
                <Col xs={2} style={colButtonStyle} >
                    <ButtonGroup>
                        <Button disabled={this.state.AvailableValues.length == 0}
                            onClick={() => this.AddAll()} block >Add All <Glyphicon glyph="fast-forward"></Glyphicon></Button>
                        <Button style={{ marginBottom: "10px" }} disabled={this.state.UiSelectedAvailableValues.length == 0}
                            onClick={() => this.Add()} block>Add <Glyphicon glyph="step-forward"></Glyphicon></Button>
                        <Button style={{ marginTop: "10px" }} disabled={this.state.UiSelectedSelectedValues.length == 0}
                            onClick={() => this.Remove()} block><Glyphicon glyph="step-backward"></Glyphicon> Remove</Button>
                        <Button disabled={this.state.SelectedValues.length == 0}
                            onClick={() => this.RemoveAll()} block><Glyphicon glyph="fast-backward"></Glyphicon> Remove All</Button>
                    </ButtonGroup>
                </Col>
                <Col xs={4} >
                    <Panel header={this.props.HeaderSelected} bsStyle="info">
                        <ListGroup fill style={listGroupStyle} className="SelectedDropZone"
                            onDragEnter={(event) => this.DragEnterSelected(event)}
                            onDragOver={(event) => this.DragOverSelected(event)}
                            onDragLeave={(event) => this.DragLeaveSelected(event)}>
                            {itemsElements}
                        </ListGroup>
                    </Panel>
                </Col>
                <Col xs={2} style={colButtonStyle} >
                    <ButtonGroup>
                        <Button block disabled={!this.canGoTopOrUp()}
                            onClick={() => this.Top()}><Glyphicon glyph="triangle-top" /> Top</Button>
                        <Button style={{ marginBottom: "10px" }} block disabled={!this.canGoTopOrUp()}
                            onClick={() => this.Up()}><Glyphicon glyph="menu-up" /> Up</Button>
                        <Button style={{ marginTop: "10px" }} block disabled={!this.canGoDownOrBottom()}
                            onClick={() => this.Down()}><Glyphicon glyph="menu-down" /> Down</Button>
                        <Button block disabled={!this.canGoDownOrBottom()}
                            onClick={() => this.Bottom()}><Glyphicon glyph="triangle-bottom" /> Bottom</Button>
                    </ButtonGroup>
                </Col>
            </Row>
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

    ensureFirstSelectedItemVisible(top: boolean) {
        var itemComponent = this.refs['FirstSelectedSelected'];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
            domNode.scrollIntoView(top);
        }
    }

    Top(): void {
        let newSelectedValues = [].concat(this.state.UiSelectedSelectedValues,
            this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0));

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });
    }

    Up(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (let selElement of this.state.UiSelectedSelectedValues) {
            let index = newSelectedValues.indexOf(selElement)
            Helper.moveArray(newSelectedValues, index, index - 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });
    }

    Bottom(): void {
        let newSelectedValues = [].concat(this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0),
            this.state.UiSelectedSelectedValues);

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });

    }

    Down(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
            let indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index])
            Helper.moveArray(newSelectedValues, indexglob, indexglob + 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });

    }

    Add() {
        let newSelectedValues = [...this.state.SelectedValues];
        let newAvailableValues = [...this.state.AvailableValues];
        this.state.UiSelectedAvailableValues.forEach(x => {
            let index = newAvailableValues.indexOf(x);
            newAvailableValues.splice(index, 1);
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember])
            }
            else {
                newSelectedValues.push(x)
            }

        })
        //THIS IS FUCKING BULLSHIT!! ANOTHER IDIOCY FROM TYPESCRIPT/TYPINGS
        this.setState({
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    AddAll() {
        let newSelectedValues = [].concat(this.state.SelectedValues);
        this.state.AvailableValues.forEach(x => {
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember])
            }
            else {
                newSelectedValues.push(x)
            }
        })

        let newAvailableValues: string[] = [];
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    RemoveAll() {
        let newSelectedValues: string[] = [];
        let newAvailableValues = [].concat(this.props.AvailableValues);
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
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
            if (this.props.ValueMember) {
                let originalItem = this.props.AvailableValues.find(y => y[this.props.ValueMember] == x)
                if (originalItem) {
                    newAvailableValues.push(originalItem)
                }
            }
            else {
                let originalItem = this.props.AvailableValues.find(y => y == x)
                if (originalItem) {
                    newAvailableValues.push(originalItem)
                }
            }

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
    DragSelectedStart(e: React.DragEvent<any>, listElement: any) {
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
                if (this.props.ValueMember) {
                    let originalItem = this.props.AvailableValues.find(y => y[this.props.ValueMember] == this.draggedElement)
                    if (originalItem) {
                        newAvailableValues.splice(to, 0, originalItem)
                    }
                }
                else {
                    let originalItem = this.props.AvailableValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        newAvailableValues.splice(to, 0, originalItem)
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                if (this.props.ValueMember) {
                    let originalItem = this.props.AvailableValues.find(y => y[this.props.ValueMember] == this.draggedElement)
                    if (originalItem) {
                        newAvailableValues.push(originalItem)
                    }
                }
                else {
                    let originalItem = this.props.AvailableValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        newAvailableValues.push(originalItem)
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains("Selected")) {
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
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
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
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
    DragAvailableStart(e: React.DragEvent<any>, listElement: any) {
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
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                if (this.props.ValueMember) {
                    newSelectedArray.splice(to, 0, this.draggedElement[this.props.ValueMember])
                }
                else {
                    newSelectedArray.splice(to, 0, this.draggedElement)
                }
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                if (this.props.ValueMember) {
                    newSelectedArray.push(this.draggedElement[this.props.ValueMember])
                }
                else {
                    newSelectedArray.push(this.draggedElement)
                }
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }

            //We remove our awesome placeholder
            if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
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
    DragEnterAvailable(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverAvailable(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        //we can only drop selected data into available
        if (!this.draggedHTMLElement.classList.contains("Selected")) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) { return; }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveAvailable(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("AvailableDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(this.placeholder);
                }
                this.overHTMLElement = null;

            }
        }
    }

    DragEnterSelected(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverSelected(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) { return; }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveSelected(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target) as HTMLElement;
        if (targetElement.classList.contains("SelectedDropZone") || targetElement.classList.contains("placeholder")) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(this.placeholder);
                }
                this.overHTMLElement = null;
            }
        }
    }

    handleChangeFilterValue(x: string) {
        this.setState({
            FilterValue: x
        } as DualListBoxEditorState);
    }

    sortColumnValues() {
        if (this.state.SortOrder == SortOrder.Ascending) {
            this.setState({
                AvailableValues: Helper.sortArrayWithProperty(SortOrder.Descending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: SortOrder.Descending
            } as DualListBoxEditorState);
        }
        else {
            this.setState({
                AvailableValues: Helper.sortArrayWithProperty(SortOrder.Ascending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: SortOrder.Ascending
            } as DualListBoxEditorState);
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
var rowStyle = {
    'minWidth': '800px',
};
var listGroupStyleAvailable: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '261px',
    'height': '261px',
    'marginBottom': '0'
};

var listGroupStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px',
    'marginBottom': '0'
};

var panelStyle = {
    'maxHeight': '300px',
    'height': '300px'
};

var colButtonStyle = {
    transform: 'translateY(100px)'
}
