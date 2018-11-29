"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const react_bootstrap_1 = require("react-bootstrap");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const Enums_1 = require("../../Utilities/Enums");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ButtonPreviewDelete_1 = require("../Components/Buttons/ButtonPreviewDelete");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class ExpressionBuilderPreview extends React.Component {
    componentWillReceiveProps(nextProps, nextContext) {
        //       this.ensureSelectedColumnVisible(nextProps.SelectedColumnId)
    }
    render() {
        let cssClassName = this.props.cssClassName + "__querypreview";
        let columnList = ExpressionHelper_1.ExpressionHelper.GetColumnListFromExpression(this.props.Expression);
        let previewLists = columnList.map(columnId => {
            // First lets do the column values
            let columnValues = this.props.Expression.ColumnValueExpressions.find(colValues => colValues.ColumnId == columnId);
            let columnValuesListgroupItems;
            if (columnValues) {
                columnValuesListgroupItems = columnValues.ColumnDisplayValues.map(y => {
                    //I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
                    // since html cannot render a button within a button.
                    // https://github.com/react-bootstrap/react-bootstrap/issues/1445
                    // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
                    // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like bad
                    return React.createElement(react_bootstrap_1.ListGroupItem, { bsSize: "xsmall", key: y },
                        React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.ColumnValue), style: { cursor: 'pointer', fontSize: 'small' } },
                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                y,
                                React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteColumnValue(columnId, y), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                });
            }
            // Next do the user filter expressions
            let columnUserFilterExpressions = this.props.Expression.FilterExpressions.find(ne => ne.ColumnId == columnId);
            let columnUserFilterExpressionsListgroupItems;
            if (columnUserFilterExpressions) {
                columnUserFilterExpressionsListgroupItems = columnUserFilterExpressions.Filters.map((filter, index) => {
                    return React.createElement(react_bootstrap_1.ListGroupItem, { key: filter },
                        React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Filter), style: { cursor: 'pointer' } },
                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                filter,
                                React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteUserFilterExpression(columnId, index), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                });
            }
            // Finally do the column ranges
            let columnRanges = this.props.Expression.RangeExpressions.find(colValues => colValues.ColumnId == columnId);
            let columnRangesListgroupItems;
            /* Note: these used to say:  this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation();  - do we need that? */
            if (columnRanges) {
                columnRangesListgroupItems = columnRanges.Ranges.map((y, index) => {
                    if (y.Operator == Enums_1.LeafExpressionOperator.Between) {
                        if (StringExtensions_1.StringExtensions.IsEmpty(y.Operand1) || StringExtensions_1.StringExtensions.IsEmpty(y.Operand2)) {
                            return React.createElement(react_bootstrap_1.ListGroupItem, { key: columnId + index, bsStyle: StyleConstants.DANGER_BSSTYLE },
                                React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Range), style: { cursor: 'pointer' } },
                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                        ExpressionHelper_1.ExpressionHelper.OperatorToShortFriendlyString(y.Operator),
                                        ' ',
                                        this.getOperand1Value(y),
                                        ' ',
                                        "And",
                                        ' ',
                                        this.getOperand2Value(y),
                                        React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteRange(columnId, index), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                        }
                        else {
                            return React.createElement(react_bootstrap_1.ListGroupItem, { key: columnId + index },
                                React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Range), style: { cursor: 'pointer' } },
                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                        ExpressionHelper_1.ExpressionHelper.OperatorToShortFriendlyString(y.Operator),
                                        ' ',
                                        this.getOperand1Value(y),
                                        ' ',
                                        "And",
                                        ' ',
                                        this.getOperand2Value(y),
                                        React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteRange(columnId, index), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                        }
                    }
                    else {
                        if (StringExtensions_1.StringExtensions.IsEmpty(y.Operand1) || y.Operator == Enums_1.LeafExpressionOperator.Unknown) {
                            return React.createElement(react_bootstrap_1.ListGroupItem, { key: columnId + index, bsStyle: StyleConstants.DANGER_BSSTYLE },
                                React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Range), style: { cursor: 'pointer' } },
                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                        ExpressionHelper_1.ExpressionHelper.OperatorToShortFriendlyString(y.Operator),
                                        ' ',
                                        this.getOperand1Value(y),
                                        React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteRange(columnId, index), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                        }
                        else {
                            return React.createElement(react_bootstrap_1.ListGroupItem, { key: columnId + index },
                                React.createElement("div", { className: "ab_div_like_button", onClick: () => this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Range), style: { cursor: 'pointer' } },
                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                                        ExpressionHelper_1.ExpressionHelper.OperatorToShortFriendlyString(y.Operator),
                                        ' ',
                                        this.getOperand1Value(y),
                                        React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: cssClassName, bsStyle: "default", style: { float: 'right' }, onClick: () => this.props.DeleteRange(columnId, index), size: "xsmall", overrideDisableButton: false, DisplayMode: "Glyph" }))));
                        }
                    }
                });
            }
            let columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnId, this.props.ColumnsList);
            return React.createElement("div", { key: columnId + "div", className: this.props.ReadOnlyMode ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(react_bootstrap_1.Button, { block: true, className: cssClassName + StyleConstants.PREVIEW_HEADER_BUTTON, style: { width: "250px" }, bsStyle: "success", bsSize: "small", key: columnId + "header", ref: columnId, onClick: () => this.onColumnHeaderSelected(columnId) },
                            React.createElement("u", null, columnFriendlyName))),
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(react_bootstrap_1.Button, { block: true, className: cssClassName + StyleConstants.PREVIEW_DELETE_COLUMN_BUTTON, style: { width: "40px" }, bsStyle: "success", bsSize: "small", key: columnId + "headerx", ref: columnId, onClick: () => this.props.DeleteAllColumnExpression(columnId) },
                            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "trash" })))),
                React.createElement(react_bootstrap_1.ListGroup, { style: { overflowY: "hidden" } },
                    columnValuesListgroupItems,
                    columnUserFilterExpressionsListgroupItems,
                    columnRangesListgroupItems));
        });
        return React.createElement("div", null,
            this.props.ShowPanel &&
                React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Preview", bsStyle: "info" },
                    React.createElement("div", { style: { height: '385px', overflowY: 'auto', 'overflowX': 'hidden' } }, previewLists)),
            !this.props.ShowPanel &&
                React.createElement("div", null, previewLists));
    }
    onColumnHeaderSelected(columnId) {
        let columnValues = this.props.Expression.ColumnValueExpressions.find(colValues => colValues.ColumnId == columnId);
        if (columnValues) {
            this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.ColumnValue);
            return;
        }
        let columnUserFilterExpressions = this.props.Expression.FilterExpressions.find(ne => ne.ColumnId == columnId);
        if (columnUserFilterExpressions) {
            this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Filter);
            return;
        }
        this.props.onSelectedColumnChange(columnId, Enums_1.QueryTab.Range);
    }
    ensureSelectedColumnVisible(columnId) {
        var itemComponent = this.refs[columnId];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent);
            domNode.scrollIntoView(true);
        }
    }
    getOperand1Value(range) {
        if (range.Operand1Type == Enums_1.RangeOperandType.Column) {
            let col = this.props.ColumnsList.find(c => c.ColumnId == range.Operand1);
            return col ? "[" + col.FriendlyName + "]" : "";
        }
        else {
            return range.Operand1;
        }
    }
    getOperand2Value(range) {
        if (range.Operand2Type == Enums_1.RangeOperandType.Column) {
            let col = this.props.ColumnsList.find(c => c.ColumnId == range.Operand2);
            return col ? "[" + col.FriendlyName + "]" : "";
        }
        else {
            return range.Operand2;
        }
    }
}
exports.ExpressionBuilderPreview = ExpressionBuilderPreview;
