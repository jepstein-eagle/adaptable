import * as CalendarRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { ApiBase } from './ApiBase';
import { CalendarApi } from '../CalendarApi';
import { CalendarState, Calendar } from '../../PredefinedConfig/CalendarState';
import * as CalendarConstants from '../../Utilities/Constants/CalendarConstants';

export class CalendarApiImpl extends ApiBase implements CalendarApi {
  public getCalendarState(): CalendarState {
    return this.getAdaptableState().Calendar;
  }

  public setCurrentCalendar(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
  }

  public getCurrentCalendar(): string {
    return this.getAdaptableState().Calendar.CurrentCalendar;
  }

  public getAvailableCalendars(): Calendar[] {
    return [
      {
        Name: 'United Kingdom',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: "New Year's Day", HolidayDate: new Date('January 01, 2020').toJSON() },
          { HolidayName: 'Good Friday', HolidayDate: new Date('April 10, 2020').toJSON() },
          { HolidayName: 'Easter Monday', HolidayDate: new Date('April 13, 2020').toJSON() },
          { HolidayName: 'Early May Bank Holiday', HolidayDate: new Date('May 8 2020').toJSON() },
          { HolidayName: 'Spring Bank Holiday', HolidayDate: new Date('May 25, 2020').toJSON() },
          { HolidayName: 'Summer Bank Holiday', HolidayDate: new Date('August 31, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
          { HolidayName: 'Boxing Day', HolidayDate: new Date('December 28, 2020').toJSON() },
        ],
      },
      {
        Name: 'Germany',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: "New Year's Day", HolidayDate: new Date('January 01, 2020').toJSON() },
          { HolidayName: 'Good Friday', HolidayDate: new Date('April 10, 2020').toJSON() },
          { HolidayName: 'Easter Monday', HolidayDate: new Date('April 13, 2020').toJSON() },
          { HolidayName: 'Labour Day', HolidayDate: new Date('May 01 2020').toJSON() },
          { HolidayName: 'Ascension Day', HolidayDate: new Date('May 21 2020').toJSON() },
          { HolidayName: 'Whit Monday', HolidayDate: new Date('June 01, 2020').toJSON() },
          { HolidayName: 'German Unity Day', HolidayDate: new Date('October 03, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
          { HolidayName: "St Stephen's Day", HolidayDate: new Date('December 26, 2020').toJSON() },
        ],
      },
      {
        Name: 'France',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2020').toJSON() },
          { HolidayName: 'Easter Monday', HolidayDate: new Date('April 13, 2020').toJSON() },
          { HolidayName: 'Labour Day', HolidayDate: new Date('May 01, 2020').toJSON() },
          { HolidayName: 'VE Day', HolidayDate: new Date('May 08, 2020').toJSON() },
          { HolidayName: 'Ascension Day', HolidayDate: new Date('May 21, 2020').toJSON() },
          { HolidayName: 'Whitmonday', HolidayDate: new Date('June 01, 2020').toJSON() },
          { HolidayName: 'Bastille Day', HolidayDate: new Date('July 14, 2020').toJSON() },
          { HolidayName: 'Assumption Day', HolidayDate: new Date('August 15, 2020').toJSON() },
          { HolidayName: 'All Saints Day', HolidayDate: new Date('November 01, 2020').toJSON() },
          { HolidayName: 'Armistice Day', HolidayDate: new Date('November 11, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
        ],
      },
      {
        Name: 'United States',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2020').toJSON() },
          {
            HolidayName: 'Martin Luther King Day',
            HolidayDate: new Date('January 20, 2020').toJSON(),
          },
          { HolidayName: 'Presidents Day', HolidayDate: new Date('February 17, 2020').toJSON() },
          { HolidayName: 'Memorial Day', HolidayDate: new Date('May 25, 2020').toJSON() },
          { HolidayName: 'Independence Day', HolidayDate: new Date('July 03, 2020').toJSON() },
          { HolidayName: 'Labour Day', HolidayDate: new Date('September 07, 2020').toJSON() },
          { HolidayName: 'Columbus Day', HolidayDate: new Date('October 12, 2020').toJSON() },
          { HolidayName: 'Veterans Day', HolidayDate: new Date('November 11, 2020').toJSON() },
          { HolidayName: 'Thanksgiving Day', HolidayDate: new Date('November 26, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
        ],
      },
      {
        Name: 'Canada',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2020').toJSON() },
          { HolidayName: 'Good Friday', HolidayDate: new Date('April 10, 2020').toJSON() },
          { HolidayName: 'Victoria Day', HolidayDate: new Date('May 18, 2020').toJSON() },
          { HolidayName: 'Canada Day', HolidayDate: new Date('July 01, 2020').toJSON() },
          { HolidayName: 'Labour Day', HolidayDate: new Date('September 07, 2020').toJSON() },
          { HolidayName: 'Thanksgiving', HolidayDate: new Date('October 12, 2020').toJSON() },
          { HolidayName: 'Rememberance Day', HolidayDate: new Date('November 11, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
          { HolidayName: 'Boxing Day', HolidayDate: new Date('December 26, 2020').toJSON() },
        ],
      },
      {
        Name: 'Singapore',
        YearName: 2020,
        CalendarEntries: [
          { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2020').toJSON() },
          { HolidayName: 'Chinese New Year', HolidayDate: new Date('January 25, 2020').toJSON() },
          { HolidayName: 'Good Friday', HolidayDate: new Date('April 10, 2020').toJSON() },
          { HolidayName: 'Labour Day', HolidayDate: new Date('May 01, 2020').toJSON() },
          { HolidayName: 'Vesak Day', HolidayDate: new Date('May 07, 2020').toJSON() },
          { HolidayName: 'National Day', HolidayDate: new Date('August 09, 2020').toJSON() },
          { HolidayName: 'Hari Raya Haji', HolidayDate: new Date('August 10, 2020').toJSON() },
          { HolidayName: 'Deewali', HolidayDate: new Date('November 14, 2020').toJSON() },
          { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2020').toJSON() },
        ],
      },
    ];
  }

  public getDynamicDate(dynamicDateName: string): Date {
    // eventually we should use some kind of enum? or class that holds this
    var dynamicDate: Date;

    if (dynamicDateName == CalendarConstants.TODAY) {
      dynamicDate = new Date();
    } else if (dynamicDateName == CalendarConstants.YESTERDAY) {
      dynamicDate = new Date();
      dynamicDate.setDate(dynamicDate.getDate() - 1);
    } else if (dynamicDateName == CalendarConstants.TOMORROW) {
      dynamicDate = new Date();
      dynamicDate.setDate(dynamicDate.getDate() + 1);
    } else if (dynamicDateName == CalendarConstants.PREVIOUS_WORK_DAY) {
      dynamicDate = this.getPreviousWorkingDay(1);
    } else if (dynamicDateName == CalendarConstants.NEXT_WORK_DAY) {
      dynamicDate = this.getNextWorkingDay(1);
    }
    return dynamicDate;
  }

  public getNextWorkingDay(days: number = 1): Date {
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

  public getPreviousWorkingDay(days: number = 1): Date {
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

  // pretty sure this can be improved as pretty expensive - though rarely used to be honest
  public isNotWorkingDay(dateToCheck: Date): Boolean {
    let currentCalendar: string = this.getCurrentCalendar();
    let currentHoliday = this.getAvailableCalendars().find(c => c.Name == currentCalendar);
    for (var holiday of currentHoliday.CalendarEntries) {
      let holidayDate = new Date(holiday.HolidayDate);
      if (holidayDate.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0)) {
        return false;
      }
    }
    return dateToCheck.getDay() != 0 && dateToCheck.getDay() != 6;
  }
}
