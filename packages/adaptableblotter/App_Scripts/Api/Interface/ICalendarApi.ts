import { CalendarState } from '../../Redux/ActionsReducers/Interface/IState';

export interface ICalendarApi {
  getCalendarState(): CalendarState;
  setCurrentCalendar(calendar: string): void;
  getCurrentCalendar(): string;
}
