import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { DayOfWeek } from '../../Enums';

export interface ISchedule extends IAdaptableBlotterObject {
  // needs work... has to be either a one off date or a recurrence rule
  Hour: number;
  Minute: number;
  OneOffDate?: string,
  DaysOfWeek?: DayOfWeek[]
}






