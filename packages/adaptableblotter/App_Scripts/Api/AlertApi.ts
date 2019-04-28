import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { ApiBase } from "./ApiBase";
import { MessageType } from '../Utilities/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { IAdaptableAlert } from '../Utilities/Interface/IMessage';
import { IAlertApi } from './Interface/IAlertApi';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';

export class AlertApi extends ApiBase implements IAlertApi {

  public GetState(): AlertState {
    return this.getBlotterState().Alert;
}

public ShowAlert(alertToShow: IAdaptableAlert): void {
    let maxAlerts: number = this.getBlotterState().Alert.MaxAlertsInStore;

    this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts))
    if (alertToShow.ShowAsPopup) {
      if (StringExtensions.IsNotNullOrEmpty(this.getBlotterState().Alert.AlertPopupDiv)) {
        let alertString: string = alertToShow.Header + ": " + alertToShow.Msg
        let alertDiv = document.getElementById(this.getBlotterState().Alert.AlertPopupDiv);
        if (alertDiv) {
          alertDiv.innerHTML = alertString;
        }
      } else {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow))
      }
    }
    this.blotter.api.eventApi._onAlertFired.Dispatch(this.blotter, { alert: alertToShow });
    LoggingHelper.LogAlert(alertToShow.Header + ": " + alertToShow.Msg, alertToShow.MessageType)
  }

  public Show(alertHeader: string, alertMessage: string, MessageType: "Success" | "Info" | "Warning" | "Error", showAsPopup: boolean): void {
    let MessageTypeEnum = MessageType as MessageType;
    let alertToShow: IAdaptableAlert = {
      Header: alertHeader,
      Msg: alertMessage,
      MessageType: MessageTypeEnum,
      ShowAsPopup: showAsPopup
    }
    this.ShowAlert(alertToShow);
  }

  public ShowInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.Show(alertHeader, alertMessage, MessageType.Info, showAsPopup)
  }

  public ShowSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.Show(alertHeader, alertMessage, MessageType.Success, showAsPopup)
  }

  public ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.Show(alertHeader, alertMessage, MessageType.Warning, showAsPopup)
  }

  public ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void {
    this.Show(alertHeader, alertMessage, MessageType.Error, showAsPopup)
  }


}