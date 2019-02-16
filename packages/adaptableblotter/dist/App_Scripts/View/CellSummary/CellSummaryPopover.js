"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const CellSummaryDetails_1 = require("./CellSummaryDetails");
class CellSummaryPopover extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.CELL_SUMMARY;
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "", bsStyle: "info", className: "ab_preview_panel" },
                React.createElement(CellSummaryDetails_1.CellSummaryDetails, { cssClassName: cssClassName, CellSummary: this.props.CellSummary })));
    }
}
exports.CellSummaryPopover = CellSummaryPopover;
