"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../Utilities/Enums");
const AdaptablePopover_1 = require("../AdaptablePopover");
const react_bootstrap_1 = require("react-bootstrap");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const CellValidationHelper_1 = require("../../Utilities/Helpers/CellValidationHelper");
class PreviewResultsPanel extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.PREVIEW_RESULTS;
        let previewHeader = this.props.ShowHeader && this.props.PreviewInfo != null ? "Preview Results: " + (this.props.SelectedColumn ? this.props.SelectedColumn.FriendlyName : "") : "";
        var previewItems = this.props.PreviewInfo.PreviewResults.map((previewResult) => {
            return React.createElement("tr", { key: previewResult.Id },
                React.createElement("td", null, previewResult.InitialValue),
                React.createElement("td", null, previewResult.ComputedValue),
                previewResult.ValidationRules.length > 0 ?
                    React.createElement("td", null,
                        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent == true &&
                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [this.getValidationErrorMessage(previewResult.ValidationRules, this.props.Columns)], MessageType: Enums_1.MessageType.Error }),
                        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning == true &&
                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Error", bodyText: [this.getValidationErrorMessage(previewResult.ValidationRules, this.props.Columns)], MessageType: Enums_1.MessageType.Warning }))
                    :
                        React.createElement("td", null,
                            " ",
                            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "ok" }),
                            " "));
        });
        var header = React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "Old Value"),
                React.createElement("th", null, "New Value"),
                React.createElement("th", null, "Valid")));
        return React.createElement("div", { className: cssClassName }, this.props.ShowPanel &&
            React.createElement(react_bootstrap_1.Panel, { header: previewHeader, bsStyle: "info", className: "ab_preview_panel" },
                React.createElement("div", null,
                    React.createElement(react_bootstrap_1.Table, null,
                        header,
                        React.createElement("tbody", { style: { minWidth: "500px" } }, previewItems)))));
    }
    getValidationErrorMessage(CellValidations, columns) {
        let returnString = [];
        for (let CellValidation of CellValidations) {
            let expressionDescription = (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
                " when " + ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns) :
                "";
            returnString.push(CellValidationHelper_1.CellValidationHelper.createCellValidationDescription(CellValidation, columns) + expressionDescription);
        }
        return returnString.join("\n");
    }
}
exports.PreviewResultsPanel = PreviewResultsPanel;
