"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
class AlertApi extends ApiBase_1.ApiBase {
    getAlertState() {
        return this.getBlotterState().Alert;
    }
    showAlert(alertToShow) {
        let maxAlerts = this.getBlotterState().Alert.MaxAlertsInStore;
        this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));
        if (alertToShow.ShowAsPopup) {
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getBlotterState().Alert.AlertPopupDiv)) {
                let alertString = alertToShow.Header + ": " + alertToShow.Msg;
                let alertDiv = document.getElementById(this.getBlotterState().Alert.AlertPopupDiv);
                if (alertDiv) {
                    alertDiv.innerHTML = alertString;
                }
            }
            else {
                this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
            }
        }
        this.blotter.api.eventApi._onAlertFired.Dispatch(this.blotter, { alert: alertToShow });
        LoggingHelper_1.LoggingHelper.LogAlert(alertToShow.Header + ": " + alertToShow.Msg, alertToShow.MessageType);
    }
    displayAlert(alertHeader, alertMessage, MessageType, showAsPopup) {
        let MessageTypeEnum = MessageType;
        let alertToShow = {
            Header: alertHeader,
            Msg: alertMessage,
            MessageType: MessageTypeEnum,
            ShowAsPopup: showAsPopup
        };
        this.showAlert(alertToShow);
    }
    showAlertInfo(alertHeader, alertMessage, showAsPopup) {
        this.displayAlert(alertHeader, alertMessage, Enums_1.MessageType.Info, showAsPopup);
    }
    showAlertSuccess(alertHeader, alertMessage, showAsPopup) {
        this.displayAlert(alertHeader, alertMessage, Enums_1.MessageType.Success, showAsPopup);
    }
    showAlertWarning(alertHeader, alertMessage, showAsPopup) {
        this.displayAlert(alertHeader, alertMessage, Enums_1.MessageType.Warning, showAsPopup);
    }
    showAlertError(alertHeader, alertMessage, showAsPopup) {
        this.displayAlert(alertHeader, alertMessage, Enums_1.MessageType.Error, showAsPopup);
    }
}
exports.AlertApi = AlertApi;
