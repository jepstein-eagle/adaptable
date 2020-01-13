import * as CalendarRedux from '../../Redux/ActionsReducers/CalendarRedux';
import { ApiBase } from './ApiBase';
import { CalendarApi } from '../CalendarApi';
import { CalendarState } from '../../PredefinedConfig/CalendarState';

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
}
