"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ColumnFilterRedux = require("../../../Redux/ActionsReducers/ColumnFilterRedux");
const UserFilterRedux = require("../../../Redux/ActionsReducers/UserFilterRedux");
const HomeRedux = require("../../../Redux/ActionsReducers/HomeRedux");
const PopupRedux = require("../../../Redux/ActionsReducers/PopupRedux");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const FilterHelper_1 = require("../../../Utilities/Helpers/FilterHelper");
const Enums_1 = require("../../../Utilities/Enums");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const ListBoxFilterForm_1 = require("./ListBoxFilterForm");
const ButtonClose_1 = require("../Buttons/ButtonClose");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const ButtonClear_1 = require("../Buttons/ButtonClear");
const Waiting_1 = require("./Waiting");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ListBoxMenu_1 = require("./ListBoxMenu");
const react_bootstrap_1 = require("react-bootstrap");
const FilterFormPanel_1 = require("../Panels/FilterFormPanel");
const ButtonSave_1 = require("../Buttons/ButtonSave");
const ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
class FilterFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnValuePairs: [],
            ShowWaitingMessage: false,
            SelectedTab: Enums_1.ContextMenuTab.Filter,
            DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue,
        };
    }
    componentWillMount() {
        if (this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean) {
            let columnValuePairs = [];
            if (this.props.Blotter.BlotterOptions.queryOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.Blotter.BlotterOptions.queryOptions.getColumnValues(this.props.CurrentColumn.ColumnId).
                    then(result => {
                    if (result == null) { // if nothing returned then default to normal
                        columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                        columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                        this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false, DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue });
                    }
                    else { // get the distinct items and make sure within max items that can be displayed
                        let distinctItems = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(0, this.props.Blotter.BlotterOptions.queryOptions.maxColumnValueItemsDisplayed);
                        distinctItems.forEach(distinctItem => {
                            let displayValue = (result.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue) ?
                                this.props.Blotter.getDisplayValueFromRawValue(this.props.CurrentColumn.ColumnId, distinctItem) :
                                distinctItem;
                            columnValuePairs.push({ RawValue: distinctItem, DisplayValue: displayValue });
                        });
                        let distinctCriteriaPairValue = (result.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.RawValue) ?
                            Enums_1.DistinctCriteriaPairValue.RawValue :
                            Enums_1.DistinctCriteriaPairValue.DisplayValue;
                        this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false, DistinctCriteriaPairValue: distinctCriteriaPairValue });
                        // set the UIPermittedValues for this column to what has been sent
                        this.props.Blotter.api.userInterfaceApi.SetColumnPermittedValues(this.props.CurrentColumn.ColumnId, distinctItems);
                    }
                }, function () {
                    //    this.setState({ name: error });
                });
            }
            else {
                columnValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false, DistinctCriteriaPairValue: Enums_1.DistinctCriteriaPairValue.DisplayValue });
            }
        }
    }
    render() {
        let cssClassName = StyleConstants.FILTER_FORM;
        let isFilterable = this.isFilterable();
        // get user filter expressions appropriate for this column
        let appropriateFilters = FilterHelper_1.FilterHelper.GetUserFiltersForColumn(this.props.CurrentColumn, this.props.UserFilters).map(uf => uf.Name).concat(FilterHelper_1.FilterHelper.GetSystemFiltersForColumn(this.props.CurrentColumn, this.props.SystemFilters).map(sf => sf)); //.filter(u => FilterHelper.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));
        let appropriateFilterItems = appropriateFilters.map((uf) => { return { RawValue: uf, DisplayValue: uf }; });
        let existingColumnFilter = this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean && this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let uiSelectedColumnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues : [];
        let uiSelectedUserFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let uiSelectedRangeExpression = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges[0] : ExpressionHelper_1.ExpressionHelper.CreateEmptyRangeExpression();
        let leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(this.props.CurrentColumn.DataType);
        let isEmptyFilter = uiSelectedColumnValues.length == 0 && uiSelectedUserFilters.length == 0 && ExpressionHelper_1.ExpressionHelper.IsEmptyRange(uiSelectedRangeExpression);
        let hasUserFilter = uiSelectedUserFilters.length > 0;
        let closeButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onCloseForm(), bsStyle: "default", size: "xsmall", DisplayMode: "Glyph", hideToolTip: true, AccessLevel: Enums_1.AccessLevel.Full });
        let clearFilterButton = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName + " pull-right ", onClick: () => this.onClearFilter(), bsStyle: "default", style: { margin: "5px" }, size: "xsmall", overrideDisableButton: isEmptyFilter, overrideText: "Clear", DisplayMode: "Text", hideToolTip: true, AccessLevel: Enums_1.AccessLevel.Full });
        let saveButton = React.createElement(ButtonSave_1.ButtonSave, { cssClassName: this.props.cssClassName + " pull-right ", onClick: () => this.onSaveFilter(), bsStyle: "default", style: { margin: "5px" }, size: "xsmall", overrideDisableButton: isEmptyFilter || hasUserFilter, overrideText: "Save as User Filter", DisplayMode: "Glyph", hideToolTip: true, overrideTooltip: "Save as User Filter", AccessLevel: Enums_1.AccessLevel.Full });
        return React.createElement("div", null, StringExtensions_1.StringExtensions.IsNullOrEmpty(isFilterable) ?
            React.createElement(FilterFormPanel_1.FilterFormPanel, { cssClassName: cssClassName, style: panelStyle, className: "ab_no-padding-except-top-panel ab_small-padding-panel", ContextMenuTab: this.state.SelectedTab, ContextMenuChanged: (e) => this.onSelectTab(e), IsAlwaysFilter: this.props.EmbedColumnMenu, bsStyle: "default", clearFilterButton: clearFilterButton, saveButton: saveButton, closeButton: closeButton, showCloseButton: this.props.ShowCloseButton }, this.state.SelectedTab == Enums_1.ContextMenuTab.Menu ?
                React.createElement(ListBoxMenu_1.ListBoxMenu, { ContextMenuItems: this.props.ContextMenuItems, onContextMenuItemClick: (action) => this.onContextMenuItemClick(action) })
                :
                    React.createElement("div", null, this.state.ShowWaitingMessage ?
                        React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })
                        :
                            React.createElement(ListBoxFilterForm_1.ListBoxFilterForm, { cssClassName: cssClassName, CurrentColumn: this.props.CurrentColumn, Columns: this.props.Columns, ColumnValuePairs: this.state.ColumnValuePairs, DataType: this.props.CurrentColumn.DataType, DistinctCriteriaPairValue: this.state.DistinctCriteriaPairValue, UiSelectedColumnValues: uiSelectedColumnValues, UiSelectedUserFilters: uiSelectedUserFilters, UiSelectedRange: uiSelectedRangeExpression, UserFilters: appropriateFilterItems, onColumnValueSelectedChange: (list) => this.onClickColumValue(list), onUserFilterSelectedChange: (list) => this.onClickUserFilter(list), Operators: leafExpressionOperators, onCustomRangeExpressionChange: (range) => this.onSetCustomExpression(range) })))
            :
                React.createElement(react_bootstrap_1.HelpBlock, null, isFilterable));
    }
    isFilterable() {
        if (!this.props.CurrentColumn.Filterable) {
            return "Column is not filterable";
        }
        return "";
    }
    onSelectTab(tab) {
        this.setState({ SelectedTab: tab });
    }
    getLeafExpressionOperatorsForDataType(dataType) {
        return ExpressionHelper_1.ExpressionHelper.GetOperatorsForDataType(dataType);
    }
    onClickColumValue(columnValues) {
        let displayValues = [];
        let rawValues = [];
        columnValues.forEach(columnValue => {
            let columnValuePair = (this.state.DistinctCriteriaPairValue == Enums_1.DistinctCriteriaPairValue.DisplayValue) ?
                this.state.ColumnValuePairs.find(cvp => cvp.DisplayValue == columnValue) :
                this.state.ColumnValuePairs.find(cvp => cvp.RawValue == columnValue);
            displayValues.push(columnValuePair.DisplayValue);
            rawValues.push(columnValuePair.RawValue);
        });
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : [];
        this.persistFilter(displayValues, rawValues, userFilters, rangeExpressions);
    }
    onClickUserFilter(userFilters) {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let columnDisplayValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues : [];
        let columnRawValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues : [];
        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : [];
        this.persistFilter(columnDisplayValues, columnRawValues, userFilters, rangeExpressions);
    }
    onSetCustomExpression(rangeExpression) {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let columnDisplayValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnDisplayValues : [];
        let columnRawValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnRawValues : [];
        this.persistFilter(columnDisplayValues, columnRawValues, userFilters, [rangeExpression]);
    }
    persistFilter(columnDisplayValues, columnRawValues, userFilters, rangeExpressions) {
        let expression;
        expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, columnDisplayValues, columnRawValues, userFilters, rangeExpressions);
        let columnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilter(this.props.CurrentColumn.ColumnId, expression);
        //delete if empty
        if (columnDisplayValues.length == 0 && columnRawValues.length == 0 && userFilters.length == 0 && rangeExpressions.length == 0) {
            this.props.onClearColumnFilter(columnFilter.ColumnId);
        }
        else {
            this.props.onAddEditColumnFilter(columnFilter);
        }
    }
    onSaveFilter() {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let prompt = {
            Header: "Enter name for User Filter",
            Msg: "",
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(existingColumnFilter, "")
        };
        this.props.onShowPrompt(prompt);
    }
    onClearFilter() {
        this.persistFilter([], [], [], []);
    }
    onCloseForm() {
        this.props.onHideFilterForm();
    }
    onContextMenuItemClick(action) {
        this.props.onContextMenuItemClick(action);
        this.props.onHideFilterForm();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        Blotter: ownProps.Blotter,
        Columns: state.Grid.Columns,
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        ContextMenuItems: state.Menu.ContextMenu.Items,
        ShowCloseButton: ownProps.ShowCloseButton
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onContextMenuItemClick: (action) => dispatch(action),
        onClearColumnFilter: (columnId) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onAddEditColumnFilter: (columnFilter) => dispatch(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter)),
        onShowPrompt: (prompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onHideFilterForm: () => dispatch(HomeRedux.FilterFormHide()),
    };
}
exports.FilterForm = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);
exports.FilterFormReact = (FilterContext) => React.createElement(react_redux_1.Provider, { store: FilterContext.Blotter.AdaptableBlotterStore.TheStore },
    React.createElement(exports.FilterForm, { Blotter: FilterContext.Blotter, CurrentColumn: FilterContext.Column, TeamSharingActivated: false, EmbedColumnMenu: FilterContext.Blotter.EmbedColumnMenu, ShowCloseButton: FilterContext.ShowCloseButton }));
let panelStyle = {
    width: '235px'
};
