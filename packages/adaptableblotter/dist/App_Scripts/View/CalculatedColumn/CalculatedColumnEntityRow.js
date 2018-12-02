"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
class CalculatedColumnEntityRow extends React.Component {
    render() {
        let calculatedColumn = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = calculatedColumn.ColumnId;
        colItems[1].Content = calculatedColumn.ColumnExpression;
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, calculatedColumn), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, EntityName: StrategyConstants.CalculatedColumnStrategyName });
        colItems[2].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.CalculatedColumnEntityRow = CalculatedColumnEntityRow;
