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

//Jo: creating those constants as this is a recipe for desaster otherwise.....
export const TODAY_MAGICSTRING = "Today"
export const YESTERDAY_MAGICSTRING = "Yesterday"
export const TOMORROW_MAGICSTRING = "Tomorrow"
export const PREVIOUS_WORK_DAY_MAGICSTRING = "Previous Work Day"
export const NEXT_WORK_DAY_MAGICSTRING = "Next Work Day"