"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const EntityRowItem_1 = require("../Components/EntityRowItem");
const UIHelper_1 = require("../UIHelper");
class ReminderEntityRow extends React.Component {
    render() {
        let reminder = this.props.AdaptableBlotterObject;
        //   let column = ColumnHelper.getColumnFromId(Reminder.ColumnId, this.props.Columns);
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: reminder.Alert.Msg });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: reminder.Alert.MessageType });
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: UIHelper_1.UIHelper.GetScheduleDescription(reminder.Schedule) });
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, reminder), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.ReminderStrategyName });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.ReminderEntityRow = ReminderEntityRow;
