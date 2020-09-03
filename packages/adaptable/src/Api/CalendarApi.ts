import { CalendarState, Calendar } from '../PredefinedConfig/CalendarState';

export interface CalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
  getAvailableCalendars(): Calendar[];
  getDynamicDate(dynamicDateName: string): Date;
  getNextWorkingDay(): Date;
  getPreviousWorkingDay(): Date;
  isNotWorkingDay(dateToCheck: Date): Boolean;
}
