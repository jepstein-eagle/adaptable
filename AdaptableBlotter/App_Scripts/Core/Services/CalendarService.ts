
import { ICalendarService } from './Interface/ICalendarService';
import { ICalendarStrategy, ICalendar, ICalendarEntry } from '../Interface/ICalendarStrategy';
import * as CalendarStrat from '../Interface/ICalendarStrategy';
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
    }

    public GetDynamicDate(dynamicDateName: string): Date {
        // eventually we should use some kind of enum? or class that holds this
        var dynamicDate: Date;

        if (dynamicDateName == CalendarStrat.TODAY_MAGICSTRING) {
            dynamicDate = new Date();
        }
        else if (dynamicDateName == CalendarStrat.PREVIOUS_WORK_DAY_MAGICSTRING) {
            dynamicDate = this.GetPreviousWorkingDay(1);
        }
        else if (dynamicDateName == CalendarStrat.NEXT_WORK_DAY_MAGICSTRING) {
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

    public GetPreviousWorkingDay(days: number = 1): Date {
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
        let calendarStore = this.blotter.AdaptableBlotterStore.TheStore.getState().Calendars
        let currentHoliday = calendarStore.AvailableCalendars.find(c => c.CalendarName == calendarStore.CurrentCalendar);
        for (var holiday of currentHoliday.CalendarEntries) {
            let holidayDate = new Date(holiday.HolidayDate)
            if (holidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
                return false;
            }
        }
        return (dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6);
    }

}
