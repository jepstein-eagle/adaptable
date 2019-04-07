import { IAdaptableAlert } from "../../Interface/IMessage";
import { IAutoExport, IReport } from "../../Interface/BlotterObjects/IReport";
import { IReminder } from "../../Interface/BlotterObjects/IReminder";

export interface IScheduleService {
  AddReminderSchedule(reminder: IReminder): void;
  AddReportSchedule( report: IReport): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}