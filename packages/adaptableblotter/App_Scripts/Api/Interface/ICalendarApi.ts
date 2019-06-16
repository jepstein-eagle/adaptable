import { CalendarState } from '../../PredefinedConfig/IUserState/CalendarState';

export interface ICalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
