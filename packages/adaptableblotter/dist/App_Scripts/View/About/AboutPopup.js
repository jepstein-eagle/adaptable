"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const FilterRedux = require("../../Redux/ActionsReducers/FilterRedux");
const react_redux_1 = require("react-redux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Helper_1 = require("../../Core/Helpers/Helper");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
const ColumnFilterHelper_1 = require("../../Core/Helpers/ColumnFilterHelper");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
class AboutPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { test: "" };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__about";
        let colItems = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 5 },
            { Content: "", Size: 2 },
        ];
        let aboutItems = this.CreateAboutInfo(colItems, cssClassName).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: index, colItems: x });
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyIds.AboutStrategyName, bsStyle: "primary", glyphicon: StrategyIds.AboutGlyph },
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: aboutItems })));
    }
    CreateAboutInfo(colItems, cssClassName) {
        let options = this.props.Blotter.BlotterOptions;
        let returnRows = [];
        returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.Blotter.VendorGridName));
        returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "2.4"));
        if (options.blotterId != undefined) {
            returnRows.push(this.createColItem(colItems, "Blotter Id", options.blotterId));
        }
        if (options.userName != undefined) {
            returnRows.push(this.createColItem(colItems, "User", options.userName));
        }
        if (options.enableAuditLog != undefined) {
            returnRows.push(this.createColItem(colItems, "Audit Log", (options.enableAuditLog) ? "On" : "Off"));
        }
        if (options.enableRemoteConfigServer != undefined) {
            returnRows.push(this.createColItem(colItems, "Remote Configuration", (options.enableRemoteConfigServer) ? "On" : "Off"));
        }
        if (options.serverSearchOption != undefined) {
            returnRows.push(this.createColItem(colItems, "Server Search Option", options.serverSearchOption));
        }
        returnRows.push(this.createColItem(colItems, "Can Sort", this.props.Blotter.isSortable() ? "True" : "False"));
        let sorts = this.props.GridSorts.map(gs => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, this.props.Columns) + ": " + gs.SortOrder;
        });
        let clearSortsButton = React.createElement(ButtonClear_1.ButtonClear, { onClick: () => this.props.onClearAllSorts(), bsStyle: "primary", cssClassName: cssClassName, size: "small", overrideTooltip: "Clear Grid Sorts", DisplayMode: "Text+Glyph", overrideDisableButton: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.GridSorts) });
        returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
        returnRows.push(this.createColItem(colItems, "Can Filter", this.props.Blotter.isFilterable() ? "True" : "False"));
        let clearFilterButton = React.createElement(ButtonClear_1.ButtonClear, { onClick: () => this.clearColumnFilters(), bsStyle: "primary", cssClassName: cssClassName, size: "small", overrideTooltip: "Clear Column Filters", DisplayMode: "Text+Glyph", overrideDisableButton: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters) });
        returnRows.push(this.createColItem(colItems, "Column Filters", ColumnFilterHelper_1.ColumnFilterHelper.getColumnFiltersDescription(this.props.ColumnFilters, this.props.Columns, this.props.Blotter)));
        returnRows.push(this.createColItem(colItems, "All Rows", this.props.Blotter.getRowCount()));
        returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.Blotter.getVisibleRowCount()));
        returnRows.push(this.createColItem(colItems, "All Columns", this.props.Blotter.getColumnCount()));
        returnRows.push(this.createColItem(colItems, "Visible Column", this.props.Blotter.getVisibleColumnCount()));
        returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.Blotter.isSelectable() ? "True" : "False"));
        let calcColumns = this.props.CalculatedColumns.map(c => c.ColumnId);
        returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"));
        return returnRows;
    }
    createColItem(colItems, item1, item2, item3 = null) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = item1;
        rowColItems[1].Content = item2;
        rowColItems[2].Content = item3;
        return rowColItems;
    }
    clearColumnFilters() {
        this.props.onClearColumnFilters();
        this.forceUpdate();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        ColumnFilters: state.Filter.ColumnFilters,
        GridSorts: state.Grid.GridSorts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearColumnFilters: () => dispatch(FilterRedux.ColumnFilterClearAll()),
    };
}
exports.AboutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);
