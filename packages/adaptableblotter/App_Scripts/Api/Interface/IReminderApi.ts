import {
  ReminderState,
  IReminder,
} from '../../PredefinedConfig/IUserState Interfaces/ReminderState';
export interface IReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): IReminder[];
}
