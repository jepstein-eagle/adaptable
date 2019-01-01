import * as CalendarRedux from '../Redux/ActionsReducers/CalendarRedux'
import { ApiBase } from "./ApiBase";

export interface ICalendarApi {
    
  SetCurrent(calendar: string): void
  GetCurrent(): string
}

export class CalendarApi extends ApiBase implements ICalendarApi {

  
  public SetCurrent(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar))
  }

  public GetCurrent(): string {
    return this.getState().Calendar.CurrentCalendar;
  }

}