import { Reminder } from '../../../PredefinedConfig/IUserState/ReminderState';
import { Report } from '../../../PredefinedConfig/IUserState/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: Reminder): void;
  AddReportSchedule(report: Report): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}
