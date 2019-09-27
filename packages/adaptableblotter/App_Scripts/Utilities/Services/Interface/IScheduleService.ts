import { Reminder } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: Reminder): void;
  AddReportSchedule(report: Report): void;

  ClearAllReminderJobs(): void;
  ClearAllExportJobs(): void;
}
