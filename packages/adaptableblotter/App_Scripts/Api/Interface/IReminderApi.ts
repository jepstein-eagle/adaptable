import { ReminderState, Reminder } from '../../PredefinedConfig/RunTimeState/ReminderState';
export interface IReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): Reminder[];
}
