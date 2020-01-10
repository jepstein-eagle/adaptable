import { Reminder } from '../../../PredefinedConfig/ReminderState';
import { Report } from '../../../PredefinedConfig/ExportState';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export interface IScheduleService {
  AddReminderSchedule(reminder: Reminder): void;
  AddReportSchedule(report: Report): void;
  AddIPushPullReportSchedule(iPushPullReport: IPushPullReport): void;

  ClearAllReminderJobs(): void;
  ClearAllExportJobs(): void;
  ClearAllIPushPullJobs(): void;
}
