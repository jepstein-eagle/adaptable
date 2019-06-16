import { IReminder } from '../../../PredefinedConfig/IUserState/ReminderState';
import { IReport } from '../../../PredefinedConfig/IUserState/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: IReminder): void;
  AddReportSchedule(report: IReport): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}
