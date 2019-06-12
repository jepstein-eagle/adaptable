import { ICalendar } from '../Interface/BlotterObjects/ICalendar';

export function getSystemCalendars(): ICalendar[] {
  return [
    {
      Name: 'United Kingdom',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: "New Year's Day", HolidayDate: new Date('January 01, 2019').toJSON() },
        { HolidayName: 'Good Friday', HolidayDate: new Date('April 19, 2019').toJSON() },
        { HolidayName: 'Easter Monday', HolidayDate: new Date('April 22, 2019').toJSON() },
        { HolidayName: 'Early May Bank Holiday', HolidayDate: new Date('May 06 2019').toJSON() },
        { HolidayName: 'Spring Bank Holiday', HolidayDate: new Date('May 27, 2019').toJSON() },
        { HolidayName: 'Summer Bank Holiday', HolidayDate: new Date('August 26, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
        { HolidayName: 'Boxing Day', HolidayDate: new Date('December 26, 2019').toJSON() },
      ],
    },
    {
      Name: 'Germany',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: "New Year's Day", HolidayDate: new Date('January 01, 2019').toJSON() },
        { HolidayName: 'Good Friday', HolidayDate: new Date('April 19, 2019').toJSON() },
        { HolidayName: 'Easter Monday', HolidayDate: new Date('April 22, 2019').toJSON() },
        { HolidayName: 'Labour Day', HolidayDate: new Date('May 01 2019').toJSON() },
        { HolidayName: 'Ascension Day', HolidayDate: new Date('May 30 2019').toJSON() },
        { HolidayName: 'Whit Monday', HolidayDate: new Date('June 10, 2019').toJSON() },
        { HolidayName: 'German Unity Day', HolidayDate: new Date('October 03, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
        { HolidayName: "St Stephen's Day", HolidayDate: new Date('December 26, 2019').toJSON() },
      ],
    },
    {
      Name: 'France',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2019').toJSON() },
        { HolidayName: 'Easter Monday', HolidayDate: new Date('April 22, 2019').toJSON() },
        { HolidayName: 'Labour Day', HolidayDate: new Date('May 01, 2019').toJSON() },
        { HolidayName: 'VE Day', HolidayDate: new Date('May 08, 2019').toJSON() },
        { HolidayName: 'Ascension Day', HolidayDate: new Date('May 30, 2019').toJSON() },
        { HolidayName: 'Whitmonday', HolidayDate: new Date('June 10, 2019').toJSON() },
        { HolidayName: 'Bastille Day', HolidayDate: new Date('July 14, 2019').toJSON() },
        { HolidayName: 'Assumption Day', HolidayDate: new Date('August 15, 2019').toJSON() },
        { HolidayName: 'All Saints Day', HolidayDate: new Date('November 01, 2019').toJSON() },
        { HolidayName: 'Armistice Day', HolidayDate: new Date('November 11, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
      ],
    },
    {
      Name: 'United States',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2019').toJSON() },
        {
          HolidayName: 'Martin Luther King Day',
          HolidayDate: new Date('January 21, 2019').toJSON(),
        },
        { HolidayName: 'Presidents Day', HolidayDate: new Date('February 18, 2019').toJSON() },
        { HolidayName: 'Memorial Day', HolidayDate: new Date('May 27, 2019').toJSON() },
        { HolidayName: 'Independence Day', HolidayDate: new Date('July 04, 2019').toJSON() },
        { HolidayName: 'Labour Day', HolidayDate: new Date('September 02, 2019').toJSON() },
        { HolidayName: 'Columbus Day', HolidayDate: new Date('October 14, 2019').toJSON() },
        { HolidayName: 'Veterans Day', HolidayDate: new Date('November 11, 2019').toJSON() },
        { HolidayName: 'Thanksgiving Day', HolidayDate: new Date('November 28, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
      ],
    },
    {
      Name: 'Canada',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2019').toJSON() },
        { HolidayName: 'Good Friday', HolidayDate: new Date('April 19, 2019').toJSON() },
        { HolidayName: 'Victoria Day', HolidayDate: new Date('May 20, 2019').toJSON() },
        { HolidayName: 'Canada Day', HolidayDate: new Date('July 01, 2019').toJSON() },
        { HolidayName: 'Labour Day', HolidayDate: new Date('September 023, 2019').toJSON() },
        { HolidayName: 'Thanksgiving', HolidayDate: new Date('October 14, 2019').toJSON() },
        { HolidayName: 'Rememberance Day', HolidayDate: new Date('November 11, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
        { HolidayName: 'Boxing Day', HolidayDate: new Date('December 26, 2019').toJSON() },
      ],
    },
    {
      Name: 'Singapore',
      YearName: 2019,
      CalendarEntries: [
        { HolidayName: 'New Years Day', HolidayDate: new Date('January 01, 2019').toJSON() },
        { HolidayName: 'Chinese New Year', HolidayDate: new Date('February 05, 2019').toJSON() },
        { HolidayName: 'Good Friday', HolidayDate: new Date('April 19, 2019').toJSON() },
        { HolidayName: 'Labour Day', HolidayDate: new Date('May 01, 2019').toJSON() },
        { HolidayName: 'Vesak Day', HolidayDate: new Date('May 19, 2019').toJSON() },
        { HolidayName: 'Hari Raya Puasa', HolidayDate: new Date('June 05, 2019').toJSON() },
        { HolidayName: 'National Day', HolidayDate: new Date('August 09, 2019').toJSON() },
        { HolidayName: 'Hari Raya Haji', HolidayDate: new Date('August 11, 2019').toJSON() },
        { HolidayName: 'Deepavali', HolidayDate: new Date('October 27, 2019').toJSON() },
        { HolidayName: 'Christmas Day', HolidayDate: new Date('December 25, 2019').toJSON() },
      ],
    },
  ];
}

export const CalendarHelper = {
  getSystemCalendars,
};
export default CalendarHelper;
