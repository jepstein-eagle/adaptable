import { ApiBase } from "./ApiBase";
export interface IAlertApi {
    /**
     * Shows an alert as a popup
     * @param alertHeader Title to appear in the popup
     * @param alertMessage Main message of the alert
     * @param MessageType Type (Info, Warning or Error) of the Alert - depending on this value the image and colour of the alert will change.
     */
    Show(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    ShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
export declare class AlertApi extends ApiBase implements IAlertApi {
    Show(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    ShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
