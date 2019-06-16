import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalendarState extends IUserState {
  CurrentCalendar?: string;
}

export interface Calendar extends IAdaptableBlotterObject {
  Name: string;
  YearName: Number;
  CalendarEntries: CalendarEntry[];
}

export interface CalendarEntry {
  HolidayName: string;
  HolidayDate: string;
}
