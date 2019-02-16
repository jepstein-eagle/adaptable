"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const ListBoxFilterSortComponent_1 = require("../Components/ListBox/ListBoxFilterSortComponent");
class TestDragEditor extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder";
        this.placeholder.classList.add("list-group-item");
        this.placeholder.type = "button";
        let availableValues = new Array();
        this.props.AvailableValues.forEach(x => {
            if (this.props.SelectedValues.indexOf(x) < 0) {
                availableValues.push(x);
            }
        });
        this.state = {
            SelectedValues: this.props.SelectedValues,
            AvailableValues: availableValues,
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: "",
            SortOrder: Enums_1.SortOrder.Ascending,
            AllValues: this.props.AvailableValues,
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let availableValues = new Array();
        nextProps.AvailableValues.forEach(x => {
            if (nextProps.SelectedValues.indexOf(x) < 0) {
                availableValues.push(x);
            }
        });
        //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
        let uiAvailableSelected;
        let uiSelectedSelected;
        uiAvailableSelected = this.state.UiSelectedAvailableValues;
        uiSelectedSelected = this.state.UiSelectedSelectedValues;
        this.setState({
            SelectedValues: nextProps.SelectedValues,
            AvailableValues: availableValues,
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder,
        });
    }
    render() {
        let cssClassName = this.props.cssClassName;
        let setRefFirstSelected = true;
        // build selected elements
        let selectedElements = this.state.SelectedValues.map(x => {
            let isActive = this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            if (isActive && setRefFirstSelected) {
                setRefFirstSelected = false;
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: x, className: "Selected", draggable: true, onClick: () => this.onClickSelectedItem(x), active: isActive, ref: "FirstSelectedSelected", onDragStart: (event) => this.DragSelectedStart(event, x), onDragEnd: () => this.DragSelectedEnd(), value: x }, x);
            }
            else {
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: x, className: "Selected", draggable: true, onClick: () => this.onClickSelectedItem(x), bsSize: 'small', active: isActive, onDragStart: (event) => this.DragSelectedStart(event, x), onDragEnd: () => this.DragSelectedEnd(), value: x }, x);
            }
        });
        // build available elements - might have master/children
        let availableElements = this.state.AvailableValues.map(x => {
            let isActive = this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            return React.createElement("span", { key: x },
                React.createElement(react_bootstrap_1.ListGroupItem, { bsSize: 'small', className: "Available", active: isActive, draggable: true, onClick: () => this.onClickAvailableValuesItem(x), key: x, onDragStart: (event) => this.DragAvailableStart(event, x), onDragEnd: () => this.DragAvailableEnd(), value: x }, x));
        });
        let headerFirstListBox = React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.FilterValue, sortColumnValues: null, SortOrder: this.state.SortOrder, handleChangeFilterValue: (e) => this.handleChangeFilterValue(e), DisableSort: true });
        return (React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                React.createElement(react_bootstrap_1.Panel, { header: this.props.HeaderAvailable, className: "ab_no-padding-anywhere-panel", bsStyle: "info" },
                    React.createElement("div", null,
                        headerFirstListBox,
                        React.createElement(react_bootstrap_1.ListGroup, { className: "AvailableDropZone", onDragEnter: (event) => this.DragEnterAvailable(event), onDragOver: (event) => this.DragOverAvailable(event), onDragLeave: (event) => this.DragLeaveAvailable(event) }, availableElements)))),
            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                React.createElement(react_bootstrap_1.Panel, { header: this.props.HeaderSelected, className: "ab_no-padding-anywhere-panel", bsStyle: "info" },
                    React.createElement("div", null,
                        React.createElement(react_bootstrap_1.ListGroup, { className: "SelectedDropZone", onDragEnter: (event) => this.DragEnterSelected(event), onDragOver: (event) => this.DragOverSelected(event), onDragLeave: (event) => this.DragLeaveSelected(event) }, selectedElements))))));
    }
    ensureFirstSelectedItemVisible(top) {
        var itemComponent = this.refs['FirstSelectedSelected'];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent);
            domNode.scrollIntoView(top);
        }
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
                to = this.state.AvailableValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
                if (originalItem) {
                    let checkForExistig = newAvailableValues.find(x => x == originalItem);
                    if (!checkForExistig) {
                        newAvailableValues.splice(to, 0, originalItem);
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('AvailableDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.splice(from, 1);
                newAvailableValues = [...this.state.AvailableValues];
                let originalItem = this.state.AllValues.find(y => y == this.draggedElement);
                if (originalItem) {
                    let checkForExistig = newAvailableValues.find(x => x == originalItem);
                    if (!checkForExistig) {
                        newAvailableValues.push(originalItem);
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
            newAvailableValues = newAvailableValues;
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
                newSelectedArray.splice(to, 0, this.draggedElement);
                newAvailableValues = [...this.state.AvailableValues];
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('SelectedDropZone')) {
                newSelectedArray = [...this.state.SelectedValues];
                newSelectedArray.push(this.draggedElement);
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
    raiseOnChange() {
        //  this.props.onChange(this.state.SelectedValues);
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
exports.TestDragEditor = TestDragEditor;
