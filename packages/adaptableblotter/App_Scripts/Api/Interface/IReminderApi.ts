import { ReminderState, Reminder } from '../../PredefinedConfig/IUserState/ReminderState';
export interface IReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): Reminder[];
}
