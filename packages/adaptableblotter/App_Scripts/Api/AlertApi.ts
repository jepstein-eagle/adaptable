import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { ApiBase } from "./ApiBase";
import { IReport } from './Interface/IAdaptableBlotterObjects';
import { MessageType, ExportDestination } from '../Utilities/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { IAlert } from './Interface/IMessage';

export interface IAlertApi {

   // Alerts
  /**
   * Shows an alert as a popup
   * @param alertHeader Title to appear in the popup
   * @param alertMessage Main message of the alert
   * @param MessageType Type (Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
   */
  alertShow(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void

  alertShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  alertShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  alertShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void


  

}


export class AlertApi extends ApiBase implements IAlertApi {

   




  // Alerts api Methods
  public alertShow(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void {
    let maxAlerts: number = this.getState().Alert.MaxAlertsInStore;
    let MessageTypeEnum = MessageType as MessageType;
    let alertToShow: IAlert = {
      Header: alertHeader,
      Msg: alertMessage,
      MessageType: MessageTypeEnum
    }
    this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts))
    if (showAsPopup) {
      if (StringExtensions.IsNotNullOrEmpty(this.getState().Alert.AlertPopupDiv)) {
        let alertString: string = alertToShow.Header + ": " + alertToShow.Msg
        let alertDiv = document.getElementById(this.getState().Alert.AlertPopupDiv);
        if (alertDiv) {
          alertDiv.innerHTML = alertString;
        }
      } else {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow))
      }
    }
    LoggingHelper.LogAlert(alertHeader + ": " + alertMessage, MessageTypeEnum)
  }

  public alertShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Info, showAsPopup)
  }

  public alertShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Warning, showAsPopup)
  }

  public alertShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.alertShow(alertHeader, alertMessage, MessageType.Error, showAsPopup)
  }


}