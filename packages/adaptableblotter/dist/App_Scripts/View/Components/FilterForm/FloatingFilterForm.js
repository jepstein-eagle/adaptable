"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeepDiff = require("deep-diff");
const React = require("react");
const FilterRedux = require("../../../Redux/ActionsReducers/FilterRedux");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const ExpressionHelper_1 = require("../../../Core/Helpers/ExpressionHelper");
const Enums_1 = require("../../../Core/Enums");
class FloatingFilterFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floatingFilterFormText: "",
            filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            numberOperatorPairs: [
                { Key: "<>", Value: Enums_1.LeafExpressionOperator.NotEquals },
                { Key: ">=", Value: Enums_1.LeafExpressionOperator.GreaterThanOrEqual },
                { Key: "<=", Value: Enums_1.LeafExpressionOperator.LessThanOrEqual },
                { Key: ">", Value: Enums_1.LeafExpressionOperator.GreaterThan },
                { Key: "<", Value: Enums_1.LeafExpressionOperator.LessThan },
                { Key: "=", Value: Enums_1.LeafExpressionOperator.Equals },
                { Key: ":", Value: Enums_1.LeafExpressionOperator.Between },
            ],
            stringOperatorPairs: [
                { Key: "%", Value: Enums_1.LeafExpressionOperator.StartsWith },
                { Key: "*", Value: Enums_1.LeafExpressionOperator.Contains },
                { Key: "!", Value: Enums_1.LeafExpressionOperator.NotContains },
                { Key: "=", Value: Enums_1.LeafExpressionOperator.Equals },
            ],
            dateOperatorPairs: [
            //   { Key: "=", Value: LeafExpressionOperator.Equals },
            ],
            placeholder: ""
        };
    }
    componentDidUpdate() {
        this.reconcileFilters();
    }
    componentDidMount() {
        this.reconcileFilters();
    }
    reconcileFilters() {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        if (existingColumnFilter) {
            // first check to see if we have an expression
            if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.state.filterExpression)) {
                // if we have no placeholder then set one - together with the placeholder
                let expressionDescription = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false);
                this.setState({ filterExpression: existingColumnFilter.Filter, placeholder: expressionDescription });
            }
            else {
                // we have an expression also - but if its not the same as the new one then update it to the new one
                let diff = DeepDiff.diff(existingColumnFilter.Filter, this.state.filterExpression);
                if (diff) {
                    let expressionDescription = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false);
                    this.setState({ filterExpression: existingColumnFilter.Filter, placeholder: expressionDescription, floatingFilterFormText: "" });
                }
            }
        }
        else {
            // no filter so make sure our stuff is clear
            if (this.state.placeholder != "TEMP") {
                if (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(this.state.filterExpression) || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.placeholder) || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.floatingFilterFormText)) {
                    this.clearState();
                }
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__floatingFilterForm";
        let controlType = (this.props.CurrentColumn.DataType == Enums_1.DataType.Date) ? "date" : "text";
        return React.createElement("span", null, this.props.Blotter.isFilterable() && this.props.CurrentColumn.Filterable
            && (this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean) &&
            React.createElement(react_bootstrap_1.FormControl, { style: { padding: '1px', marginTop: '5px', minHeight: '20px', maxHeight: '20px', fontSize: "x-small", fontWeight: "lighter" }, className: cssClassName, autoFocus: false, bsSize: "small", type: controlType, placeholder: this.state.placeholder, value: this.state.floatingFilterFormText, onChange: (x) => this.OnTextChange(x.target.value) }));
    }
    OnTextChange(searchText) {
        // as soon as anything changes clear existing column filter
        if (searchText.trim() != this.state.floatingFilterFormText.trim()) {
            this.clearExistingColumnFilter();
        }
        // if text is empty then clear our state
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(searchText.trim())) {
            this.clearState();
            return;
        }
        // otherwise handle the change
        this.handleFilterChange(searchText);
    }
    clearExistingColumnFilter() {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        if (existingColumnFilter) {
            this.props.onClearColumnFilter(this.props.CurrentColumn.ColumnId);
        }
    }
    createColumnFilter(expression, searchText) {
        let columnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression, IsReadOnly: false };
        this.setState({ floatingFilterFormText: searchText, filterExpression: expression, placeholder: "" });
        this.props.onAddEditColumnFilter(columnFilter);
    }
    createRangeExpression(operatorKVP, searchText) {
        if (searchText.trim() == operatorKVP.Key) {
            // its operator only so do nothing (but set placeholder to ensure not wiped)
            this.clearExpressionState(searchText);
        }
        else {
            let operand1 = searchText.replace(operatorKVP.Key, '');
            let operand2 = null;
            if (operatorKVP.Value == Enums_1.LeafExpressionOperator.Between) {
                let values = searchText.trim().split(operatorKVP.Key);
                if (!this.isValidBetweenValues(values)) {
                    this.clearExpressionState(searchText);
                    return;
                }
                operand1 = values[0];
                operand2 = values[1];
            }
            let range = {
                Operator: operatorKVP.Value,
                Operand1: operand1 == null ? null : operand1.trim(),
                Operand2: operand2 == null ? null : operand2.trim(),
                Operand1Type: "Value",
                Operand2Type: "Value"
            };
            let expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, [], [], [], [range]);
            this.createColumnFilter(expression, searchText);
        }
    }
    handleFilterChange(searchText) {
        // first check for existing operators and handle those
        let isRangeExpression = false;
        let operators;
        switch (this.props.CurrentColumn.DataType) {
            case Enums_1.DataType.Number:
                operators = this.state.numberOperatorPairs;
                break;
            case Enums_1.DataType.String:
                operators = this.state.stringOperatorPairs;
                break;
            case Enums_1.DataType.Date:
                operators = this.state.dateOperatorPairs;
                break;
        }
        operators.forEach(op => {
            if (!isRangeExpression) {
                if (searchText.includes(op.Key)) {
                    this.createRangeExpression(op, searchText);
                    isRangeExpression = true; // set to true so dont do >= and then later >
                }
            }
        });
        if (!isRangeExpression) {
            // next check to see if it has a ';' - if so then create an "In" for all values; not sure if raw or display...
            if (searchText.includes(";")) {
                let values = searchText.split(';').map(v => v.trim());
                let expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, values, [], [], []);
                this.createColumnFilter(expression, searchText);
            }
            else {
                // if just a single, non-operator, value then do an "Equals" range
                let equalOperatorPair = this.state.numberOperatorPairs.find(op => op.Value == Enums_1.LeafExpressionOperator.Equals);
                this.createRangeExpression(equalOperatorPair, searchText);
            }
        }
    }
    clearState() {
        this.setState({ floatingFilterFormText: "", filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(), placeholder: "" });
    }
    clearExpressionState(searchText) {
        this.setState({ floatingFilterFormText: searchText, filterExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(), placeholder: "TEMP" });
    }
    isValidBetweenValues(values) {
        if (values.length != 2) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(values[0]) || StringExtensions_1.StringExtensions.IsNullOrEmpty(values[1])) {
            return false;
        }
        return true;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        Blotter: ownProps.Blotter,
        Columns: state.Grid.Columns,
        ColumnFilters: state.Filter.ColumnFilters,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddEditColumnFilter: (columnFilter) => dispatch(FilterRedux.ColumnFilterAddUpdate(columnFilter)),
        onClearColumnFilter: (columnId) => dispatch(FilterRedux.ColumnFilterClear(columnId)),
    };
}
exports.FloatingFilterForm = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FloatingFilterFormComponent);
exports.FloatingFilterFormReact = (FilterContext) => React.createElement(react_redux_1.Provider, { store: FilterContext.Blotter.AdaptableBlotterStore.TheStore },
    React.createElement(exports.FloatingFilterForm, { Blotter: FilterContext.Blotter, CurrentColumn: FilterContext.Column, TeamSharingActivated: false, EmbedColumnMenu: FilterContext.Blotter.EmbedColumnMenu }));
