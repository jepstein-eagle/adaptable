
import { ICalendarService } from './Interface/ICalendarService';
import { ICalendarStrategy, ICalendar, ICalendarEntry } from '../Interface/ICalendarStrategy';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

// Similar service to the one in WPF version
// This service is responsible for reading the calendars and for making them available and also for doing data calculations
// The breakdown of the various classes is as follows:
// a. CalendarStrategy:  Very little - simply a gateway to the Calendar Config.
// b. CalendarConfig:  Enables the user to see what the various calendars on offer are (and their contents) and to choose a Current Calendar
// c. Calendar State:  Stores just the name of the Current Calendar.  We dont persist the contents of the Current Calendar (similar to WPF)
// d. Calendar Service:  This class which gets the details of teh calendars and makes calendar based calculations
// N.B.  At the moment we DONT allow users to import (or edit) calendars;  to do that we need a way of reading from .csv files in Typescript (presumably jquery type libraries for this exist...)
// Hence why we store the details of the shipped calendars the way we do, rather than reading from a file like we do with WPF version.

export class CalendarService implements ICalendarService {

    constructor(private blotter: IAdaptableBlotter) {

        // for now hardcode the holidays
        // adding 3 dummy holidays to test if last and next is working - and it seems to be...
        this.AvailableCalendars = [
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

                ],

            }
        ]
    }

    

    public AvailableCalendars: ICalendar[];

    public GetDynamicDate(dynamicDateName: string): Date {
        // eventually we should use some kind of enum? or class that holds this
        var dynamicDate: Date;

        if (dynamicDateName == "[Today Date]") {
            dynamicDate = new Date();
        }
        else if (dynamicDateName == "[Last Working Day]") {
            dynamicDate = this.GetLastWorkingDay(1);
        }
        else if (dynamicDateName == "[Next Working Day]") {
            dynamicDate = this.GetNextWorkingDay(1);
        }
        return dynamicDate;
    }

    public GetNextWorkingDay(days: number = 1): Date {
        var count = 0;
        let counterDate: Date = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() + 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    }

    public GetLastWorkingDay(days: number = 1): Date {
        var count = 0;
        let counterDate: Date = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() - 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    }

     private isNotWorkingDay(dateToCheck: Date): Boolean {
        let currentHoliday = this.AvailableCalendars.find(c => c.CalendarName == this.blotter.AdaptableBlotterStore.TheStore.getState().Calendars.CurrentCalendar);
        for (var holiday of currentHoliday.CalendarEntries) {
            if (holiday.HolidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
                return false;
            }
        }
        return (dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6);
    }

}
