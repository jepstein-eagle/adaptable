import { ApiBase } from "./ApiBase";
import { IAlertApi } from './Interface/IAlertApi';
export declare class AlertApi extends ApiBase implements IAlertApi {
    Show(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    ShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
