"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const FilterRedux = require("../../../Redux/ActionsReducers/FilterRedux");
const ExpressionHelper_1 = require("../../../Core/Helpers/ExpressionHelper");
const FilterHelper_1 = require("../../../Core/Helpers/FilterHelper");
const Enums_1 = require("../../../Core/Enums");
const Helper_1 = require("../../../Core/Helpers/Helper");
const ListBoxFilterForm_1 = require("./ListBoxFilterForm");
const ButtonClose_1 = require("../Buttons/ButtonClose");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const PanelWithTwoButtons_1 = require("../Panels/PanelWithTwoButtons");
const ButtonClear_1 = require("../Buttons/ButtonClear");
const Waiting_1 = require("./Waiting");
const ArrayExtensions_1 = require("../../../Core/Extensions/ArrayExtensions");
const ListBoxMenu_1 = require("./ListBoxMenu");
class FilterFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnValuePairs: [],
            ShowWaitingMessage: false,
            SelectedTab: Enums_1.ContextMenuTab.Filter
        };
    }
    componentWillMount() {
        if (this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean) {
            let columnValuePairs = [];
            if (this.props.BlotterOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.BlotterOptions.getColumnValues(this.props.CurrentColumn.ColumnId).
                    then(result => {
                    if (result == null) { // if nothing returned then default to normal
                        columnValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                        columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                        this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
                    }
                    else { // get the distinct items and make sure within max items that can be displayed
                        let distinctItems = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(result).slice(0, this.props.BlotterOptions.maxColumnValueItemsDisplayed);
                        distinctItems.forEach(di => {
                            columnValuePairs.push({ RawValue: di, DisplayValue: di });
                        });
                        this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
                        // set the UIPermittedValues for this column to what has been sent
                        this.props.BlotterApi.uiSetColumnPermittedValues(this.props.CurrentColumn.ColumnId, distinctItems);
                    }
                }, function (error) {
                    //    this.setState({ name: error });
                });
            }
            else {
                columnValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                columnValuePairs = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnValuePairs, Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue]);
                this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
            }
        }
    }
    render() {
        let cssClassName = StyleConstants.FILTER_FORM;
        // get user filter expressions appropriate for this column
        let appropriateFilters = FilterHelper_1.FilterHelper.GetUserFiltersForColumn(this.props.CurrentColumn, this.props.UserFilters).map(uf => uf.Name).concat(FilterHelper_1.FilterHelper.GetSystemFiltersForColumn(this.props.CurrentColumn, this.props.SystemFilters).map(sf => sf)); //.filter(u => FilterHelper.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));
        let appropriateFilterItems = appropriateFilters.map((uf, index) => { return { RawValue: uf, DisplayValue: uf }; });
        let existingColumnFilter = this.props.CurrentColumn.DataType != Enums_1.DataType.Boolean && this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let uiSelectedColumnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : [];
        let uiSelectedUserFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let uiSelectedRangeExpression = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges[0] : ExpressionHelper_1.ExpressionHelper.CreateEmptyRangeExpression();
        let leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(this.props.CurrentColumn.DataType);
        let isEmptyFilter = uiSelectedColumnValues.length == 0 && uiSelectedUserFilters.length == 0 && ExpressionHelper_1.ExpressionHelper.IsEmptyRange(uiSelectedRangeExpression);
        // let isEmptyFilter: boolean = uiSelectedColumnValues.length == 0 && uiSelectedUserFilters.length == 0 && ;
        let closeButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onCloseForm(), bsStyle: "default", size: "xsmall", DisplayMode: "Glyph", hideToolTip: true });
        let clearFilterButton = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName + " pull-right ", onClick: () => this.onClearFilter(), bsStyle: "default", style: { margin: "5px" }, size: "xsmall", overrideDisableButton: isEmptyFilter, overrideText: "Clear", DisplayMode: "Text", hideToolTip: true });
        return React.createElement("div", null,
            React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { cssClassName: cssClassName, style: panelStyle, className: "ab_no-padding-except-top-panel ab_small-padding-panel", ContextMenuTab: this.state.SelectedTab, ContextMenuChanged: (e) => this.onSelectTab(e), IsAlwaysFilter: this.props.EmbedColumnMenu, bsStyle: "default", clearFilterButton: clearFilterButton, closeButton: closeButton }, this.state.SelectedTab == Enums_1.ContextMenuTab.Menu ?
                React.createElement(ListBoxMenu_1.ListBoxMenu, { ContextMenuItems: this.props.ContextMenuItems, onContextMenuItemClick: (action) => this.onContextMenuItemClick(action) })
                :
                    React.createElement("div", null, this.state.ShowWaitingMessage ?
                        React.createElement(Waiting_1.Waiting, { WaitingMessage: "Retrieving Column Values..." })
                        :
                            React.createElement(ListBoxFilterForm_1.ListBoxFilterForm, { cssClassName: cssClassName, CurrentColumn: this.props.CurrentColumn, Columns: this.props.Columns, ColumnValues: this.state.ColumnValuePairs, DataType: this.props.CurrentColumn.DataType, UiSelectedColumnValues: uiSelectedColumnValues, UiSelectedUserFilters: uiSelectedUserFilters, UiSelectedRange: uiSelectedRangeExpression, UserFilters: appropriateFilterItems, onColumnValueSelectedChange: (list) => this.onClickColumValue(list), onUserFilterSelectedChange: (list) => this.onClickUserFilter(list), Operators: leafExpressionOperators, onCustomRangeExpressionChange: (range) => this.onSetCustomExpression(range) }))));
    }
    onSelectTab(tab) {
        this.setState({ SelectedTab: tab });
    }
    getLeafExpressionOperatorsForDataType(dataType) {
        return ExpressionHelper_1.ExpressionHelper.GetOperatorsForDataType(dataType);
    }
    onClickColumValue(columnValues) {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : [];
        this.persistFilter(columnValues, userFilters, rangeExpressions);
    }
    onClickUserFilter(userFilters) {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : [];
        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : [];
        this.persistFilter(columnValues, userFilters, rangeExpressions);
    }
    onSetCustomExpression(rangeExpression) {
        let existingColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : [];
        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : [];
        this.persistFilter(columnValues, userFilters, [rangeExpression]);
    }
    persistFilter(columnValues, userFilters, rangeExpressions) {
        let expression;
        expression = ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, columnValues, userFilters, rangeExpressions);
        let columnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression, IsReadOnly: false };
        //delete if empty
        if (columnValues.length == 0 && userFilters.length == 0 && rangeExpressions.length == 0) {
            this.props.onDeleteColumnFilter(columnFilter);
        }
        else {
            this.props.onAddEditColumnFilter(columnFilter);
        }
    }
    onClearFilter() {
        this.persistFilter([], [], []);
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
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
        BlotterOptions: ownProps.Blotter.BlotterOptions,
        BlotterApi: ownProps.Blotter.api,
        ContextMenuItems: state.Menu.ContextMenu.Items
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onContextMenuItemClick: (action) => dispatch(action),
        onDeleteColumnFilter: (columnFilter) => dispatch(FilterRedux.ColumnFilterDelete(columnFilter)),
        onAddEditColumnFilter: (columnFilter) => dispatch(FilterRedux.ColumnFilterAddUpdate(columnFilter)),
        onHideFilterForm: () => dispatch(FilterRedux.HideFilterForm()),
    };
}
exports.FilterForm = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);
exports.FilterFormReact = (FilterContext) => React.createElement(react_redux_1.Provider, { store: FilterContext.Blotter.AdaptableBlotterStore.TheStore },
    React.createElement(exports.FilterForm, { getColumnValueDisplayValuePairDistinctList: (columnId, distinctCriteria) => FilterContext.Blotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria), Blotter: FilterContext.Blotter, CurrentColumn: FilterContext.Column, TeamSharingActivated: false, EmbedColumnMenu: FilterContext.Blotter.EmbedColumnMenu }));
let panelStyle = {
    width: '235px'
};
