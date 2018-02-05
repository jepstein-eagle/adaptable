import { IStrategy } from './IStrategy';

export interface ICalendarStrategy extends IStrategy {
}


export interface ICalendar {
    CalendarName: string;
    CalendarYears: ICalendarYear[];
}

export interface ICalendarYear {
    YearName: Number;
    CalendarEntries: ICalendarEntry[];
}

export interface ICalendarEntry {
    HolidayName: string;
    HolidayDate: string;
}

