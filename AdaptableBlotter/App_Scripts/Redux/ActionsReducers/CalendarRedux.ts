/// <reference path="../../../typings/index.d.ts" />

import { CalendarState } from './Interface/IState';

export const CALENDAR_SET_DEFAULT_CALENDAR = 'CALENDAR_SET_DEFAULT_CALENDAR';

export interface CalendarSetDefaultCalendarAction extends Redux.Action {
    calendarName: string
}

export const CalendarSetDefaultCalendar = (calendarName: string): CalendarSetDefaultCalendarAction => ({
    type: CALENDAR_SET_DEFAULT_CALENDAR,
    calendarName
})

const initialCalendarState: CalendarState = {
    CurrentCalendar: "United Kingdom",
    AvailableCalendars : [
        {
            CalendarName: "United Kingdom", CalendarEntries: [
                { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2016") },
                { HolidayName: "Christmas Day (substitute)", HolidayDate: new Date("December 27, 2016") },
                { HolidayName: "New Year's Day (substitute)", HolidayDate: new Date("January 02, 2017") },
                { HolidayName: "Good Friday", HolidayDate: new Date("April 14, 2017") },
                { HolidayName: "Easter Monday", HolidayDate: new Date("April 17, 2017") },
                { HolidayName: "Early May Bank Holiday", HolidayDate: new Date("May 1, 2017") },
                { HolidayName: "Spring Bank Holiday", HolidayDate: new Date("May 29, 2017") },
                { HolidayName: "Summer Bank Holiday", HolidayDate: new Date("August 28, 2017") },
                { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017") },
                { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2017") },
            ]
        },
        {
            CalendarName: "France", CalendarEntries: [
                { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2017") },
                { HolidayName: "New Years Holiday", HolidayDate: new Date("January 02, 2017") },
                { HolidayName: "Easter Monday", HolidayDate: new Date("April 17, 2017") },
                { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2017") },
                { HolidayName: "VE Day", HolidayDate: new Date("May 08, 2017") },
                { HolidayName: "Ascension Day", HolidayDate: new Date("May 25, 2017") },
                { HolidayName: "Whitmonday", HolidayDate: new Date("June 05, 2017") },
                { HolidayName: "Bastille Day", HolidayDate: new Date("July 14, 2017") },
                { HolidayName: "Assumption Day", HolidayDate: new Date("August 15, 2017") },
                { HolidayName: "All Saints Day", HolidayDate: new Date("November 01, 2017") },
                { HolidayName: "Armistice Day", HolidayDate: new Date("November 11, 2017") },
                { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017") },
                { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2016") },
                { HolidayName: "Easter Monday", HolidayDate: new Date("March 28, 2016") },
                { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2016") },
                { HolidayName: "VE Day", HolidayDate: new Date("May 08, 2016") },
                { HolidayName: "Ascension Day", HolidayDate: new Date("May 05, 2016") },
                { HolidayName: "Whitmonday", HolidayDate: new Date("May 16, 2016") },
                { HolidayName: "Bastille Day", HolidayDate: new Date("July 14, 2016") },
                { HolidayName: "Assumption Day", HolidayDate: new Date("August 15, 2016") },
                { HolidayName: "All Saints Day", HolidayDate: new Date("November 01, 2016") },
                { HolidayName: "Armistice Day", HolidayDate: new Date("November 11, 2016") },
                { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2016") },
            ],
        },
        {
            CalendarName: "United States", CalendarEntries: [
                { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2017") },
                { HolidayName: "Martin Luther King Day", HolidayDate: new Date("January 16, 2017") },
                { HolidayName: "Presidents Day", HolidayDate: new Date("February 20, 2017") },
                { HolidayName: "Memorial Day", HolidayDate: new Date("May 29, 2017") },
                { HolidayName: "Independence Day", HolidayDate: new Date("July 04, 2017") },
                { HolidayName: "Labour Day", HolidayDate: new Date("September 04, 2017") },
                { HolidayName: "Columnbus Day", HolidayDate: new Date("October 09, 2017") },
                { HolidayName: "Veterans Day", HolidayDate: new Date("November 10, 2017") },
                { HolidayName: "Thanksgiving Day", HolidayDate: new Date("November 23, 2017") },
                { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017") },
                { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2016") },
                { HolidayName: "Martin Luther King Day", HolidayDate: new Date("January 18, 2016") },
                { HolidayName: "Presidents Day", HolidayDate: new Date("February 15, 2016") },
                { HolidayName: "Memorial Day", HolidayDate: new Date("May 30, 2016") },
                { HolidayName: "Independence Day", HolidayDate: new Date("July 04, 2016") },
                { HolidayName: "Labour Day", HolidayDate: new Date("September 05, 2016") },
                { HolidayName: "Columnbus Day", HolidayDate: new Date("October 10, 2016") },
                { HolidayName: "Veterans Day", HolidayDate: new Date("November 11, 2016") },
                { HolidayName: "Thanksgiving Day", HolidayDate: new Date("November 24, 2016") },
                { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2016") },
            ]
        }
    ]
}

export const CalendarReducer: Redux.Reducer<CalendarState> = (state: CalendarState = initialCalendarState, action: Redux.Action): CalendarState => {
    switch (action.type) {
        case CALENDAR_SET_DEFAULT_CALENDAR:
            return Object.assign({}, state, { CurrentCalendar: (<CalendarSetDefaultCalendarAction>action).calendarName })
        default:
            return state
    }
}