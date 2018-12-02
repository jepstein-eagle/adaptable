"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarConstants = require("../../Utilities/Constants/CalendarConstants");
// Similar service to the one in WPF version
// This service is responsible for reading the calendars and for making them available and also for doing data calculations
// The breakdown of the various classes is as follows:
// a. CalendarStrategy:  Very little - simply a gateway to the Calendar Config.
// b. CalendarConfig:  Enables the user to see what the various calendars on offer are (and their contents) and to choose a Current Calendar
// c. Calendar State:  Stores just the name of the Current Calendar.  We dont persist the contents of the Current Calendar (similar to WPF)
// d. Calendar Service:  This class which gets the details of teh calendars and makes calendar based calculations
// N.B.  At the moment we DONT allow users to import (or edit) calendars;  to do that we need a way of reading from .csv files in Typescript 
// Hence why we store the details of the shipped calendars the way we do, rather than reading from a file like we do with WPF version.
class CalendarService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    GetDynamicDate(dynamicDateName) {
        // eventually we should use some kind of enum? or class that holds this
        var dynamicDate;
        if (dynamicDateName == CalendarConstants.TODAY) {
            dynamicDate = new Date();
        }
        else if (dynamicDateName == CalendarConstants.YESTERDAY) {
            dynamicDate = new Date();
            dynamicDate.setDate(dynamicDate.getDate() - 1);
        }
        else if (dynamicDateName == CalendarConstants.TOMORROW) {
            dynamicDate = new Date();
            dynamicDate.setDate(dynamicDate.getDate() + 1);
        }
        else if (dynamicDateName == CalendarConstants.PREVIOUS_WORK_DAY) {
            dynamicDate = this.GetPreviousWorkingDay(1);
        }
        else if (dynamicDateName == CalendarConstants.NEXT_WORK_DAY) {
            dynamicDate = this.GetNextWorkingDay(1);
        }
        return dynamicDate;
    }
    GetNextWorkingDay(days = 1) {
        var count = 0;
        let counterDate = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() + 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    }
    GetPreviousWorkingDay(days = 1) {
        var count = 0;
        let counterDate = new Date();
        while (count < days) {
            counterDate.setDate(counterDate.getDate() - 1);
            if (this.isNotWorkingDay(counterDate)) {
                count++;
            }
        }
        return counterDate;
    }
    // pretty sure this can be improved as pretty expensive - though rarely used to be honest
    isNotWorkingDay(dateToCheck) {
        let calendarStore = this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar;
        let systemStore = this.blotter.AdaptableBlotterStore.TheStore.getState().System;
        let currentHoliday = systemStore.AvailableCalendars.find(c => c.Name == calendarStore.CurrentCalendar);
        for (var holiday of currentHoliday.CalendarEntries) {
            let holidayDate = new Date(holiday.HolidayDate);
            if (holidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
                return false;
            }
        }
        return (dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6);
    }
}
exports.CalendarService = CalendarService;
