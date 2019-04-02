"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class PlusMinusEntityRow extends React.Component {
    render() {
        let x = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, this.props.Column) });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(react_bootstrap_1.FormControl, { value: x.NudgeValue.toString(), bsSize: "small", type: "number", placeholder: "Enter a Number", onChange: (e) => this.props.onColumnDefaultNudgeValueChange(this.props.Index, e) }) });
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.wrapExpressionDescription(x) });
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, x), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, overrideDisableEdit: false, EntityType: StrategyConstants.PlusMinusStrategyName + " Rule " });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    wrapExpressionDescription(PlusMinusRule) {
        return (PlusMinusRule.IsDefaultNudge) ? "[Default Column Nudge Value]" : ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(PlusMinusRule.Expression, this.props.Columns);
    }
}
exports.PlusMinusEntityRow = PlusMinusEntityRow;
