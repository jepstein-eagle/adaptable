import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { DayOfWeek } from '../../Enums';
export interface ISchedule extends IAdaptableBlotterObject {
    Hour: number;
    Minute: number;
    OneOffDate?: string;
    DaysOfWeek?: DayOfWeek[];
}
