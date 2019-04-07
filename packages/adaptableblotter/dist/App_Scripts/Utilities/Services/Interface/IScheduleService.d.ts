import { IReport } from "../../Interface/BlotterObjects/IReport";
import { IReminder } from "../../Interface/BlotterObjects/IReminder";
export interface IScheduleService {
    AddAlertSchedule(reminder: IReminder): void;
    AddReportSchedule(report: IReport): void;
    ClearAllAlertJobs(): void;
    ClearAllExportJobs(): void;
}
