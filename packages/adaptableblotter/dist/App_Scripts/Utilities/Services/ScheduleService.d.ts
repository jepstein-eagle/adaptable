import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISchedule } from "../Interface/BlotterObjects/ISchedule";
export declare class ScheduleService implements IScheduleService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    AddSchedule(schedule: ISchedule): void;
}
