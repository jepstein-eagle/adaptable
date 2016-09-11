
import {ICalendarService} from './Interface/ICalendarService';

export class CalendarService implements ICalendarService {
    holidays: { name: string, holidayDate: Date }[]

    constructor() {

        // for now hardcode the holidays
        // adding 3 dummy holidays to test if last and next is working - and it seems to be...
        this.holidays = [
            { name: "Test Day", holidayDate: new Date("September 12, 2016") },
            { name: "Test Day", holidayDate: new Date("September 13, 2016") },
            { name: "Test Day", holidayDate: new Date("September 9, 2016") },
            { name: "Boxing Day", holidayDate: new Date("December 26, 2016") },
            { name: "Christmas Day (substitute)", holidayDate: new Date("December 27, 2017") },
            { name: "New Year's Day (substitute)", holidayDate: new Date("January 02, 2017") },
            { name: "Good Friday", holidayDate: new Date("April 14, 2017") },
            { name: "Easter Monday", holidayDate: new Date("April 17, 2017") },
            { name: "Early May Bank Holiday", holidayDate: new Date("May 1, 2017") },
            { name: "Spring Bank Holiday", holidayDate: new Date("May 29, 2017") },
            { name: "Summer Bank Holiday", holidayDate: new Date("August 28, 2017") },
            { name: "Christmas Day", holidayDate: new Date("Decmeber 25, 2017") },
            { name: "Boxing Day", holidayDate: new Date("Decmeber 26, 2017") },
        ]
    }

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
        for (var holiday of this.holidays) {
            if (holiday.holidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
                return false;
            }
        }
        return (dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6);
    }

}
