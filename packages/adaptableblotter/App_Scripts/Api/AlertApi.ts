import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { AlertState, AlertProperties, AlertDefinition } from '../PredefinedConfig/AlertState';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';

/**
 * Provides full and comprehensive run-time access to the Alert function and associated state.
 *
 * **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/alertsmessages/aggridalertdemo/) | [State](_predefinedconfig_alertstate_.alertstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895731-Alerts-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 */
export interface AlertApi {
  /**
   * Retrieves the Alert section from the Adaptable Blotter State
   */
  getAlertState(): AlertState;

  getAlertDefinitions(): AlertDefinition[];

  /**
   * Displays a (fully formed) inputted Alert to the User
   * @param alertToShow The Alert which should be displayed
   */
  displayAlert(alertToShow: AdaptableAlert): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param alertDefinition The Alert Definition which defines when the Alert is triggered
   * @param dataChangedInfo The (optional) DataChangedInfo object that might have triggered the Alert
   */
  showAlert(
    alertHeader: string,
    alertMessage: string,
    alertDefinition: AlertDefinition,
    dataChangedInfo?: DataChangedInfo
  ): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as an Info Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   */
  showAlertInfo(alertHeader: string, alertMessage: string): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as a Succcess Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   */
  showAlertSuccess(alertHeader: string, alertMessage: string): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as a Warning Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   */
  showAlertWarning(alertHeader: string, alertMessage: string): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as an Error Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   */
  showAlertError(alertHeader: string, alertMessage: string): void;

  /**
   * Opens the Alert popup screen
   */
  showAlertPopup(): void;
}
