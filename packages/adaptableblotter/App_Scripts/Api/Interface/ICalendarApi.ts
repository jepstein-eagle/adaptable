import { CalendarState } from '../../PredefinedConfig/RunTimeState/CalendarState';

export interface ICalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
