import { Reminder } from '../../../PredefinedConfig/ReminderState';
import { Report } from '../../../PredefinedConfig/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: Reminder): void;
  AddReportSchedule(report: Report): void;

  ClearAllReminderJobs(): void;
  ClearAllExportJobs(): void;
}
