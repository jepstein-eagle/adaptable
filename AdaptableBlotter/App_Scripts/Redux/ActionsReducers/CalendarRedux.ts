import { CalendarState } from './Interface/IState';
import * as Redux from 'redux'

export const CALENDAR_SELECT = 'CALENDAR_SELECT';

export interface CalendarSelectAction extends Redux.Action {
    calendarName: string
}

export const CalendarSelect = (calendarName: string): CalendarSelectAction => ({
    type: CALENDAR_SELECT,
    calendarName
})

const initialCalendarState: CalendarState = {
    CurrentCalendar: "United States",
    AvailableCalendars: [
        {
            CalendarName: "United Kingdom", CalendarYears: [
                {
                    YearName: 2016, CalendarEntries:
                    [
                        { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2016").toJSON() },
                        { HolidayName: "Christmas Day (substitute)", HolidayDate: new Date("December 27, 2016").toJSON() }
                    ]
                },
                {
                    YearName: 2017, CalendarEntries: [
                        { HolidayName: "New Year's Day (substitute)", HolidayDate: new Date("January 02, 2017").toJSON() },
                        { HolidayName: "Good Friday", HolidayDate: new Date("April 14, 2017").toJSON() },
                        { HolidayName: "Easter Monday", HolidayDate: new Date("April 17, 2017").toJSON() },
                        { HolidayName: "Early May Bank Holiday", HolidayDate: new Date("May 1, 2017").toJSON() },
                        { HolidayName: "Spring Bank Holiday", HolidayDate: new Date("May 29, 2017").toJSON() },
                        { HolidayName: "Summer Bank Holiday", HolidayDate: new Date("August 28, 2017").toJSON() },
                        { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017").toJSON() },
                        { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2017").toJSON() },
                    ]
                }
            ]
        },
        {
            CalendarName: "France", CalendarYears: [
                {
                    YearName: 2016, CalendarEntries:
                    [
                        { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2016").toJSON() },
                        { HolidayName: "Easter Monday", HolidayDate: new Date("March 28, 2016").toJSON() },
                        { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2016").toJSON() },
                        { HolidayName: "VE Day", HolidayDate: new Date("May 08, 2016").toJSON() },
                        { HolidayName: "Ascension Day", HolidayDate: new Date("May 05, 2016").toJSON() },
                        { HolidayName: "Whitmonday", HolidayDate: new Date("May 16, 2016").toJSON() },
                        { HolidayName: "Bastille Day", HolidayDate: new Date("July 14, 2016").toJSON() },
                        { HolidayName: "Assumption Day", HolidayDate: new Date("August 15, 2016").toJSON() },
                        { HolidayName: "All Saints Day", HolidayDate: new Date("November 01, 2016").toJSON() },
                        { HolidayName: "Armistice Day", HolidayDate: new Date("November 11, 2016").toJSON() },
                        { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2016").toJSON() },
                    ]
                },
                {
                    YearName: 2017, CalendarEntries: [
                        { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2017").toJSON() },
                        { HolidayName: "New Years Holiday", HolidayDate: new Date("January 02, 2017").toJSON() },
                        { HolidayName: "Easter Monday", HolidayDate: new Date("April 17, 2017").toJSON() },
                        { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2017").toJSON() },
                        { HolidayName: "VE Day", HolidayDate: new Date("May 08, 2017").toJSON() },
                        { HolidayName: "Ascension Day", HolidayDate: new Date("May 25, 2017").toJSON() },
                        { HolidayName: "Whitmonday", HolidayDate: new Date("June 05, 2017").toJSON() },
                        { HolidayName: "Bastille Day", HolidayDate: new Date("July 14, 2017").toJSON() },
                        { HolidayName: "Assumption Day", HolidayDate: new Date("August 15, 2017").toJSON() },
                        { HolidayName: "All Saints Day", HolidayDate: new Date("November 01, 2017").toJSON() },
                        { HolidayName: "Armistice Day", HolidayDate: new Date("November 11, 2017").toJSON() },
                        { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017").toJSON() },
                    ]
                }
            ]
        },
        {
            CalendarName: "United States", CalendarYears: [
                {
                    YearName: 2016, CalendarEntries:
                    [
                        { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2016").toJSON() },
                        { HolidayName: "Martin Luther King Day", HolidayDate: new Date("January 18, 2016").toJSON() },
                        { HolidayName: "Presidents Day", HolidayDate: new Date("February 15, 2016").toJSON() },
                        { HolidayName: "Memorial Day", HolidayDate: new Date("May 30, 2016").toJSON() },
                        { HolidayName: "Independence Day", HolidayDate: new Date("July 04, 2016").toJSON() },
                        { HolidayName: "Labour Day", HolidayDate: new Date("September 05, 2016").toJSON() },
                        { HolidayName: "Columbus Day", HolidayDate: new Date("October 10, 2016").toJSON() },
                        { HolidayName: "Veterans Day", HolidayDate: new Date("November 11, 2016").toJSON() },
                        { HolidayName: "Thanksgiving Day", HolidayDate: new Date("November 24, 2016").toJSON() },
                        { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2016").toJSON() },
                    ]
                },
                {
                    YearName: 2017, CalendarEntries: [
                        { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2017").toJSON() },
                        { HolidayName: "Martin Luther King Day", HolidayDate: new Date("January 16, 2017").toJSON() },
                        { HolidayName: "Presidents Day", HolidayDate: new Date("February 20, 2017").toJSON() },
                        { HolidayName: "Memorial Day", HolidayDate: new Date("May 29, 2017").toJSON() },
                        { HolidayName: "Independence Day", HolidayDate: new Date("July 04, 2017").toJSON() },
                        { HolidayName: "Labour Day", HolidayDate: new Date("September 04, 2017").toJSON() },
                        { HolidayName: "Columbus Day", HolidayDate: new Date("October 09, 2017").toJSON() },
                        { HolidayName: "Veterans Day", HolidayDate: new Date("November 10, 2017").toJSON() },
                        { HolidayName: "Thanksgiving Day", HolidayDate: new Date("November 23, 2017").toJSON() },
                        { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2017").toJSON() },
                    ]
                }
            ]
        }]
};

export const CalendarReducer: Redux.Reducer<CalendarState> = (state: CalendarState = initialCalendarState, action: Redux.Action): CalendarState => {
    switch (action.type) {
        case CALENDAR_SELECT:
            return Object.assign({}, state, { CurrentCalendar: (<CalendarSelectAction>action).calendarName })
        default:
            return state
    }
}