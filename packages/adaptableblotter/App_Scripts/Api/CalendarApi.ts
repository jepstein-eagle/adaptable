import { CalendarState } from '../PredefinedConfig/RunTimeState/CalendarState';

export interface CalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
