import { IStrategy } from './IStrategy';

export interface ICalendarStrategy extends IStrategy {
}


export interface ICalendar {
    CalendarName: string;
    CalendarEntries: ICalendarEntry[];
}

export interface ICalendarEntry {
    HolidayName: string;
    HolidayDate: string;
}

