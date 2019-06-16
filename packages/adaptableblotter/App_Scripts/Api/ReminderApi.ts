import { ApiBase } from './ApiBase';
import { IReminderApi } from './Interface/IReminderApi';
import { ReminderState, IReminder } from '../PredefinedConfig/IUserState/ReminderState';

export class ReminderApi extends ApiBase implements IReminderApi {
  public getReminderState(): ReminderState {
    return this.getBlotterState().Reminder;
  }

  public getAllReminder(): IReminder[] {
    return this.getBlotterState().Reminder.Reminders;
  }
}
