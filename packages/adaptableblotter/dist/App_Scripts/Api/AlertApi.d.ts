import { ApiBase } from "./ApiBase";
import { IAdaptableAlert } from '../Utilities/Interface/IMessage';
import { IAlertApi } from './Interface/IAlertApi';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
export declare class AlertApi extends ApiBase implements IAlertApi {
    getAlertState(): AlertState;
    showAlert(alertToShow: IAdaptableAlert): void;
    displayAlert(alertHeader: string, alertMessage: string, MessageType: "Success" | "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    showAlertInfo(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    showAlertSuccess(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    showAlertWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    showAlertError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
}
