import { IStrategy } from './IStrategy';

export interface IReminderStrategy extends IStrategy {
  scheduleReminders(): void;
}
