"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const AdaptableBlotterFormControlTextClear_1 = require("../Forms/AdaptableBlotterFormControlTextClear");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const UIHelper_1 = require("../../UIHelper");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class ListBoxFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UiSelectedColumnValues: this.props.UiSelectedColumnValues,
            UiSelectedUserFilters: this.props.UiSelectedUserFilters,
            UiSelectedRange: this.props.UiSelectedRange,
            FilterValue: "",
            DistinctCriteriaPairValue: this.props.DistinctCriteriaPairValue
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
            UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
            UiSelectedRange: nextProps.UiSelectedRange,
            FilterValue: this.state.FilterValue,
        });
    }
    render() {
        let userFiltersItemsElements = this.props.UserFilters.map((x, y) => {
            let isActive;
            isActive = this.state.UiSelectedUserFilters.indexOf(x.RawValue) >= 0;
            let display = x.DisplayValue;
            let value = x.RawValue;
            if (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: "userFilter" + y, style: userFilterItemStyle, onClick: () => this.onClickItemUserFilter(x), active: isActive, value: value }, display);
            }
        });
        let columnValuesItemsElements = this.props.ColumnValuePairs.map((x, y) => {
            let isActive;
            let columnValue;
            if (this.props.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue) {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.DisplayValue) >= 0;
                columnValue = x.DisplayValue;
            }
            else {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.RawValue) >= 0;
                columnValue = x.RawValue;
            }
            if (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterValue) && columnValue.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return React.createElement(react_bootstrap_1.ListGroupItem, { key: "columnValue" + y, style: columnVItemStyle, onClick: () => this.onClickItemColumnValue(x), active: isActive, value: columnValue }, columnValue);
            }
        });
        let textClear = React.createElement(AdaptableBlotterFormControlTextClear_1.AdaptableBlotterFormControlTextClear, { cssClassName: this.props.cssClassName, autoFocus: true, style: searchFilterStyle, type: "text", placeholder: "Search Filters", value: this.state.FilterValue, bsSize: "small", OnTextChange: (x) => this.onUpdateFilterSearch(x) });
        let rangeOperandOptions = ["Value", "Column"];
        let rangeMenuItemsOperand1 = rangeOperandOptions.map((rangeOperand, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index + rangeOperand, eventKey: index + rangeOperand, onClick: () => this.onRangeTypeChangedOperand1(rangeOperand) }, rangeOperand);
        });
        let rangeMenuItemsOperand2 = rangeOperandOptions.map((rangeOperand, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index + rangeOperand, eventKey: index + rangeOperand, onClick: () => this.onRangeTypeChangedOperand2(rangeOperand) }, rangeOperand);
        });
        let rangeForm = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "advancedForm" },
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", style: rangeOperatorStyle, componentClass: "select", placeholder: "select", value: this.state.UiSelectedRange.Operator, onChange: (x) => this.onLeafExpressionOperatorChange(x) }, this.props.Operators.map((operator) => {
                    return React.createElement("option", { key: operator, value: operator.toString() }, ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, this.props.DataType));
                })),
                this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.Unknown &&
                    React.createElement(react_bootstrap_1.InputGroup, null,
                        React.createElement(react_bootstrap_1.DropdownButton, { bsSize: "small", style: rangeTypeStyle, title: this.state.UiSelectedRange.Operand1Type, id: "range_operand_1", componentClass: react_bootstrap_1.InputGroup.Button }, rangeMenuItemsOperand1),
                        this.getOperand1FormControl()),
                this.state.UiSelectedRange.Operator == Enums_1.LeafExpressionOperator.Between &&
                    React.createElement(react_bootstrap_1.InputGroup, null,
                        React.createElement(react_bootstrap_1.DropdownButton, { bsSize: "small", style: rangeTypeStyle, title: this.state.UiSelectedRange.Operand2Type, id: "range_operand_2", componentClass: react_bootstrap_1.InputGroup.Button }, rangeMenuItemsOperand2),
                        this.getOperand2FormControl()),
                React.createElement("div", { style: separatorStyle }, "- - - - - - - - - - - - - - - -")));
        return React.createElement("div", { style: divStyle },
            rangeForm,
            textClear,
            React.createElement(react_bootstrap_1.ListGroup, { style: listGroupStyle },
                userFiltersItemsElements,
                columnValuesItemsElements));
    }
    // Methods for getting the range
    onLeafExpressionOperatorChange(event) {
        let e = event.target;
        let editedRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: e.value, Operand1: this.state.UiSelectedRange.Operand1, Operand2: this.state.UiSelectedRange.Operand2 };
        this.setState({ UiSelectedRange: editedRange }, () => this.raiseOnChangeCustomExpression());
    }
    onRangeTypeChangedOperand1(rangeOperandType) {
        let editedRange = { Operand1Type: rangeOperandType, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: "", Operand2: this.state.UiSelectedRange.Operand2 };
        this.setState({ UiSelectedRange: editedRange }, () => this.raiseOnChangeCustomExpression());
    }
    onRangeTypeChangedOperand2(rangeOperandType) {
        let editedRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: rangeOperandType, Operator: this.state.UiSelectedRange.Operator, Operand1: this.state.UiSelectedRange.Operand1, Operand2: "" };
        this.setState({ UiSelectedRange: editedRange }, () => this.raiseOnChangeCustomExpression());
    }
    getOperand1FormControl() {
        if (this.state.UiSelectedRange.Operand1Type == "Column") {
            let operand1 = (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1)) ?
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.state.UiSelectedRange.Operand1, this.props.Columns) :
                "Select a column";
            let availableColumns = this.props.Columns.filter(() => this.props.CurrentColumn).map((column, index) => {
                return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onColumnOperand1SelectedChanged(column) }, column.FriendlyName);
            });
            return React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableColumns.length == 0, style: { minWidth: "150px" }, className: this.props.cssClassName, bsSize: "small", bsStyle: "default", title: operand1, id: "operand1" }, availableColumns);
        }
        else {
            return React.createElement(react_bootstrap_1.FormControl, { value: String(this.state.UiSelectedRange.Operand1), bsSize: "small", style: rangeOperandStyle, type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.DataType), onChange: (e) => this.onOperand1Edit(e) });
        }
    }
    getOperand2FormControl() {
        if (this.state.UiSelectedRange.Operand2Type == "Column") {
            let operand2 = (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2)) ?
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.state.UiSelectedRange.Operand2, this.props.Columns) :
                "Select a column";
            let availableColumns = this.props.Columns.filter(() => this.props.CurrentColumn).map((column, index) => {
                return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onColumnOperand2SelectedChanged(column) }, column.FriendlyName);
            });
            return React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableColumns.length == 0, style: { minWidth: "150px" }, className: this.props.cssClassName, bsSize: "small", bsStyle: "default", title: operand2, id: "operand2" }, availableColumns);
        }
        else {
            return React.createElement(react_bootstrap_1.FormControl, { value: String(this.state.UiSelectedRange.Operand2), bsSize: "small", style: rangeOperandStyle, type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.DataType), onChange: (e) => this.onOperand2Edit(e) });
        }
    }
    onOperand1Edit(event) {
        let e = event.target;
        let newRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: e.value, Operand2: this.state.UiSelectedRange.Operand2 };
        this.setState({ UiSelectedRange: newRange }, () => this.raiseOnChangeCustomExpression());
    }
    onOperand2Edit(event) {
        let e = event.target;
        let newRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: this.state.UiSelectedRange.Operand1, Operand2: e.value };
        this.setState({ UiSelectedRange: newRange }, () => this.raiseOnChangeCustomExpression());
    }
    onColumnOperand1SelectedChanged(column) {
        let editedRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: column.ColumnId, Operand2: this.state.UiSelectedRange.Operand2 };
        this.setState({ UiSelectedRange: editedRange }, () => this.raiseOnChangeCustomExpression());
    }
    onColumnOperand2SelectedChanged(column) {
        let editedRange = { Operand1Type: this.state.UiSelectedRange.Operand2Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: this.state.UiSelectedRange.Operand1, Operand2: column.ColumnId };
        this.setState({ UiSelectedRange: editedRange }, () => this.raiseOnChangeCustomExpression());
    }
    // Methods for getting column values or filters
    onUpdateFilterSearch(filterSearch) {
        this.setState({ FilterValue: filterSearch });
    }
    raiseOnChangeColumnValues() {
        this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
    }
    raiseOnChangeUserFilter() {
        this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
    }
    raiseOnChangeCustomExpression() {
        let isValidRange = false;
        if (this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.Unknown) {
            if (this.state.UiSelectedRange.Operator != Enums_1.LeafExpressionOperator.Between) {
                isValidRange = (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1));
            }
            else {
                isValidRange = (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2));
            }
        }
        if (isValidRange) {
            this.props.onCustomRangeExpressionChange(this.state.UiSelectedRange);
        }
    }
    onClickItemColumnValue(item) {
        let index;
        index = this.state.UiSelectedColumnValues.indexOf(item.DisplayValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedColumnValues: newArray }, () => this.raiseOnChangeColumnValues());
        }
        else {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.push(item.DisplayValue);
            this.setState({ UiSelectedColumnValues: newArray }, () => this.raiseOnChangeColumnValues());
        }
    }
    onClickItemUserFilter(item) {
        let index = this.state.UiSelectedUserFilters.indexOf(item.RawValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.splice(index, 1);
            this.setState({ UiSelectedUserFilters: newArray }, () => this.raiseOnChangeUserFilter());
        }
        else {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.push(item.RawValue);
            this.setState({ UiSelectedUserFilters: newArray }, () => this.raiseOnChangeUserFilter());
        }
    }
}
exports.ListBoxFilterForm = ListBoxFilterForm;
let divStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '450px',
    'marginBottom': '0'
};
let listGroupStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '335px',
    'marginBottom': '0'
};
let userFilterItemStyle = {
    //'width': '87%',export 
    'fontStyle': 'italic',
    'fontSize': 'small',
    'padding': '5px',
    'margin': 0
};
let columnVItemStyle = {
    //'width': '87%',
    'fontSize': 'small',
    'padding': '5px',
    'margin': 0
};
let rangeOperatorStyle = {
    'marginTop': '0px',
    'marginLeft': '15px',
    'width': '222px'
};
let rangeOperandStyle = {
    'marginTop': '0px',
    'marginLeft': '0px',
    'width': '150px'
};
let rangeTypeStyle = {
    'marginTop': '0px',
    'marginLeft': '15px',
    'width': '72px'
};
let searchFilterStyle = {
    'marginTop': '0px',
    'marginLeft': '0px',
    'width': '222px'
};
let separatorStyle = {
    'marginTop': '10px',
    'marginBottom': '0px',
    'marginLeft': '15px',
    'width': '222px',
};
