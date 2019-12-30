import { ReminderState, Reminder } from '../PredefinedConfig/ReminderState';
export interface ReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): Reminder[];

  /**
   * Opens the Reminder popup screen
   */
  showReminderPopup(): void;
}
