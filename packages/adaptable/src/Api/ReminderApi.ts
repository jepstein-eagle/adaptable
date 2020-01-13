import { ReminderState, ReminderSchedule } from '../PredefinedConfig/ReminderState';
export interface ReminderApi {
  getReminderState(): ReminderState;
  getAllReminder(): ReminderSchedule[];

  /**
   * Opens the Reminder popup screen
   */
  showReminderPopup(): void;
}
