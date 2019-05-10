import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { DayOfWeek } from '../../Enums';

export interface ISchedule extends IAdaptableBlotterObject {
  // A schedule can be either a one off date or just a recurring day (essentially a recurrence rule)
  Hour: number;
  Minute: number;
  OneOffDate?: string,
  DaysOfWeek?: DayOfWeek[]
}
