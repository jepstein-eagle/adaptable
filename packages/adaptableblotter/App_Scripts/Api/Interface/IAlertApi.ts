import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertState } from '../../PredefinedConfig/RunTimeState/AlertState';

/**
 * Provides full and comprehensive run-time access to the Alert function and associated state.
 */
export interface IAlertApi {
  /**
   * Retrieves the Alert State
   */
  getAlertState(): AlertState;

  /**
   * Displays a (fully formed) inputted Alert to the User
   * @param alertToShow The Alert which should be displayed
   */
  displayAlert(alertToShow: AdaptableAlert): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param MessageType Type (Success, Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
   * @param showAsPopup Determines whether the Alert pops up in the middle of the screen or just in the Alert Toolbar.
   */
  showAlert(
    alertHeader: string,
    alertMessage: string,
    MessageType: 'Success' | 'Info' | 'Warning' | 'Error',
    showAsPopup: boolean
  ): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as an Info Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param showAsPopup Determines whether the Alert pops up in the middle of the screen or just in the Alert Toolbar.
   */
  showAlertInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as a Succcess Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param showAsPopup Determines whether the Alert pops up in the middle of the screen or just in the Alert Toolbar.
   */
  showAlertSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as a Warning Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param showAsPopup Determines whether the Alert pops up in the middle of the screen or just in the Alert Toolbar.
   */
  showAlertWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;

  /**
   * Creates an Alert formed from the inputted values and then displays it as an Error Alert.
   * @param alertHeader Header of the Alert (if shown in a popup its the Title of the Window)
   * @param alertMessage Main message of the alert
   * @param showAsPopup Determines whether the Alert pops up in the middle of the screen or just in the Alert Toolbar.
   */
  showAlertError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;

  /**
   * Opens the Alert popup screen
   */
  showAlertPopup(): void;
}
