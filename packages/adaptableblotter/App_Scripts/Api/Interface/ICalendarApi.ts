import { CalendarState } from '../../PredefinedConfig/IUserState Interfaces/CalendarState';

export interface ICalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
