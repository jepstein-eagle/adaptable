import { ApiBase } from "./ApiBase";
import { IAdaptableAlert } from '../Utilities/Interface/IMessage';
import { IAlertApi } from './Interface/IAlertApi';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
export declare class AlertApi extends ApiBase implements IAlertApi {
    GetState(): AlertState;
    ShowAlert(alertToShow: IAdaptableAlert): void;
    Show(alertHeader: string, alertMessage: string, MessageType: "Success" | "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    ShowInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    ShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
