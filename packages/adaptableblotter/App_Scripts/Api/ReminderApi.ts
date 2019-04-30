import { IReminder } from "../Utilities/Interface/BlotterObjects/IReminder";
import { ApiBase } from "./ApiBase";
import { IReminderApi } from "./Interface/IReminderApi";
import { ReminderState } from "../Redux/ActionsReducers/Interface/IState";


export class ReminderApi extends ApiBase implements IReminderApi {

  
  public getReminderState(): ReminderState {
    return this.getBlotterState().Reminder;
}

public getAllReminder(): IReminder[] {
    return this.getBlotterState().Reminder.Reminders;
  }


}