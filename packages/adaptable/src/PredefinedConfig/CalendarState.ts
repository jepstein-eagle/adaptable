import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface CalendarState extends ConfigState {
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
