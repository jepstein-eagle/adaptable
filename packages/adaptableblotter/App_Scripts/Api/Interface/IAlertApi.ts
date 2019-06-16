import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertState } from '../../PredefinedConfig/IUserState Interfaces/AlertState';

export interface IAlertApi {
  getAlertState(): AlertState;
  /**
   *
   * @param alertHeader Title to appear in the popup
   * @param alertMessage Main message of the alert
   * @param MessageType Type (Success, Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
   * @param showAsPopup TDetermines whether the Alert appears in the middle of the screen or in the Alerts tab.
   */
  displayAlert(
    alertHeader: string,
    alertMessage: string,
    MessageType: 'Success' | 'Info' | 'Warning' | 'Error',
    showAsPopup: boolean
  ): void;
  showAlert(alertToShow: IAdaptableAlert): void;
  showAlertInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
  showAlertSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
  showAlertWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
  showAlertError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
