import { ISchedule } from "../../Interface/BlotterObjects/ISchedule";

export interface IScheduleService {
  AddSchedule(schedule: ISchedule): void;
  ClearAllJobs(): void;

}