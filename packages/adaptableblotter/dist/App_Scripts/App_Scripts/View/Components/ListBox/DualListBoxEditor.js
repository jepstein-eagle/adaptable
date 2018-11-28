"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const ListBoxFilterSortComponent_1 = require("./ListBoxFilterSortComponent");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const ButtonDirection_1 = require("../Buttons/ButtonDirection");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class DualListBoxEditor extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder";
        this.placeholder.classList.add("list-group-item");
        this.placeholder.type = "button";
        let availableValues = new Array();
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
        });
        this.state = {
            SelectedValues: this.props.SelectedValues,
            AvailableValues: this.createAvailableValuesList(availableValues, Enums_1.SortOrder.Ascending, this.props.SortMember),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: "",
            SortOrder: Enums_1.SortOrder.Ascending,
            AllValues: this.props.SelectedValues.concat(this.props.AvailableValues),
            MasterValues: this.buildMasterValues(this.props.MasterChildren)
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let availableValues = new Array();
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
        });
        //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
        let uiAvailableSelected;
        let uiSelectedSelected;
        if (nextProps.ValueMember) {
            uiAvailableSelected = [];
            this.state.UiSelectedAvailableValues.forEach(x => {
                let item = availableValues.find(y => y[nextProps.ValueMember] == x[nextProps.ValueMember]);
                if (item) {
                    uiAvailableSelected.push(item);
                }
            });
            uiSelectedSelected = [];
            this.state.UiSelectedSelectedValues.forEach(x => {
                let item = nextProps.SelectedValues.find(y => y == x);
                if (item) {
                    uiSelectedSelected.push(item);
                }
            });
        }
        else {
            uiAvailableSelected = this.state.UiSelectedAvailableValues;
            uiSelectedSelected = this.state.UiSelectedSelectedValues;
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
        let cssClassName = this.props.cssClassName + StyleConstants.DOUBLE_LIST_BOX;
        let setRefFirstSelected = true;
        // build selected elements
        let selectedElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            if (isActive && setRefFirstSelected) {
                setRefFirstSelected = false;
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: x, className: "Selected", draggable: true, onClick: () => this.onClickSelectedItem(x), style: listGroupItemStyle, active: isActive, ref: "FirstSelectedSelected", onDragStart: (event) => this.DragSelectedStart(event, x), onDragEnd: () => this.DragSelectedEnd(), value: x }, x);
            }
            else {
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: x, className: "Selected", style: listGroupItemStyle, draggable: true, onClick: () => this.onClickSelectedItem(x), bsSize: 'small', active: isActive, onDragStart: (event) => this.DragSelectedStart(event, x), onDragEnd: () => this.DragSelectedEnd(), value: x }, x);
            }
        });
        // build available elements - might have master/children
        let availableElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            let masterValue = this.state.MasterValues.find(mv => mv.value == x);
            let isMasterElement = masterValue != null;
            if (this.isValueFilteredOut(display)) {
                return null;
            }
            else {
                return React.createElement("span", { key: value }, isMasterElement ?
                    React.createElement(react_bootstrap_1.ListGroupItem, { bsSize: 'small', className: "Available", style: listGroupItemStyle, active: isActive, bsStyle: StyleConstants.SUCCESS_BSSTYLE, draggable: false, onClick: () => this.onClickAvailableValuesItem(x), key: value, value: value },
                        React.createElement(react_bootstrap_1.Checkbox, { key: masterValue.value, checked: masterValue.isOpen, onChange: (e) => this.onMasterValueCheckChanged(e, x), bsClass: 'small' },
                            ' ',
                            display)) :
                    React.createElement(react_bootstrap_1.ListGroupItem, { bsSize: 'small', className: "Available", style: listGroupItemStyle, active: isActive, draggable: true, onClick: () => this.onClickAvailableValuesItem(x), key: value, onDragStart: (event) => this.DragAvailableStart(event, x), onDragEnd: () => this.DragAvailableEnd(), value: value }, display));
            }
        });
        let headerFirstListBox = React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.FilterValue, sortColumnValues: () => this.sortColumnValues(), SortOrder: this.state.SortOrder, handleChangeFilterValue: (e) => this.handleChangeFilterValue(e), DisableSort: ArrayExtensions_1.ArrayExtensions.IsNotEmpty(this.state.MasterValues) });
        let listGroupAvailableStyle = (this.props.ReducedDisplay) ? listGroupStyleAvailableSmall : listGroupStyleAvailableLarge;
        let listGroupSelectedStyle = (this.props.ReducedDisplay) ? listGroupStyleSelectedSmall : listGroupStyleSelectedLarge;
        return (React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                React.createElement(react_bootstrap_1.Panel, { header: this.props.HeaderAvailable, className: "ab_no-padding-anywhere-panel", bsStyle: "info" },
                    React.createElement("div", null,
                        headerFirstListBox,
                        React.createElement(react_bootstrap_1.ListGroup, { className: "AvailableDropZone", style: listGroupAvailableStyle, onDragEnter: (event) => this.DragEnterAvailable(event), onDragOver: (event) => this.DragOverAvailable(event), onDragLeave: (event) => this.DragLeaveAvailable(event) }, availableElements)))),
            React.createElement(react_bootstrap_1.Col, { xs: 2, style: colButtonStyle },
                React.createElement(react_bootstrap_1.ButtonGroup, null,
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Add All", DisplayMode: "Text+Glyph", glyph: "fast-forward", style: { width: "110px", marginBottom: "10px" }, overrideDisableButton: this.state.AvailableValues.length == 0, onClick: () => this.AddAll() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Add", DisplayMode: "Text+Glyph", glyph: "step-forward", style: { width: "110px", marginBottom: "30px" }, overrideDisableButton: this.state.UiSelectedAvailableValues.length == 0, onClick: () => this.Add() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Remove", style: { width: "110px", marginBottom: "10px" }, glyph: "step-backward", DisplayMode: "Glyph+Text", overrideDisableButton: this.state.UiSelectedSelectedValues.length == 0, onClick: () => this.Remove() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Remove All", style: { width: "110px", marginBottom: "10px" }, DisplayMode: "Glyph+Text", glyph: "fast-backward", overrideDisableButton: this.state.SelectedValues.length == 0, onClick: () => this.RemoveAll() }))),
            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                React.createElement(react_bootstrap_1.Panel, { header: this.props.HeaderSelected, className: "ab_no-padding-anywhere-panel", bsStyle: "info" },
                    React.createElement("div", null,
                        React.createElement(react_bootstrap_1.ListGroup, { style: listGroupSelectedStyle, className: "SelectedDropZone", onDragEnter: (event) => this.DragEnterSelected(event), onDragOver: (event) => this.DragOverSelected(event), onDragLeave: (event) => this.DragLeaveSelected(event) }, selectedElements)))),
            React.createElement(react_bootstrap_1.Col, { xs: 2, style: colButtonStyle },
                React.createElement(react_bootstrap_1.ButtonGroup, null,
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Top", DisplayMode: "Glyph+Text", glyph: "triangle-top", style: { width: "110px", marginBottom: "10px" }, overrideDisableButton: !this.canGoTopOrUp(), onClick: () => this.Top() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Up", DisplayMode: "Glyph+Text", glyph: "menu-up", style: { width: "110px", marginBottom: "10px" }, overrideDisableButton: !this.canGoTopOrUp(), onClick: () => this.Up() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Down", DisplayMode: "Glyph+Text", glyph: "menu-down", style: { width: "110px", marginBottom: "10px" }, overrideDisableButton: !this.canGoDownOrBottom(), onClick: () => this.Down() }),
                    React.createElement(ButtonDirection_1.ButtonDirection, { cssClassName: cssClassName, overrideText: "Bottom", DisplayMode: "Glyph+Text", glyph: "triangle-bottom", style: { width: "110px", marginBottom: "10px" }, overrideDisableButton: !this.canGoDownOrBottom(), onClick: () => this.Bottom() })))));
    }
    buildMasterValues(masterChildren) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(masterChildren)) {
            return [];
        }
        return this.props.MasterChildren.map(mc => {
            return { value: mc.Master, isAvailable: false, isOpen: true };
        });
    }
    onMasterValueCheckChanged(event, item) {
        let e = event.target;
        let masterValues = [].concat(this.state.MasterValues);
        let currentMasterValue = masterValues.find(mv => mv.value == item);
        currentMasterValue.isOpen = e.checked;
        let newArray = [...this.state.UiSelectedAvailableValues];
        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
        }
        this.setState({
            MasterValues: masterValues, UiSelectedAvailableValues: newArray
        });
    }
    createAvailableValuesList(availableValues, sortOrder, sortMember) {
        // if there are no master / children then sort the values
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            return Helper_1.Helper.sortArrayWithProperty(sortOrder, availableValues, sortMember);
        }
        // we do have master / children
        let returnValues = [];
        // first add any orphans = that are not masters or are not children
        availableValues.forEach(av => {
            let masterChildren = this.props.MasterChildren.find(mc => mc.Master == av || ArrayExtensions_1.ArrayExtensions.ContainsItem(mc.Children, av));
            if (!masterChildren) {
                returnValues.push(av);
            }
        });
        // now add all the Master Children
        this.props.MasterChildren.forEach(mc => {
            let availableChildren = [];
            mc.Children.forEach(c => {
                if (ArrayExtensions_1.ArrayExtensions.ContainsItem(availableValues, c)) {
                    availableChildren.push(c);
                }
            });
            // only add the item if there are available children
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(availableChildren)) {
                returnValues.push(mc.Master);
                availableChildren.forEach(c => {
                    returnValues.push(c);
                });
            }
        });
        return returnValues;
    }
    isValueFilteredOut(item) {
        // if not master child then simply filter on the value
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.state.MasterValues)) {
            return (this.state.FilterValue != "" && item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0);
        }
        let masterNames = this.state.MasterValues.map(mv => { return mv.value; });
        let isFilterMode = StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterValue);
        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(masterNames, item)) {
            let masterChildren = this.props.MasterChildren.find(mc => mc.Master == item);
            let filterMaster = true;
            if (masterChildren) {
                // so we are dealing with a Master
                masterChildren.Children.forEach(c => {
                    if (ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.AvailableValues, c)) {
                        // we need the child to be present to show the master
                        if (isFilterMode) {
                            // if there is a filter then the child needs to pass that in order to display the Master
                            if (c.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) >= 0) {
                                filterMaster = false;
                            }
                        }
                        else {
                            // if no filter, then always show the Master
                            filterMaster = false;
                        }
                    }
                });
            }
            return filterMaster;
        }
        else {
            // its a child - so first check that the Master is open
            let masterChildren = this.props.MasterChildren.find(mc => ArrayExtensions_1.ArrayExtensions.ContainsItem(mc.Children, item));
            if (masterChildren) {
                let masterValue = this.state.MasterValues.find(mv => mv.value == masterChildren.Master);
                if (!masterValue.isOpen) { // no open Master so always filter
                    return true;
                }
                else {
                    // if there is a filter then check on that, otherwise return false
                    if (isFilterMode) {
                        return (item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0);
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                // for orphans filter as normal
                return (item.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0);
            }
        }
    }
    canGoTopOrUp() {
        return this.state.UiSelectedSelectedValues.length != 0
            && this.state.UiSelectedSelectedValues.every(x => this.state.SelectedValues.indexOf(x) > 0);
    }
    canGoDownOrBottom() {
        return this.state.UiSelectedSelectedValues.length != 0
            && this.state.UiSelectedSelectedValues.every(x => this.state.SelectedValues.indexOf(x) < (this.state.SelectedValues.length - 1));
    }
    ensureFirstSelectedItemVisible(top) {
        var itemComponent = this.refs['FirstSelectedSelected'];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent);
            domNode.scrollIntoView(top);
        }
    }
    Top() {
        let newSelectedValues = [].concat(this.state.UiSelectedSelectedValues, this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0));
        this.setState({
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: []
        }, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });
    }
    Up() {
        let newSelectedValues = [...this.state.SelectedValues];
        for (let selElement of this.state.UiSelectedSelectedValues) {
            let index = newSelectedValues.indexOf(selElement);
            ArrayExtensions_1.ArrayExtensions.moveArray(newSelectedValues, index, index - 1);
        }
        this.setState({
            SelectedValues: newSelectedValues
        }, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });
    }
    Bottom() {
        let newSelectedValues = [].concat(this.state.SelectedValues.filter(x => this.state.UiSelectedSelectedValues.indexOf(x) < 0), this.state.UiSelectedSelectedValues);
        this.setState({
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: []
        }, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(true); });
    }
    Down() {
        let newSelectedValues = [...this.state.SelectedValues];
        for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
            let indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index]);
            ArrayExtensions_1.ArrayExtensions.moveArray(newSelectedValues, indexglob, indexglob + 1);
        }
        this.setState({
            SelectedValues: newSelectedValues
        }, () => { this.raiseOnChange(); this.ensureFirstSelectedItemVisible(false); });
    }
    Add() {
        let newSelectedValues = [...this.state.SelectedValues];
        let newAvailableValues = [...this.state.AvailableValues];
        let valuesToAdd = this.getValuesToAdd(this.state.UiSelectedAvailableValues);
        valuesToAdd.forEach(x => {
            let index = newAvailableValues.indexOf(x);
            newAvailableValues.splice(index, 1);
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember]);
            }
            else {
                newSelectedValues.push(x);
            }
        });
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
        this.setState({
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        }, () => this.raiseOnChange());
    }
    AddAll() {
        let newSelectedValues = [].concat(this.state.SelectedValues);
        let valuesToAdd = this.getValuesToAdd(this.state.AvailableValues);
        valuesToAdd.forEach(x => {
            if (this.props.ValueMember) {
                newSelectedValues.push(x[this.props.ValueMember]);
            }
            else {
                if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(this.state.MasterValues, x)) {
                    newSelectedValues.push(x);
                }
            }
        });
        let newAvailableValues = [];
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        }, () => this.raiseOnChange());
    }
    getValuesToAdd(addedValues) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            return addedValues;
        }
        let newAvailableValues = [];
        addedValues.forEach(av => {
            let masterChildren = this.props.MasterChildren.find(mc => mc.Master == av);
            if (masterChildren) {
                masterChildren.Children.forEach(c => {
                    if (ArrayExtensions_1.ArrayExtensions.ContainsItem(this.state.AvailableValues, c)) {
                        if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(newAvailableValues, c)) {
                            newAvailableValues.push(c);
                        }
                    }
                });
            }
            else {
                if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(newAvailableValues, av)) {
                    newAvailableValues.push(av);
                }
            }
        });
        return newAvailableValues;
    }
    RemoveAll() {
        let newSelectedValues = [];
        let newAvailableValues = [].concat(this.state.AllValues);
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
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
            if (this.props.ValueMember) {
                let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == x);
                if (originalItem) {
                    newAvailableValues.push(originalItem);
                }
            }
            else {
                let originalItem = this.state.AllValues.find(y => y == x);
                if (originalItem) {
                    newAvailableValues.push(originalItem);
                }
            }
        });
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
        this.setState({
            UiSelectedSelectedValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues
        }, () => this.raiseOnChange());
    }
    DragSelectedStart(e, listElement) {
        this.draggedHTMLElement = e.currentTarget;
        this.draggedElement = listElement;
    }
    DragSelectedEnd() {
        if (this.overHTMLElement && this.draggedElement) {
            //now we need to check in which drop area we dropped the selected item
            let to;
            let from = this.state.SelectedValues.indexOf(this.draggedElement);
            let newSelectedArray;
            let newAvailableValues;
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
                    let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == this.draggedElement);
                    if (originalItem) {
                        let checkForExistig = newAvailableValues.find(x => x == originalItem);
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem);
                        }
                    }
                }
                else {
                    let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
                    if (originalItem) {
                        let checkForExistig = newAvailableValues.find(x => x == originalItem);
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem);
                        }
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                if (this.props.ValueMember) {
                    let originalItem = this.state.AllValues.find(y => y[this.props.ValueMember] == this.draggedElement);
                    if (originalItem) {
                        let checkForExistig = newAvailableValues.find(x => x == originalItem);
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem);
                        }
                    }
                }
                else {
                    let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
                    if (originalItem) {
                        let checkForExistig = newAvailableValues.find(x => x == originalItem);
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem);
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
            this.draggedElement = null;
            // Update state 
            newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
            }, () => this.raiseOnChange());
        }
    }
    DragAvailableStart(e, listElement) {
        this.draggedHTMLElement = e.currentTarget;
        this.draggedElement = listElement;
    }
    DragAvailableEnd() {
        if (this.overHTMLElement && this.draggedElement) {
            let to;
            let from = this.state.AvailableValues.indexOf(this.draggedElement);
            let newSelectedArray;
            let newAvailableValues;
            if (this.overHTMLElement.classList.contains("Selected")) {
                from = this.state.AvailableValues.indexOf(this.draggedElement);
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                if (this.props.ValueMember) {
                    newSelectedArray.splice(to, 0, this.draggedElement[this.props.ValueMember]);
                }
                else {
                    newSelectedArray.splice(to, 0, this.draggedElement);
                }
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                if (this.props.ValueMember) {
                    newSelectedArray.push(this.draggedElement[this.props.ValueMember]);
                }
                else {
                    newSelectedArray.push(this.draggedElement);
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
            }, () => this.raiseOnChange());
        }
    }
    DragEnterAvailable(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverAvailable(e) {
        e.preventDefault();
        e.stopPropagation();
        //we can only drop selected data into available
        if (!this.draggedHTMLElement.classList.contains("Selected")) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        let targetElement = (e.target);
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) {
            return;
        }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveAvailable(e) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target);
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
    DragEnterSelected(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOverSelected(e) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target);
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) {
            return;
        }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    }
    DragLeaveSelected(e) {
        e.preventDefault();
        e.stopPropagation();
        let targetElement = (e.target);
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
    handleChangeFilterValue(x) {
        this.setState({
            FilterValue: x
        });
    }
    sortColumnValues() {
        if (this.state.SortOrder == Enums_1.SortOrder.Ascending) {
            this.setState({
                AvailableValues: Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Descending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Descending
            });
        }
        else {
            this.setState({
                AvailableValues: Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Ascending
            });
        }
    }
    raiseOnChange() {
        this.props.onChange(this.state.SelectedValues);
    }
    onClickSelectedItem(item) {
        let index = this.state.UiSelectedSelectedValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedSelectedValues: newArray });
        }
        else {
            let newArray = [...this.state.UiSelectedSelectedValues];
            newArray.push(item);
            //we reorder the array so UiSelectedSelectedValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.SelectedValues.indexOf(a) < this.state.SelectedValues.indexOf(b)) ? -1 : (this.state.SelectedValues.indexOf(a) > this.state.SelectedValues.indexOf(b)) ? 1 : 0);
            this.setState({ UiSelectedSelectedValues: newArray });
        }
    }
    onClickAvailableValuesItem(item) {
        let index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedAvailableValues: newArray });
        }
        else {
            let newArray = [...this.state.UiSelectedAvailableValues];
            newArray.push(item);
            //we reorder the array so UiSelectedAvailableValues hass the same order as the list displayed on screen
            newArray.sort((a, b) => (this.state.AvailableValues.indexOf(a) < this.state.AvailableValues.indexOf(b)) ? -1 : (this.state.AvailableValues.indexOf(a) > this.state.AvailableValues.indexOf(b)) ? 1 : 0);
            this.setState({ UiSelectedAvailableValues: newArray });
        }
    }
}
exports.DualListBoxEditor = DualListBoxEditor;
var listGroupStyleAvailableLarge = {
    'overflowY': 'auto',
    'height': '430px',
    'marginBottom': '0px'
};
var listGroupStyleSelectedLarge = {
    'overflowY': 'auto',
    'height': '465px',
    'marginBottom': '0px'
};
var listGroupStyleAvailableSmall = {
    'overflowY': 'auto',
    'height': '350px',
    'marginBottom': '0px'
};
var listGroupStyleSelectedSmall = {
    'overflowY': 'auto',
    'height': '385px',
    'marginBottom': '0px'
};
var listGroupItemStyle = {
    'fontSize': 'small',
    'padding': '5px',
};
var colButtonStyle = {
    transform: 'translateY(100px)',
    horitzontalAlign: 'center',
    margin: '0px',
    padding: '0px'
};
