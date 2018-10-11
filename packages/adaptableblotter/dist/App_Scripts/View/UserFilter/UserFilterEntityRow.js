"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class UserFilterEntityRow extends React.Component {
    render() {
        let userFilter = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = userFilter.Name;
        colItems[1].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(userFilter.ColumnId, this.props.Columns);
        colItems[2].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns);
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, userFilter), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, overrideDisableEdit: false, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityName: StrategyConstants.UserFilterStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.UserFilterEntityRow = UserFilterEntityRow;
