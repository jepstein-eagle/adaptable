import { Reminder } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: Reminder): void;
  AddReportSchedule(report: Report): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}
