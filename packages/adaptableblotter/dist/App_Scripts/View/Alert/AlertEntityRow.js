"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AlertHelper_1 = require("../../Utilities/Helpers/AlertHelper");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class AlertEntityRow extends React.Component {
    render() {
        let alert = this.props.AdaptableBlotterObject;
        let MessageTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MessageType).map((type) => {
            return React.createElement("option", { key: type, value: type }, type);
        });
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.getColumnandRule(alert) });
        colItems[1].Content =
            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: alert.MessageType, onChange: (x) => this.onMessageTypeChanged(this.props.Index, x) }, MessageTypes);
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.setExpressionDescription(alert) });
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, alert), shareClick: () => this.props.onShare(), overrideDisableEdit: !this.props.Column, EntityType: StrategyConstants.AlertStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    setExpressionDescription(Alert) {
        return (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(Alert.Expression)) ?
            ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns) :
            "No Expression";
    }
    getColumnandRule(Alert) {
        let columnInfo = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(Alert.ColumnId, this.props.Column);
        columnInfo += ": " + AlertHelper_1.AlertHelper.createAlertDescription(Alert, this.props.Columns);
        return columnInfo;
    }
    onMessageTypeChanged(index, event) {
        let e = event.target;
        let messageType;
        if (e.value == 'Info') {
            messageType = Enums_1.MessageType.Info;
        }
        else if (e.value == 'Warning') {
            messageType = Enums_1.MessageType.Warning;
        }
        else if (e.value == 'Error') {
            messageType = Enums_1.MessageType.Error;
        }
        this.props.onChangeMessageType(index, messageType);
    }
}
exports.AlertEntityRow = AlertEntityRow;
