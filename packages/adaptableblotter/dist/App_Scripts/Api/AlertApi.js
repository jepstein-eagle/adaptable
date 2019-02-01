"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
class AlertApi extends ApiBase_1.ApiBase {
    Show(alertHeader, alertMessage, MessageType, showAsPopup) {
        let maxAlerts = this.getState().Alert.MaxAlertsInStore;
        let MessageTypeEnum = MessageType;
        let alertToShow = {
            Header: alertHeader,
            Msg: alertMessage,
            MessageType: MessageTypeEnum
        };
        this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));
        if (showAsPopup) {
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getState().Alert.AlertPopupDiv)) {
                let alertString = alertToShow.Header + ": " + alertToShow.Msg;
                let alertDiv = document.getElementById(this.getState().Alert.AlertPopupDiv);
                if (alertDiv) {
                    alertDiv.innerHTML = alertString;
                }
            }
            else {
                this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
            }
        }
        this.blotter.AlertFired.Dispatch(this.blotter, { alert: alertToShow });
        LoggingHelper_1.LoggingHelper.LogAlert(alertHeader + ": " + alertMessage, MessageTypeEnum);
    }
    ShowInfo(alertHeader, alertMessage, showAsPopup) {
        this.Show(alertHeader, alertMessage, Enums_1.MessageType.Info, showAsPopup);
    }
    ShowSuccess(alertHeader, alertMessage, showAsPopup) {
        this.Show(alertHeader, alertMessage, Enums_1.MessageType.Success, showAsPopup);
    }
    ShowWarning(alertHeader, alertMessage, showAsPopup) {
        this.Show(alertHeader, alertMessage, Enums_1.MessageType.Warning, showAsPopup);
    }
    ShowError(alertHeader, alertMessage, showAsPopup) {
        this.Show(alertHeader, alertMessage, Enums_1.MessageType.Error, showAsPopup);
    }
}
exports.AlertApi = AlertApi;
