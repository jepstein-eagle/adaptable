"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
class CellSummaryDetails extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__CellSummary";
        let colItems = [
            { Content: "Operation", Size: 4 },
            { Content: "Value", Size: 8 },
        ];
        let rowElements = [];
        if (this.props.CellSummary != null) {
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Sum, this.props.CellSummary.Sum, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Average, this.props.CellSummary.Average, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Median, this.props.CellSummary.Median, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Distinct, this.props.CellSummary.Distinct, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Max, this.props.CellSummary.Max, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Min, this.props.CellSummary.Min, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOperation.Count, this.props.CellSummary.Count, cssClassName));
            if (this.props.CellSummary.Only != null) {
                rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOptionalOperation.Only, this.props.CellSummary.Only, cssClassName));
            }
            if (this.props.CellSummary.VWAP != null) {
                rowElements.push(this.createRow(colItems, Enums_1.CellSummaryOptionalOperation.VWAP, this.props.CellSummary.VWAP, cssClassName));
            }
        }
        return React.createElement("div", { className: cssClassName + StyleConstants.ITEMS_TABLE },
            React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: colItems, bsStyle: "info" }),
            this.props.CellSummary != null ?
                React.createElement("div", { className: cssClassName + StyleConstants.ITEMS_TABLE_BODY }, rowElements)
                :
                    React.createElement(react_bootstrap_1.ControlLabel, null, "No cells are selected - please select some cells."));
    }
    createRow(colItems, key, value, cssClassName) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = key;
        rowColItems[1].Content = value;
        let rowElement = React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: key, colItems: rowColItems });
        return rowElement;
    }
}
exports.CellSummaryDetails = CellSummaryDetails;
