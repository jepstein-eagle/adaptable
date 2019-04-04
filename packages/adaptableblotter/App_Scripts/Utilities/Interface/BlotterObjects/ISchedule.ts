import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';

export interface ISchedule extends IAdaptableBlotterObject {
   // needs work... has to be either a one off date or a recurrence rule
  OneOffDate?: Date,
  RecurringDate?: IRecurringDate,
}

export interface IRecurringDate {
  // can make cleverer over time if need be...
  DaysOfWeek: number[] 
  Hour: number;
  Minute: number;
}




