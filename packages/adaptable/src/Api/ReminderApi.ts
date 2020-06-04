import { ReminderSchedule } from '../PredefinedConfig/ReminderState';
export interface ReminderApi {
  getAllReminder(): ReminderSchedule[];

  /**
   * Opens the Reminder popup screen
   */
  showReminderPopup(): void;
}
