import * as CalendarRedux from '../Redux/ActionsReducers/CalendarRedux';
import { ApiBase } from './ApiBase';
import { ICalendarApi } from './Interface/ICalendarApi';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';

export class CalendarApi extends ApiBase implements ICalendarApi {
  public getCalendarState(): CalendarState {
    return this.getBlotterState().Calendar;
  }

  public setCurrentCalendar(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
  }

  public getCurrentCalendar(): string {
    return this.getBlotterState().Calendar.CurrentCalendar;
  }
}
