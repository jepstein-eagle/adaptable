import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalendarState extends IUserState {
  CurrentCalendar?: string;
}

export interface ICalendar extends IAdaptableBlotterObject {
  Name: string;
  YearName: Number;
  CalendarEntries: ICalendarEntry[];
}

export interface ICalendarEntry {
  HolidayName: string;
  HolidayDate: string;
}
