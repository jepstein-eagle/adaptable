import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { AlertState, AlertDefinition } from '../PredefinedConfig/AlertState';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';

/**
 * Provides full and comprehensive run-time access to the Alert function and {@link AlertState|Alert State}.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Alert Demo](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo)
 *
 * - {@link AlertState|Alert State}
 *
 * - [Alert Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/alert-function.md)
 *
 */
export interface AlertApi {
  /**
   * Retrieves the {@link AlertState|Alert State} section from Adaptable State
   */
  getAlertState(): AlertState;

  /**
   * Retrieves all the Alert Definitions in {@link AlertState|Alert State}
   */
  getAlertDefinitions(): AlertDefinition[];

  /**
   * Displays a given Alert as a Popup
   * @param alertToDisplayAsPopup the Alert to show
   */
  displayMessageAlertPopup(alertToDisplayAsPopup: AdaptableAlert): void;

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
