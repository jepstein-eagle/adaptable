import { ApiBase } from './ApiBase';
import { IReminderApi } from './Interface/IReminderApi';
import { ReminderState, Reminder } from '../PredefinedConfig/RunTimeState/ReminderState';

export class ReminderApi extends ApiBase implements IReminderApi {
  public getReminderState(): ReminderState {
    return this.getBlotterState().Reminder;
  }

  public getAllReminder(): Reminder[] {
    return this.getBlotterState().Reminder.Reminders;
  }
}
