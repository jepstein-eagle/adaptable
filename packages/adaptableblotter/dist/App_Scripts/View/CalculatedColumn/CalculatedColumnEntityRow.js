"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const CalculatedColumnHelper_1 = require("../../Utilities/Helpers/CalculatedColumnHelper");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class CalculatedColumnEntityRow extends React.Component {
    render() {
        let calculatedColumn = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: calculatedColumn.ColumnId });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: CalculatedColumnHelper_1.CalculatedColumnHelper.GetExpressionString(calculatedColumn.ColumnExpression, this.props.Columns) });
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, calculatedColumn), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.CalculatedColumnStrategyName });
        colItems[2].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.CalculatedColumnEntityRow = CalculatedColumnEntityRow;
