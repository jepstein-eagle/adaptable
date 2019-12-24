import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertApi } from '../AlertApi';
import { AlertState, AlertDefinition, AlertProperties } from '../../PredefinedConfig/AlertState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import OpenfinHelper from '../../Utilities/Helpers/OpenfinHelper';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import ObjectFactory from '../../Utilities/ObjectFactory';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import { AlertFiredEventArgs, AlertFiredInfo } from '../Events/AlertFired';

export class AlertApiImpl extends ApiBase implements AlertApi {
  public getAlertState(): AlertState {
    return this.getBlotterState().Alert;
  }

  public getAlertDefinitions(): AlertDefinition[] {
    return this.getAlertState().AlertDefinitions;
  }

  public displayAlert(alertToShow: AdaptableAlert): void {
    let maxAlerts: number = this.getAlertState().MaxAlertsInStore;

    // 3 things we always do with an alert are:
    // 1. Dispatch the Alert (so it appears in the toolbar)
    this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));

    // 2. Publish the Alert Fired Event

    let alertFiredInfo: AlertFiredInfo = {
      alert: alertToShow,
    };
    const alertFiredArgs: AlertFiredEventArgs = AdaptableHelper.createFDC3Message(
      'Alert Fired Args',
      alertFiredInfo
    );

    this.blotter.api.eventApi.emit('AlertFired', alertFiredArgs);

    // 3. Log it to the Console
    LoggingHelper.LogAlert(alertToShow.Header + ': ' + alertToShow.Msg, alertToShow.AlertDefinition
      .MessageType as MessageType);

    if (alertToShow.AlertDefinition && alertToShow.AlertDefinition.AlertProperties != undefined) {
      let alertProperties: AlertProperties = alertToShow.AlertDefinition.AlertProperties;
      // There are 4 possible other actions that could happen

      // 1. Show a Popup
      if (alertProperties.ShowPopup) {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
      }
      // 1. Show it in a Div (if one has been set)
      if (alertProperties.ShowInDiv) {
        if (StringExtensions.IsNotNullOrEmpty(this.getBlotterState().Alert.AlertDisplayDiv)) {
          let alertString: string = alertToShow.Header + ': ' + alertToShow.Msg;
          let alertDiv = document.getElementById(this.getBlotterState().Alert.AlertDisplayDiv);
          if (alertDiv) {
            alertDiv.innerHTML = alertString;
          }
        }
      }
      // 3: Jump to the Cell
      if (alertProperties.JumpToCell && alertToShow.DataChangedInfo) {
        this.blotter.jumpToCell(
          alertToShow.DataChangedInfo.ColumnId,
          alertToShow.DataChangedInfo.RowNode
        );
      }
    }
  }

  // 4: Hight the cell - though that is taken care of in the Style Service

  public displayMessageAlertPopup(alertToDisplayAsPopup: AdaptableAlert): void {
    this.dispatchAction(PopupRedux.PopupShowAlert(alertToDisplayAsPopup));
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
