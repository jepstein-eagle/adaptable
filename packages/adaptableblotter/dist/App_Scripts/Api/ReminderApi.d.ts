import { IReminder } from "../Utilities/Interface/BlotterObjects/IReminder";
import { ApiBase } from "./ApiBase";
import { IReminderApi } from "./Interface/IReminderApi";
import { ReminderState } from "../Redux/ActionsReducers/Interface/IState";
export declare class ReminderApi extends ApiBase implements IReminderApi {
    getReminderState(): ReminderState;
    getAllReminder(): IReminder[];
}
