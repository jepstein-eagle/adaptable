import { CalendarState } from '../PredefinedConfig/CalendarState';

export interface CalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
