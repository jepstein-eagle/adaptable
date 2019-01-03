import * as CalendarRedux from '../Redux/ActionsReducers/CalendarRedux'
import { ApiBase } from "./ApiBase";
import { ICalendarApi } from './Interface/ICalendarApi';

export class CalendarApi extends ApiBase implements ICalendarApi {

  
  public SetCurrent(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar))
  }

  public GetCurrent(): string {
    return this.getState().Calendar.CurrentCalendar;
  }

}