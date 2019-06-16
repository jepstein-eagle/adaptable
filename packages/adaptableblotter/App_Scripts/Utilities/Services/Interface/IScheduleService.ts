import { IReminder } from '../../../PredefinedConfig/IUserState Interfaces/ReminderState';
import { IReport } from '../../../PredefinedConfig/IUserState Interfaces/ExportState';

export interface IScheduleService {
  AddReminderSchedule(reminder: IReminder): void;
  AddReportSchedule(report: IReport): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}
