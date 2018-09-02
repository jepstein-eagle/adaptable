"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ExpressionBuilderConditionSelector_1 = require("./ExpressionBuilderConditionSelector");
const react_bootstrap_1 = require("react-bootstrap");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const ExpressionBuilderPreview_1 = require("./ExpressionBuilderPreview");
const Enums_1 = require("../../Core/Enums");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonCondition_1 = require("../Components/Buttons/ButtonCondition");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class ExpressionBuilderPage extends React.Component {
    constructor() {
        super(...arguments);
        this.StepName = "Build Expression";
    }
    render() {
        let cssClassName = this.props.cssClassName + "__querybuilder";
        let queryBuildStatus = this.getQueryBuildStatus();
        let newButton = React.createElement(ButtonCondition_1.ButtonCondition, { cssClassName: cssClassName, onClick: () => this.onSelectedColumnChanged(), overrideDisableButton: queryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn || queryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn || queryBuildStatus == Enums_1.QueryBuildStatus.SingleConditionsAdded, overrideTooltip: "Add Condition", style: { width: "230px" }, DisplayMode: "Glyph+Text", size: "small" });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Query Builder", button: newButton, bsStyle: "primary", style: { height: '520px' } },
                React.createElement(react_bootstrap_1.Row, null,
                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                        React.createElement(ExpressionBuilderConditionSelector_1.ExpressionBuilderConditionSelector, { ColumnsList: this.props.Columns, cssClassName: cssClassName, QueryBuildStatus: queryBuildStatus, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Expression: this.state.Expression, ExpressionMode: (this.props.ExpressionMode != null) ? this.props.ExpressionMode : Enums_1.ExpressionMode.MultiColumn, onExpressionChange: (expression) => this.onChangeExpression(expression), onSelectedColumnChange: (columnId, tab) => this.onSelectedColumnChange(columnId, tab), SelectedColumnId: this.state.SelectedColumnId, SelectedTab: this.state.SelectedTab, Blotter: this.props.Blotter })),
                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                        React.createElement(ExpressionBuilderPreview_1.ExpressionBuilderPreview, { Expression: this.state.Expression, cssClassName: cssClassName, UserFilters: this.props.UserFilters, onSelectedColumnChange: (columnId, tab) => this.onSelectedColumnChange(columnId, tab), ColumnsList: this.props.Columns, DeleteColumnValue: (columnId, value) => this.DeleteColumnValue(columnId, value), DeleteUserFilterExpression: (columnId, index) => this.DeleteUserFilterExpression(columnId, index), DeleteRange: (columnId, index) => this.DeleteRange(columnId, index), DeleteAllColumnExpression: (columnId) => this.DeleteAllColumnExpression(columnId), ShowPanel: true })))));
    }
    getQueryBuildStatus() {
        // if now expression then assume its new  - fair?
        if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.state.Expression)) {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return Enums_1.QueryBuildStatus.SelectFirstColumn; // you neeed to select a column
            }
            else {
                return Enums_1.QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
            }
        }
        else { // we have an expression
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return Enums_1.QueryBuildStatus.SelectFurtherColumn; // you neeed to select another column
            }
            else {
                return (this.props.ExpressionMode == Enums_1.ExpressionMode.SingleColumn) ? Enums_1.QueryBuildStatus.SingleConditionsAdded : Enums_1.QueryBuildStatus.MultipleConditionsAdded; // do we need this status???
            }
        }
    }
    onSelectedColumnChanged() {
        this.setState({ SelectedColumnId: "" }, () => this.props.UpdateGoBackState());
    }
    DeleteColumnValue(columnId, value) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValues = this.state.Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId);
        let index = columnValues.ColumnValues.indexOf(value);
        columnValues.ColumnValues.splice(index, 1);
        if (columnValues.ColumnValues.length == 0) {
            let columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(x => x.ColumnId == columnId);
            this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
        }
        let newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, () => this.props.UpdateGoBackState());
    }
    DeleteUserFilterExpression(columnId, index) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(x => x.ColumnId == columnId);
        columnUserFilterExpressions.Filters.splice(index, 1);
        if (columnUserFilterExpressions.Filters.length == 0) {
            let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnId == columnId);
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
        }
        let newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, () => this.props.UpdateGoBackState());
    }
    DeleteRange(columnId, index) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnRanges = this.state.Expression.RangeExpressions.find(x => x.ColumnId == columnId);
        columnRanges.Ranges.splice(index, 1);
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnId == columnId);
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
        }
        let newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, () => this.props.UpdateGoBackState());
    }
    DeleteAllColumnExpression(columnId) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(x => x.ColumnId == columnId);
        if (columnValuesIndex >= 0) {
            this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
        }
        let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnId == columnId);
        if (columnUserFilterExpressionIndex >= 0) {
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
        }
        let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnId == columnId);
        if (columnRangesIndex >= 0) {
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
        }
        let newExpression = Object.assign({}, this.state.Expression);
        this.setState({ Expression: newExpression }, () => this.props.UpdateGoBackState());
    }
    onChangeExpression(newExpression) {
        this.setState({ Expression: newExpression }, () => this.props.UpdateGoBackState());
    }
    onSelectedColumnChange(columnId, tab) {
        this.setState({ SelectedColumnId: columnId, SelectedTab: tab }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(this.state.Expression);
    }
    canBack() { return true; /*return !this.state.IsEdit; */ }
    Next() { }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ExpressionBuilderPage = ExpressionBuilderPage;
