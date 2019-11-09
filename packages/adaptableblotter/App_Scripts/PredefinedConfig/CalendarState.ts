import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';
export interface CalendarState extends RunTimeState {
  CurrentCalendar?: string;
}

export interface Calendar extends AdaptableBlotterObject {
  Name: string;
  YearName: Number;
  CalendarEntries: CalendarEntry[];
}

export interface CalendarEntry {
  HolidayName: string;
  HolidayDate: string;
}
