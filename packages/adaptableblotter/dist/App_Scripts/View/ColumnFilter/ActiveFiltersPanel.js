"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const ButtonSave_1 = require("../Components/Buttons/ButtonSave");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
class ActiveFiltersPanel extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ACTIVE_FILTERS;
        let colItems = [
            { Content: "Column", Size: 4 },
            { Content: "Filter", Size: 4 },
            { Content: "", Size: 4 },
        ];
        let rowElements = [];
        this.props.ColumnFilters.forEach((columnFilter, index) => {
            rowElements.push(this.createRow(colItems, columnFilter, cssClassName));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: colItems, bsStyle: "info" }),
            React.createElement("div", { className: cssClassName + StyleConstants.ITEMS_TABLE_BODY }, rowElements));
    }
    createRow(colItems, columnFilter, cssClassName) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnFilter.ColumnId, this.props.Columns);
        rowColItems[1].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, false);
        rowColItems[2].Content = React.createElement("span", { style: { alignContent: "right" } },
            React.createElement(ButtonSave_1.ButtonSave, { cssClassName: this.props.cssClassName, onClick: () => this.props.onSaveColumnFilterasUserFilter(columnFilter), overrideTooltip: "Save as User Filter", bsStyle: "primary", DisplayMode: "Glyph", size: "xsmall", overrideDisableButton: columnFilter == null || ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions), AccessLevel: this.props.AccessLevel }),
            ' ',
            React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName, onClick: () => this.props.onClear(columnFilter), overrideTooltip: "Clear Column Filter", bsStyle: StyleConstants.DEFAULT_BSSTYLE, DisplayMode: "Glyph", size: "xs", overrideDisableButton: columnFilter == null, AccessLevel: this.props.AccessLevel }));
        let rowElement = React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: columnFilter.ColumnId, colItems: rowColItems });
        return rowElement;
    }
}
exports.ActiveFiltersPanel = ActiveFiltersPanel;
