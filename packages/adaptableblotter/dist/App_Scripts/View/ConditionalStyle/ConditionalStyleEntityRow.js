"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const Enums_1 = require("../../Core/Enums");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class ConditionalStyleEntityRow extends React.Component {
    render() {
        let conditionalStyle = this.props.AdaptableBlotterObject;
        let column = this.props.Columns.find(x => x.ColumnId == conditionalStyle.ColumnId);
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content =
            conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column ?
                ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(conditionalStyle.ColumnId, this.props.Columns) :
                "Whole Row";
        colItems[1].Content = React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: conditionalStyle.Style });
        colItems[2].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(conditionalStyle.Expression, this.props.Columns);
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, conditionalStyle), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, ConfigEntity: conditionalStyle, overrideDisableEdit: (!column && conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column), ConfirmDeleteAction: this.props.onDeleteConfirm, EntityName: StrategyIds.ConditionalStyleStrategyName });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.ConditionalStyleEntityRow = ConditionalStyleEntityRow;
