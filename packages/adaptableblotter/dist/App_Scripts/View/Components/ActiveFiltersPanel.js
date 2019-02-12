"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const ButtonSave_1 = require("./Buttons/ButtonSave");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ButtonClear_1 = require("./Buttons/ButtonClear");
class ActiveFiltersPanel extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ACTIVE_FILTERS;
        var activeFilters = this.props.ColumnFilters.map((columnFilter, index) => {
            return React.createElement("tr", { key: index },
                React.createElement("td", null, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnFilter.ColumnId, this.props.Columns)),
                React.createElement("td", { colSpan: 2 },
                    " ",
                    ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, false)),
                React.createElement("td", null,
                    React.createElement("span", { style: { alignContent: "right" } },
                        React.createElement(ButtonSave_1.ButtonSave, { cssClassName: this.props.cssClassName, onClick: () => this.props.onSaveColumnFilterasUserFilter(columnFilter), overrideTooltip: "Save as User Filter", bsStyle: "primary", DisplayMode: "Glyph", size: "xsmall", overrideDisableButton: columnFilter == null || ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions), AccessLevel: this.props.AccessLevel }),
                        ' ',
                        React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName, onClick: () => this.props.onClear(columnFilter), overrideTooltip: "Clear Column Filter", bsStyle: StyleConstants.DEFAULT_BSSTYLE, DisplayMode: "Glyph", size: "xs", overrideDisableButton: columnFilter == null, AccessLevel: this.props.AccessLevel }))));
        });
        var header = React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "Column"),
                React.createElement("th", null, "Filter"),
                React.createElement("th", null),
                React.createElement("th", null)));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "", bsStyle: "info", className: "ab_preview_panel" },
                React.createElement("div", null,
                    React.createElement(react_bootstrap_1.Table, { style: { margin: "0px", padding: "0px" } },
                        header,
                        React.createElement("tbody", null, activeFilters)))));
    }
}
exports.ActiveFiltersPanel = ActiveFiltersPanel;
