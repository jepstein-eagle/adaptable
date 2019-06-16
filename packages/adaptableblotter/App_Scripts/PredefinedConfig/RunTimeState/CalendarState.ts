import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalendarState extends RunTimeState {
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
