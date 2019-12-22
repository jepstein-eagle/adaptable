import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface CalendarState extends RunTimeState {
  CurrentCalendar?: string;
}

export interface Calendar extends AdaptableObject {
  Name: string;
  YearName: Number;
  CalendarEntries: CalendarEntry[];
}

export interface CalendarEntry {
  HolidayName: string;
  HolidayDate: string;
}
