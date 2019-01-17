import * as React from "react";
import * as ReactDOM from "react-dom";
import { Helper } from '../../../Utilities/Helpers/Helper'
import { ListGroupItem, Row, ListGroup, Col, Button, Panel, Glyphicon, ButtonGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import { SortOrder } from '../../../Utilities/Enums'
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { ButtonDirection } from "../Buttons/ButtonDirection";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { IMasterChildren } from "../../../Utilities/Interface/IMasterChildren";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";

export interface IMasterValue {
    value: string;
    isOpen: boolean;
    isAvailable: boolean
}

export interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    onChange: (SelectedValues: Array<any>) => void
    HeaderAvailable: string
    HeaderSelected: string
    //if not primitive objects all DisplayMember and ValueMember and sortmember need to be used
    DisplayMember?: string
    ValueMember?: string
    SortMember?: string
    ReducedDisplay?: boolean
    MasterChildren?: IMasterChildren[]
    cssClassName: string
}

export interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>
    AvailableValues: Array<any>
    UiSelectedAvailableValues: Array<any>
    UiSelectedSelectedValues: Array<any>
    FilterValue: string
    SortOrder: SortOrder
    AllValues: Array<any>
    MasterValues: Array<IMasterValue>
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
            AvailableValues: this.createAvailableValuesList(availableValues, SortOrder.Ascending, this.props.SortMember),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: "",
            SortOrder: SortOrder.Ascending,
            AllValues: this.props.SelectedValues.concat(this.props.AvailableValues),
            MasterValues: this.buildMasterValues(this.props.MasterChildren)
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
            AvailableValues: this.createAvailableValuesList(availableValues, this.state.SortOrder, nextProps.SortMember),
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder,
            MasterValues: this.buildMasterValues(nextProps.MasterChildren)
        });
    }
    render() {
        let cssClassName: string = this.props.cssClassName + StyleConstants.DOUBLE_LIST_BOX;
        let setRefFirstSelected = true

        // build selected elements
        let selectedElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            if (isActive && setRefFirstSelected) {
                setRefFirstSelected = false
                return <ListGroupItem key={x}
                    className="Selected"
                    draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    style={listGroupItemStyle}
                    active={isActive}
                    ref="FirstSelectedSelected"
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
            else {
                return <ListGroupItem key={x}
                    className="Selected"
                    style={listGroupItemStyle}
                    draggable={true}
                    onClick={() => this.onClickSelectedItem(x)}
                    bsSize={'small'} active={isActive}
                    onDragStart={(event) => this.DragSelectedStart(event, x)}
                    onDragEnd={() => this.DragSelectedEnd()}
                    value={x}>{x}</ListGroupItem>
            }
        })

        // build available elements - might have master/children
        let availableElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            let masterValue: IMasterValue = this.state.MasterValues.find(mv => mv.value == x)
            let isMasterElement = masterValue != null;

            if (this.isValueFilteredOut(display)) {
                return null;
            }
            else {
                return <span key={value}>
                    {isMasterElement ?
                        <ListGroupItem
                            bsSize={'small'}
                            className="Available"
                            style={listGroupItemStyle}
                            active={isActive}
                            bsStyle={StyleConstants.SUCCESS_BSSTYLE}
                            draggable={false}
                            onClick={() => this.onClickAvailableValuesItem(x)}
                            key={value}
                            value={value}>
                            <Checkbox key={masterValue.value} checked={masterValue.isOpen} onChange={(e) => this.onMasterValueCheckChanged(e, x)} bsClass={'small'}>{' '}{display}</Checkbox>
                        </ListGroupItem> :
                        <ListGroupItem
                            bsSize={'small'}
                            className="Available"
                            style={listGroupItemStyle}
                            active={isActive}
                            draggable={true}
                            onClick={() => this.onClickAvailableValuesItem(x)}
                            key={value}
                            onDragStart={(event) => this.DragAvailableStart(event, x)}
                            onDragEnd={() => this.DragAvailableEnd()}
                            value={value}>
                            {display}

                        </ListGroupItem>
                    }
                </span>
            }
        })

        let headerFirstListBox = <ListBoxFilterSortComponent
            FilterValue={this.state.FilterValue}
            sortColumnValues={() => this.sortColumnValues()}
            SortOrder={this.state.SortOrder}
            handleChangeFilterValue={(e) => this.handleChangeFilterValue(e)}
            DisableSort={ArrayExtensions.IsNotEmpty(this.state.MasterValues)} />

        let listGroupAvailableStyle: any = (this.props.ReducedDisplay) ? listGroupStyleAvailableSmall : listGroupStyleAvailableLarge
        let listGroupSelectedStyle: any = (this.props.ReducedDisplay) ? listGroupStyleSelectedSmall : listGroupStyleSelectedLarge

        return (<div className={cssClassName}>
            <Col xs={4}>
                <Panel header={this.props.HeaderAvailable} className="ab_no-padding-anywhere-panel" bsStyle="info">
                    <div>
                        {headerFirstListBox}
                        <ListGroup className="AvailableDropZone" style={listGroupAvailableStyle}
                            onDragEnter={(event) => this.DragEnterAvailable(event)}
                            onDragOver={(event) => this.DragOverAvailable(event)}
                            onDragLeave={(event) => this.DragLeaveAvailable(event)}>
                            {availableElements}
                        </ListGroup>
                    </div>
                </Panel>
            </Col>
            <Col xs={2} style={colButtonStyle} >
                <ButtonGroup  >
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Add All"} DisplayMode={"Text+Glyph"} glyph={"fast-forward"} style={{ width: "110px", marginBottom: "10px" }} overrideDisableButton={this.state.AvailableValues.length == 0} onClick={() => this.AddAll()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Add"} DisplayMode={"Text+Glyph"} glyph={"step-forward"} style={{ width: "110px", marginBottom: "30px" }} overrideDisableButton={this.state.UiSelectedAvailableValues.length == 0} onClick={() => this.Add()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Remove"} style={{ width: "110px", marginBottom: "10px" }} glyph="step-backward" DisplayMode={"Glyph+Text"} overrideDisableButton={this.state.UiSelectedSelectedValues.length == 0} onClick={() => this.Remove()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Remove All"} style={{ width: "110px", marginBottom: "10px" }} DisplayMode={"Glyph+Text"} glyph="fast-backward" overrideDisableButton={this.state.SelectedValues.length == 0} onClick={() => this.RemoveAll()} />
                </ButtonGroup>
            </Col>
            <Col xs={4} >
                <Panel header={this.props.HeaderSelected} className="ab_no-padding-anywhere-panel" bsStyle="info">
                    <div>
                        <ListGroup style={listGroupSelectedStyle} className="SelectedDropZone"
                            onDragEnter={(event) => this.DragEnterSelected(event)}
                            onDragOver={(event) => this.DragOverSelected(event)}
                            onDragLeave={(event) => this.DragLeaveSelected(event)}>
                            {selectedElements}
                        </ListGroup>
                    </div>
                </Panel>
            </Col>
            <Col xs={2} style={colButtonStyle} >
                <ButtonGroup>
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Top"} DisplayMode={"Glyph+Text"} glyph={"triangle-top"} style={{ width: "110px", marginBottom: "10px" }} overrideDisableButton={!this.canGoTopOrUp()}
                        onClick={() => this.Top()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Up"} DisplayMode={"Glyph+Text"} glyph={"menu-up"} style={{ width: "110px", marginBottom: "10px" }} overrideDisableButton={!this.canGoTopOrUp()}
                        onClick={() => this.Up()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Down"} DisplayMode={"Glyph+Text"} glyph={"menu-down"} style={{ width: "110px", marginBottom: "10px" }} overrideDisableButton={!this.canGoDownOrBottom()}
                        onClick={() => this.Down()} />
                    <ButtonDirection cssClassName={cssClassName} overrideText={"Bottom"} DisplayMode={"Glyph+Text"} glyph={"triangle-bottom"} style={{ width: "110px", marginBottom: "10px" }} overrideDisableButton={!this.canGoDownOrBottom()}
                        onClick={() => this.Bottom()} />
                </ButtonGroup>
            </Col>
        </div>
        );
    }

    buildMasterValues(masterChildren: IMasterChildren[]): IMasterValue[] {
        if (ArrayExtensions.IsNullOrEmpty(masterChildren)) {
            return [];
        }

        return this.props.MasterChildren.map(mc => {
            return { value: mc.Master, isAvailable: false, isOpen: true }
        });

    }

    onMasterValueCheckChanged(event: React.FormEvent<any>, item: any): void {
        let e = event.target as HTMLInputElement;

        let masterValues = [].concat(this.state.MasterValues)
        let currentMasterValue: IMasterValue = masterValues.find(mv => mv.value == item)

        currentMasterValue.isOpen = e.checked
        let newArray = [...this.state.UiSelectedAvailableValues];

        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
        }

        this.setState({
            MasterValues: masterValues, UiSelectedAvailableValues: newArray
        } as DualListBoxEditorState);
    }

    createAvailableValuesList(availableValues: any[], sortOrder: SortOrder, sortMember: string): any[] {
        // if there are no master / children then sort the values
        if (ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            return Helper.sortArrayWithProperty(sortOrder, availableValues, sortMember);
        }

        // we do have master / children
        let returnValues: any[] = []

        // first add any orphans = that are not masters or are not children
        availableValues.forEach(av => {
            let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => mc.Master == av || ArrayExtensions.ContainsItem(mc.Children, av));
            if (!masterChildren) {
                returnValues.push(av);
            }
        })

        // now add all the Master Children
        this.props.MasterChildren.forEach(mc => {
            let availableChildren: any[] = []

            mc.Children.forEach(c => {
                if (ArrayExtensions.ContainsItem(availableValues, c)) {
                    availableChildren.push(c);
                }
            })
            // only add the item if there are available children
            if (ArrayExtensions.IsNotEmpty(availableChildren)) {
                returnValues.push(mc.Master);
                availableChildren.forEach(c => {
                    returnValues.push(c)
                })
            }
        })
        return returnValues;
    }

    isValueFilteredOut(item: string): boolean {
        // if not master child then simply filter on the value
        if (ArrayExtensions.IsNullOrEmpty(this.state.MasterValues)) {
            return (this.state.FilterValue != "" && item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0)
        }

        let masterNames = this.state.MasterValues.map(mv => { return mv.value })
        let isFilterMode: boolean = StringExtensions.IsNotEmpty(this.state.FilterValue);

        if (ArrayExtensions.ContainsItem(masterNames, item)) {
            let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => mc.Master == item);
            let filterMaster: boolean = true;
            if (masterChildren) {
                // so we are dealing with a Master

                masterChildren.Children.forEach(c => {
                    if (ArrayExtensions.ContainsItem(this.state.AvailableValues, c)) {
                        // we need the child to be present to show the master
                        if (isFilterMode) {
                            // if there is a filter then the child needs to pass that in order to display the Master
                            if (c.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) >= 0) {
                                filterMaster = false;
                            }
                        } else {
                            // if no filter, then always show the Master
                            filterMaster = false;
                        }
                    }
                })
            }
            return filterMaster;
        } else {
            // its a child - so first check that the Master is open
            let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => ArrayExtensions.ContainsItem(mc.Children, item));
            if (masterChildren) {
                let masterValue: IMasterValue = this.state.MasterValues.find(mv => mv.value == masterChildren.Master);
                if (!masterValue.isOpen) { // no open Master so always filter
                    return true;
                } else {
                    // if there is a filter then check on that, otherwise return false
                    if (isFilterMode) {
                        return (item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0)
                    } else {
                        return false;
                    }
                }
            } else {
                // for orphans filter as normal
                return (item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0)
            }
        }
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
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: []
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });
    }

    Up(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (let selElement of this.state.UiSelectedSelectedValues) {
            let index = newSelectedValues.indexOf(selElement)
            ArrayExtensions.moveArray(newSelectedValues, index, index - 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });
    }

    Bottom(): void {
        let newSelectedValues = [].concat(this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0),
            this.state.UiSelectedSelectedValues);

        this.setState({
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: []
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });

    }

    Down(): void {
        let newSelectedValues = [...this.state.SelectedValues]
        for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
            let indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index])
            ArrayExtensions.moveArray(newSelectedValues, indexglob, indexglob + 1)
        }

        this.setState({
            SelectedValues: newSelectedValues
        } as DualListBoxEditorState, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });

    }

    Add() {
        let newSelectedValues = [...this.state.SelectedValues];
        let newAvailableValues = [...this.state.AvailableValues];
        let valuesToAdd = this.getValuesToAdd(this.state.UiSelectedAvailableValues);
        valuesToAdd.forEach(x => {
            let index = newAvailableValues.indexOf(x);
            newAvailableValues.splice(index, 1);
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember])
            }
            else {
                newSelectedValues.push(x)
            }

        })
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);

        this.setState({
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        } as DualListBoxEditorState, () => this.raiseOnChange());
    }

    AddAll() {
        let newSelectedValues = [].concat(this.state.SelectedValues);
        let valuesToAdd = this.getValuesToAdd(this.state.AvailableValues);
        valuesToAdd.forEach(x => {
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember])
            }
            else {
                if (ArrayExtensions.NotContainsItem(this.state.MasterValues, x)) {
                    newSelectedValues.push(x)
                }
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

    getValuesToAdd(addedValues: any[]): any[] {
        if (ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            return addedValues;
        }

        let newAvailableValues: any[] = []

        addedValues.forEach(av => {
            let masterChildren: IMasterChildren = this.props.MasterChildren.find(mc => mc.Master == av);
            if (masterChildren) {
                masterChildren.Children.forEach(c => {
                    if (ArrayExtensions.ContainsItem(this.state.AvailableValues, c)) {
                        ArrayExtensions.AddItem(newAvailableValues, c);
                    }
                })
            } else {
                ArrayExtensions.AddItem(newAvailableValues, av);
            }
        })
        return newAvailableValues;
    }

    RemoveAll() {
        let newSelectedValues: string[] = [];
        let newAvailableValues = [].concat(this.state.AllValues);
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
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
                let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == x)
                if (originalItem) {
                    newAvailableValues.push(originalItem)
                }
            }
            else {
                let originalItem = this.state.AllValues.find(y => y == x)
                if (originalItem) {
                    newAvailableValues.push(originalItem)
                }
            }

        })
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
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
                    let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem)
                        }
                    }
                }
                else {
                    let originalItem = this.state.AllValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem)
                        }
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                if (this.props.ValueMember) {
                    let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem)
                        }
                    }
                }
                else {
                    let originalItem = this.state.AllValues.find(y => y == this.draggedElement)
                    if (originalItem) {
                        let checkForExistig: any = newAvailableValues.find(x => x == originalItem)
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem)
                        }
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
            newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);

            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
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
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
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


var listGroupStyleAvailableLarge: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '430px',
    'marginBottom': '0px'
};

var listGroupStyleSelectedLarge: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '465px',
    'marginBottom': '0px'
};
var listGroupStyleAvailableSmall: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '350px',
    'marginBottom': '0px'
};

var listGroupStyleSelectedSmall: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '385px',
    'marginBottom': '0px'
};

var listGroupItemStyle: React.CSSProperties = {
    'fontSize': 'small',
    'padding': '5px',
};

var colButtonStyle = {
    transform: 'translateY(100px)',
    horitzontalAlign: 'center',
    margin: '0px',
    padding: '0px'
}