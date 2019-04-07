import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IReport } from "../Interface/BlotterObjects/IReport";
import { IReminder } from "../Interface/BlotterObjects/IReminder";
export declare class ScheduleService implements IScheduleService {
    private blotter;
    private alertJobs;
    private exportJobs;
    constructor(blotter: IAdaptableBlotter);
    AddAlertSchedule(reminder: IReminder): void;
    AddReportSchedule(report: IReport): void;
    private getDate;
    ClearAllAlertJobs(): void;
    ClearAllExportJobs(): void;
}
