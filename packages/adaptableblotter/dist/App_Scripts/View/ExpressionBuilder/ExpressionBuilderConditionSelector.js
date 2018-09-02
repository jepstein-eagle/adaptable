"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ExpressionBuilderColumnValues_1 = require("./ExpressionBuilderColumnValues");
const ExpressionBuilderUserFilter_1 = require("./ExpressionBuilderUserFilter");
const ExpressionBuilderRanges_1 = require("./ExpressionBuilderRanges");
const react_bootstrap_1 = require("react-bootstrap");
const FilterHelper_1 = require("../../Core/Helpers/FilterHelper");
const Enums_1 = require("../../Core/Enums");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
const Helper_1 = require("../../Core/Helpers/Helper");
const Waiting_1 = require("../Components/FilterForm/Waiting");
class ExpressionBuilderConditionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.buildState(this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(this.buildState(nextProps));
        this.buildColumnValuesState();
    }
    buildState(theProps) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(theProps.SelectedColumnId)) {
            return {
                SelectedColumnId: "",
                ColumnValues: [],
                SelectedColumnValues: [],
                AllFilterExpresions: [],
                SelectedFilterExpressions: [],
                SelectedColumnRanges: [],
                QueryBuildStatus: this.props.QueryBuildStatus,
                ShowWaitingMessage: false
            };
        }
        else {
            let selectedColumnValues;
            let selectedColumnFilterExpressions;
            let selectedColumnRanges;
            // get selectedcolumn values
            let keyValuePair = theProps.Expression.ColumnValueExpressions.find(x => x.ColumnId == theProps.SelectedColumnId);
            if (keyValuePair) {
                selectedColumnValues = keyValuePair.ColumnValues;
            }
            else {
                selectedColumnValues = [];
            }
            // get selected filter expressions
            let filterExpressions = theProps.Expression.FilterExpressions.find(x => x.ColumnId == theProps.SelectedColumnId);
            selectedColumnFilterExpressions = [];
            if (filterExpressions) {
                filterExpressions.Filters.forEach((fe) => {
                    // if its a userfilter add it to that list
                    let userFilter = this.props.UserFilters.find(uf => uf.Name == fe);
                    if (userFilter) {
                        selectedColumnFilterExpressions.push(fe);
                    }
                    // if it is a system filter add it ot that list
                    let selectedSystemFilter = this.props.SystemFilters.find(sf => sf == fe);
                    if (selectedSystemFilter) {
                        selectedColumnFilterExpressions.push(fe);
                    }
                });
            }
            let availableFilterExpressions = this.props.UserFilters.map(f => f.Name).concat(...this.props.SystemFilters.map(sf => sf));
            // get ranges
            let ranges = theProps.Expression.RangeExpressions.find(x => x.ColumnId == theProps.SelectedColumnId);
            selectedColumnRanges = (ranges) ? ranges.Ranges : [];
            return {
                SelectedColumnId: this.state.SelectedColumnId,
                ColumnValues: this.state.ColumnValues,
                SelectedColumnValues: selectedColumnValues,
                AllFilterExpresions: availableFilterExpressions,
                SelectedFilterExpressions: selectedColumnFilterExpressions,
                SelectedColumnRanges: selectedColumnRanges,
                QueryBuildStatus: this.props.QueryBuildStatus,
                ShowWaitingMessage: false
            };
        }
    }
    buildColumnValuesState() {
        let shouldGetColumnValues = false;
        if (this.props.SelectedColumnId != this.state.SelectedColumnId) {
            shouldGetColumnValues = true;
        }
        else if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.state.ColumnValues) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.SelectedColumnId)) {
            shouldGetColumnValues = true;
        }
        if (shouldGetColumnValues) {
            let columnValuePairs = [];
            if (this.props.Blotter.BlotterOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.Blotter.BlotterOptions.getColumnValues(this.props.SelectedColumnId).
                    then(result => {
                    if (result == null) { // if nothing returned then default to normal
                        columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                        columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                        this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                    }
                    else { // get the distinct items and make sure within max items that can be displayed
                        let distinctItems = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(result).slice(0, this.props.Blotter.BlotterOptions.maxColumnValueItemsDisplayed);
                        distinctItems.forEach(di => {
                            //    let displayValue = this.props.Blotter.getDisplayValueFromRawValue(this.props.CurrentColumn.ColumnId, di) 
                            columnValuePairs.push({ RawValue: di, DisplayValue: di });
                        });
                        this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
                        // set the UIPermittedValues for this column to what has been sent
                        this.props.Blotter.api.uiSetColumnPermittedValues(this.props.SelectedColumnId, distinctItems);
                    }
                }, function (error) {
                    //    this.setState({ name: error });
                });
            }
            else {
                columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                this.setState({ ColumnValues: columnValuePairs, ShowWaitingMessage: false, SelectedColumnId: this.props.SelectedColumnId });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__conditionselector";
        let column = (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnId)) ? null : this.props.ColumnsList.find(x => x.ColumnId == this.props.SelectedColumnId);
        let selectedColumn = column;
        let selectedColumnFriendlyName = (selectedColumn) ? selectedColumn.FriendlyName : "";
        // get filter names
        // first system ones
        let availableFilterNames = [];
        FilterHelper_1.FilterHelper.GetSystemFiltersForColumn(selectedColumn, this.props.SystemFilters).forEach((sf) => {
            availableFilterNames.push(sf);
        });
        FilterHelper_1.FilterHelper.GetUserFiltersForColumn(selectedColumn, this.props.UserFilters).forEach((uf) => {
            availableFilterNames.push(uf.Name);
        });
        // get the help descriptions
        let firstTimeText = "Start creating the query by selecting a column below.";
        let secondTimeText = "Select another column for the query.";
        let selectedColumnText = "Build the Query: Use the tabs below to add column values, filters or ranges for this column as required.";
        if (this.props.ExpressionMode == Enums_1.ExpressionMode.SingleColumn) {
            selectedColumnText += "This Query can only contain one Query Condition.";
        }
        let panelHeader = (this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn) ? "Select a Column" : "Column: " + selectedColumnFriendlyName;
        let clearButton = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName + " pull-right ", onClick: () => this.onSelectedColumnChanged(), bsStyle: "default", style: { margin: "5px" }, size: "xsmall", overrideDisableButton: this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn, overrideText: "Clear", overrideTooltip: "Clear", DisplayMode: "Text" });
        return React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: panelHeader, bsStyle: "info", style: { height: '447px' }, button: clearButton }, this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn || this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFurtherColumn ?
            React.createElement("div", null,
                this.state.QueryBuildStatus == Enums_1.QueryBuildStatus.SelectFirstColumn ?
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, firstTimeText))
                    :
                        React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                            React.createElement(react_bootstrap_1.HelpBlock, null, secondTimeText)),
                this.state.ShowWaitingMessage ?
                    React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })
                    :
                        React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.props.SelectedColumnId], ColumnList: this.props.ColumnsList, onColumnChange: columns => this.onColumnSelectChange(columns), SelectionMode: Enums_1.SelectionMode.Single }))
            :
                React.createElement("div", null, selectedColumn &&
                    React.createElement("div", null, this.props.Blotter.BlotterOptions.columnValuesOnlyInQueries ?
                        React.createElement("div", null, this.state.ShowWaitingMessage ?
                            React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })
                            :
                                React.createElement(ExpressionBuilderColumnValues_1.ExpressionBuilderColumnValues, { cssClassName: cssClassName, ColumnValues: this.state.ColumnValues, SelectedValues: this.state.SelectedColumnValues, onColumnValuesChange: (selectedValues) => this.onSelectedColumnValuesChange(selectedValues) }))
                        :
                            React.createElement(react_bootstrap_1.Tab.Container, { id: "left-tabs-example", defaultActiveKey: this.props.SelectedTab, activeKey: this.props.SelectedTab, onSelect: () => this.onSelectTab() },
                                React.createElement("div", null,
                                    React.createElement(react_bootstrap_1.Nav, { bsStyle: "pills" },
                                        React.createElement(react_bootstrap_1.NavItem, { eventKey: Enums_1.QueryTab.ColumnValue, onClick: () => this.onTabChanged(Enums_1.QueryTab.ColumnValue) }, "Column Values"),
                                        React.createElement(react_bootstrap_1.NavItem, { eventKey: Enums_1.QueryTab.Filter, onSelect: () => this.onTabChanged(Enums_1.QueryTab.Filter) }, "Filters"),
                                        React.createElement(react_bootstrap_1.NavItem, { eventKey: Enums_1.QueryTab.Range, onClick: () => this.onTabChanged(Enums_1.QueryTab.Range) }, "Ranges")),
                                    React.createElement(react_bootstrap_1.Tab.Content, { animation: true },
                                        React.createElement(react_bootstrap_1.Tab.Pane, { eventKey: Enums_1.QueryTab.ColumnValue }, selectedColumn.DataType != Enums_1.DataType.Boolean &&
                                            React.createElement("div", null, this.state.ShowWaitingMessage ?
                                                React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })
                                                :
                                                    React.createElement(ExpressionBuilderColumnValues_1.ExpressionBuilderColumnValues, { cssClassName: cssClassName, ColumnValues: this.state.ColumnValues, SelectedValues: this.state.SelectedColumnValues, onColumnValuesChange: (selectedValues) => this.onSelectedColumnValuesChange(selectedValues) }))),
                                        React.createElement(react_bootstrap_1.Tab.Pane, { eventKey: Enums_1.QueryTab.Filter },
                                            React.createElement(ExpressionBuilderUserFilter_1.ExpressionBuilderUserFilter, { cssClassName: cssClassName, AvailableFilterNames: availableFilterNames, SelectedFilterNames: this.state.SelectedFilterExpressions, onFilterNameChange: (selectedValues) => this.onSelectedFiltersChanged(selectedValues) })),
                                        React.createElement(react_bootstrap_1.Tab.Pane, { eventKey: Enums_1.QueryTab.Range },
                                            React.createElement(ExpressionBuilderRanges_1.ExpressionBuilderRanges, { cssClassName: cssClassName, SelectedColumn: selectedColumn, Ranges: this.state.SelectedColumnRanges, Columns: this.props.ColumnsList, onRangesChange: (ranges) => this.onSelectedColumnRangesChange(ranges) }))))))));
    }
    onSelectTab() {
        // empty
    }
    onTabChanged(tab) {
        this.props.onSelectedColumnChange(this.props.SelectedColumnId, tab);
    }
    onSelectedColumnChanged() {
        this.props.onSelectedColumnChange("", Enums_1.QueryTab.ColumnValue);
    }
    onSelectedColumnRangesChange(selectedRanges) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colRangesExpression = this.props.Expression.RangeExpressions;
        let rangesCol = colRangesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (rangesCol) {
            if (selectedRanges.length == 0) {
                let keyValuePairIndex = colRangesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId);
                colRangesExpression.splice(keyValuePairIndex, 1);
            }
            else {
                rangesCol.Ranges = selectedRanges;
            }
        }
        else {
            colRangesExpression.push({ ColumnId: this.props.SelectedColumnId, Ranges: selectedRanges });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { RangeExpressions: colRangesExpression }));
        this.setState({ SelectedColumnRanges: selectedRanges });
    }
    onSelectedColumnValuesChange(selectedColumnValues) {
        let colValuesExpression = this.props.Expression.ColumnValueExpressions;
        let valuesCol = colValuesExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (valuesCol) {
            if (selectedColumnValues.length == 0) {
                let keyValuePairIndex = colValuesExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId);
                colValuesExpression.splice(keyValuePairIndex, 1);
            }
            else {
                valuesCol.ColumnValues = selectedColumnValues;
            }
        }
        else {
            colValuesExpression.push({ ColumnId: this.props.SelectedColumnId, ColumnValues: selectedColumnValues });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { ColumnValueExpressions: colValuesExpression }));
        this.setState({ SelectedColumnValues: selectedColumnValues });
    }
    onSelectedFiltersChanged(selectedFilters) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let colUserFilterExpression = this.props.Expression.FilterExpressions;
        let userFilterExpressionCol = colUserFilterExpression.find(x => x.ColumnId == this.props.SelectedColumnId);
        if (userFilterExpressionCol) {
            if (selectedFilters.length == 0) {
                let keyValuePairIndex = colUserFilterExpression.findIndex(x => x.ColumnId == this.props.SelectedColumnId);
                colUserFilterExpression.splice(keyValuePairIndex, 1);
            }
            else {
                userFilterExpressionCol.Filters = selectedFilters;
            }
        }
        else {
            colUserFilterExpression.push({ ColumnId: this.props.SelectedColumnId, Filters: selectedFilters });
        }
        this.props.onExpressionChange(Object.assign({}, this.props.Expression, { FilterExpressions: colUserFilterExpression }));
        this.setState({ SelectedFilterExpressions: selectedFilters });
    }
    onColumnSelectChange(columns) {
        this.props.onSelectedColumnChange(columns.length > 0 ? columns[0].ColumnId : "", Enums_1.QueryTab.ColumnValue);
    }
}
exports.ExpressionBuilderConditionSelector = ExpressionBuilderConditionSelector;
