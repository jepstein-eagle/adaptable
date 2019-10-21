import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { IAlertApi } from './Interface/IAlertApi';
import {
  AlertState,
  AlertProperties,
  AlertDefinition,
} from '../PredefinedConfig/RunTimeState/AlertState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import OpenfinHelper from '../Utilities/Helpers/OpenfinHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import ObjectFactory from '../Utilities/ObjectFactory';
import { createUuid } from '../PredefinedConfig/Uuid';

export class AlertApi extends ApiBase implements IAlertApi {
  public getAlertState(): AlertState {
    return this.getBlotterState().Alert;
  }

  public getAlertDefinitions(): AlertDefinition[] {
    return this.getBlotterState().Alert.AlertDefinitions;
  }

  public displayAlert(alertToShow: AdaptableAlert): void {
    let maxAlerts: number = this.getBlotterState().Alert.MaxAlertsInStore;

    // 3 things we always do with an alert are:
    // 1. Dispatch the Alert (so it appears in the toolbar)
    this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));

    // 2. Publish the Alert Fired Event
    this.blotter.api.eventApi._onAlertFired.Dispatch(this.blotter, { alert: alertToShow });

    // 3. Log it to the Console
    LoggingHelper.LogAlert(alertToShow.Header + ': ' + alertToShow.Msg, alertToShow.AlertDefinition
      .MessageType as MessageType);

    // There are 3 possible other actions that could happen

    // 1.

    if (alertToShow.AlertDefinition.AlertProperties.ShowPopup) {
      if (StringExtensions.IsNotNullOrEmpty(this.getBlotterState().Alert.AlertPopupDiv)) {
        let alertString: string = alertToShow.Header + ': ' + alertToShow.Msg;
        let alertDiv = document.getElementById(this.getBlotterState().Alert.AlertPopupDiv);
        if (alertDiv) {
          alertDiv.innerHTML = alertString;
        }
      } else {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
      }
    }
  }

  public showAlert(
    alertHeader: string,
    alertMessage: string,
    alertDefinition: AlertDefinition,
    dataChangedInfo?: DataChangedInfo
  ): void {
    let alertToShow: AdaptableAlert = ObjectFactory.CreateAlert(
      alertHeader,
      alertMessage,
      alertDefinition,
      dataChangedInfo
    );

    this.displayAlert(alertToShow);

    // tmp
    if (OpenfinHelper.isRunningInOpenfin) {
      /*
      createOpenFinNotification({
        id: String(Math.random()),
        title: alertToShow.Header,
        body: alertToShow.Msg,
        icon: 'https://openfin.co/favicon.ico',
      });
      */
    }
  }

  public showAlertInfo(alertHeader: string, alertMessage: string): void {
    let alertDefinition: AlertDefinition = ObjectFactory.CreateInternalAlertDefinitionForMessages(
      MessageType.Info
    );
    this.showAlert(alertHeader, alertMessage, alertDefinition);
  }

  public showAlertSuccess(alertHeader: string, alertMessage: string): void {
    let alertDefinition: AlertDefinition = ObjectFactory.CreateInternalAlertDefinitionForMessages(
      MessageType.Success
    );
    this.showAlert(alertHeader, alertMessage, alertDefinition);
  }

  public showAlertWarning(alertHeader: string, alertMessage: string): void {
    let alertDefinition: AlertDefinition = ObjectFactory.CreateInternalAlertDefinitionForMessages(
      MessageType.Warning
    );
    this.showAlert(alertHeader, alertMessage, alertDefinition);
  }

  public showAlertError(alertHeader: string, alertMessage: string): void {
    let alertDefinition: AlertDefinition = ObjectFactory.CreateInternalAlertDefinitionForMessages(
      MessageType.Error
    );
    this.showAlert(alertHeader, alertMessage, alertDefinition);
  }

  public showAlertPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.AlertStrategyId,
      ScreenPopups.AlertPopup
    );
  }
}
