"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const Enums_1 = require("../../Core/Enums");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class ConditionalStyleEntityRow extends React.Component {
    render() {
        let conditionalStyle = this.props.AdaptableBlotterObject;
        let column = ColumnHelper_1.ColumnHelper.getColumnFromId(conditionalStyle.ColumnId, this.props.Columns);
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = this.getScope(conditionalStyle);
        colItems[1].Content = React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: conditionalStyle.Style });
        colItems[2].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(conditionalStyle.Expression, this.props.Columns);
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, conditionalStyle), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, overrideDisableEdit: (!column && conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column), ConfirmDeleteAction: this.props.onDeleteConfirm, EntityName: StrategyConstants.ConditionalStyleStrategyName });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    getScope(conditionalStyle) {
        switch (conditionalStyle.ConditionalStyleScope) {
            case Enums_1.ConditionalStyleScope.Row:
                return "Row";
            case Enums_1.ConditionalStyleScope.Column:
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(conditionalStyle.ColumnId, this.props.Columns);
            case Enums_1.ConditionalStyleScope.ColumnCategory:
                return "Category: " + conditionalStyle.ColumnCategoryId;
        }
    }
}
exports.ConditionalStyleEntityRow = ConditionalStyleEntityRow;
