import { ReminderState, IReminder } from '../../PredefinedConfig/IUserState/ReminderState';
export interface IReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): IReminder[];
}
