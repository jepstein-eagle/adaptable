"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const Enums_1 = require("../../../Utilities/Enums");
const ListBoxFilterSortComponent_1 = require("./ListBoxFilterSortComponent");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class SingleListBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Values: Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.Values, this.props.SortMember),
            UiSelectedValues: this.props.UiSelectedValues,
            FilterValue: "",
            SortOrder: Enums_1.SortOrder.Ascending
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            Values: Helper_1.Helper.sortArrayWithProperty(this.state.SortOrder, nextProps.Values, this.props.SortMember),
            UiSelectedValues: nextProps.UiSelectedValues,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder
        });
    }
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.SINGLE_LIST_BOX;
        let itemsElements = this.state.Values.map(x => {
            let isActive;
            if (this.props.ValueMember) {
                isActive = this.state.UiSelectedValues.indexOf(x[this.props.ValueMember]) >= 0;
            }
            else {
                isActive = this.state.UiSelectedValues.indexOf(x) >= 0;
            }
            let display = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            if (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: value, style: listGroupItemStyle, onClick: () => this.onClickItem(x), active: isActive, value: value }, display);
            }
        });
        let header = React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.FilterValue, sortColumnValues: () => this.sortColumnValues(), SortOrder: this.state.SortOrder, handleChangeFilterValue: (e) => this.handleChangeFilterValue(e), DisableSort: false });
        return React.createElement("div", { className: cssClassName },
            header,
            React.createElement(react_bootstrap_1.ListGroup, { style: this.props.style }, itemsElements));
    }
    handleChangeFilterValue(x) {
        this.setState({
            FilterValue: x
        });
    }
    sortColumnValues() {
        if (this.state.SortOrder == Enums_1.SortOrder.Ascending) {
            this.setState({
                Values: Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Descending, this.state.Values, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Descending
            });
        }
        else {
            this.setState({
                Values: Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.state.Values, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Ascending
            });
        }
    }
    raiseOnChange() {
        this.props.onSelectedChange(this.state.UiSelectedValues);
    }
    onClickItem(item) {
        let index;
        if (this.props.ValueMember) {
            index = this.state.UiSelectedValues.indexOf(item[this.props.ValueMember]);
        }
        else {
            index = this.state.UiSelectedValues.indexOf(item);
        }
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedValues: newArray }, () => this.raiseOnChange());
        }
        else {
            let newArray = [...this.state.UiSelectedValues];
            if (this.props.SelectionMode == Enums_1.SelectionMode.Single) {
                newArray = [];
            }
            if (this.props.ValueMember) {
                newArray.push(item[this.props.ValueMember]);
            }
            else {
                newArray.push(item);
            }
            this.setState({ UiSelectedValues: newArray }, () => this.raiseOnChange());
        }
    }
}
exports.SingleListBox = SingleListBox;
var listGroupItemStyle = {
    'fontSize': 'small',
    'padding': '5px',
};
