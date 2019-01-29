import { ICalendar } from "../Interface/BlotterObjects/ICalendar";

export module CalendarHelper {

    export function getSystemCalendars(): ICalendar[] {
        return  [
            {
                Name: "United Kingdom",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Year's Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Good Friday", HolidayDate: new Date("March 30, 2018").toJSON() },
                    { HolidayName: "Easter Monday", HolidayDate: new Date("April 02, 2018").toJSON() },
                    { HolidayName: "Early May Bank Holiday", HolidayDate: new Date("May 07 2018").toJSON() },
                    { HolidayName: "Spring Bank Holiday", HolidayDate: new Date("May 28, 2018").toJSON() },
                    { HolidayName: "Summer Bank Holiday", HolidayDate: new Date("August 27, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                    { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2018").toJSON() },
                ]
            },
            {
                Name: "Germany",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Year's Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Good Friday", HolidayDate: new Date("March 30, 2018").toJSON() },
                    { HolidayName: "Easter Monday", HolidayDate: new Date("April 02, 2018").toJSON() },
                    { HolidayName: "Labour Day", HolidayDate: new Date("May 01 2018").toJSON() },
                    { HolidayName: "Ascension Day", HolidayDate: new Date("May 10 2018").toJSON() },
                    { HolidayName: "Whit Monday", HolidayDate: new Date("May 21, 2018").toJSON() },
                    { HolidayName: "German Unity Day", HolidayDate: new Date("October 03, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                    { HolidayName: "St Stephen's Day", HolidayDate: new Date("December 26, 2018").toJSON() },
                ]
            },
            {
                Name: "France",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Easter Monday", HolidayDate: new Date("April 02, 2018").toJSON() },
                    { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2018").toJSON() },
                    { HolidayName: "VE Day", HolidayDate: new Date("May 08, 2018").toJSON() },
                    { HolidayName: "Ascension Day", HolidayDate: new Date("May 10, 2018").toJSON() },
                    { HolidayName: "Whitmonday", HolidayDate: new Date("May 21, 2018").toJSON() },
                    { HolidayName: "Bastille Day", HolidayDate: new Date("July 14, 2018").toJSON() },
                    { HolidayName: "Assumption Day", HolidayDate: new Date("August 15, 2018").toJSON() },
                    { HolidayName: "All Saints Day", HolidayDate: new Date("November 01, 2018").toJSON() },
                    { HolidayName: "Armistice Day", HolidayDate: new Date("November 11, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                ]
            },
            {
                Name: "United States",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Martin Luther King Day", HolidayDate: new Date("January 15, 2018").toJSON() },
                    { HolidayName: "Presidents Day", HolidayDate: new Date("February 19, 2018").toJSON() },
                    { HolidayName: "Memorial Day", HolidayDate: new Date("May 28, 2018").toJSON() },
                    { HolidayName: "Independence Day", HolidayDate: new Date("July 04, 2018").toJSON() },
                    { HolidayName: "Labour Day", HolidayDate: new Date("September 03, 2018").toJSON() },
                    { HolidayName: "Columbus Day", HolidayDate: new Date("October 08, 2018").toJSON() },
                    { HolidayName: "Veterans Day", HolidayDate: new Date("November 12, 2018").toJSON() },
                    { HolidayName: "Thanksgiving Day", HolidayDate: new Date("November 22, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                ]
            },
            {
                Name: "Canada",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Good Friday", HolidayDate: new Date("March 30, 2018").toJSON() },
                    { HolidayName: "St. George's Day", HolidayDate: new Date("April 23, 2018").toJSON() },
                    { HolidayName: "Canada Day", HolidayDate: new Date("July 02, 2018").toJSON() },
                    { HolidayName: "Labour Day", HolidayDate: new Date("September 03, 2018").toJSON() },
                    { HolidayName: "Thanksgiving", HolidayDate: new Date("October 08, 2018").toJSON() },
                    { HolidayName: "Rememberance Day", HolidayDate: new Date("November 11, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                    { HolidayName: "Boxing Day", HolidayDate: new Date("December 26, 2018").toJSON() },
                ]
            },
            {
                Name: "Singapore",
                YearName: 2018, CalendarEntries: [
                    { HolidayName: "New Years Day", HolidayDate: new Date("January 01, 2018").toJSON() },
                    { HolidayName: "Chinese New Year", HolidayDate: new Date("February 16, 2018").toJSON() },
                    { HolidayName: "Good Friday", HolidayDate: new Date("March 30, 2018").toJSON() },
                    { HolidayName: "Labour Day", HolidayDate: new Date("May 01, 2018").toJSON() },
                    { HolidayName: "Vesak Day", HolidayDate: new Date("May 29, 2018").toJSON() },
                    { HolidayName: "Hari Raya Puasa", HolidayDate: new Date("June 15, 2018").toJSON() },
                    { HolidayName: "National Day", HolidayDate: new Date("August 09, 2018").toJSON() },
                    { HolidayName: "Hari Raya Haji", HolidayDate: new Date("August 22, 2018").toJSON() },
                    { HolidayName: "Deepavali", HolidayDate: new Date("November 06, 2018").toJSON() },
                    { HolidayName: "Christmas Day", HolidayDate: new Date("December 25, 2018").toJSON() },
                ]
            }
        ]
    }
}
