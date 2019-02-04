
export interface IAlertApi {

  /**
   * 
  * @param alertHeader Title to appear in the popup
  * @param alertMessage Main message of the alert
  * @param MessageType Type (Success, Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
  * @param showAsPopup TDetermines whether the Alert appears in the middle of the screen or in the Alerts tab.
   */
  Show(alertHeader: string, alertMessage: string, MessageType: "Success" | "Info" | "Warning" | "Error", showAsPopup: boolean): void

  ShowInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  ShowSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
  ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void
}
