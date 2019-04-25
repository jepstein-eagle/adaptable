import { IStyle } from "../../Utilities/Interface/IStyle";
import { IReminder } from "../../Utilities/Interface/BlotterObjects/IReminder";
import { ReminderState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IReminderApi {
  GetState(): ReminderState;
  GetAll(): IReminder[];
}
