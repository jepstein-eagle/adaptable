import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISchedule } from "../Interface/BlotterObjects/ISchedule";
export declare class ScheduleService implements IScheduleService {
    private blotter;
    private jobs;
    constructor(blotter: IAdaptableBlotter);
    AddSchedule(schedule: ISchedule): void;
    ClearAllJobs(): void;
    private scheduleAlert;
    private scheduleReport;
}
