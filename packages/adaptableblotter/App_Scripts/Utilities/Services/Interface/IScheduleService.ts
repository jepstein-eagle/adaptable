import { IAdaptableAlert } from "../../Interface/IMessage";
import { IAutoExport } from "../../Interface/BlotterObjects/IReport";
import { IReminder } from "../../Interface/BlotterObjects/IReminder";

export interface IScheduleService {
  AddAlertSchedule(reminder: IReminder): void;
  AddReportSchedule( autoExport: IAutoExport): void;

  ClearAllAlertJobs(): void;
  ClearAllExportJobs(): void;
}