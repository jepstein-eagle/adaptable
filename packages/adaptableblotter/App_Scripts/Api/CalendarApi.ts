import * as CalendarRedux from '../Redux/ActionsReducers/CalendarRedux'
import { ApiBase } from "./ApiBase";
import { Visibility, MathOperation } from '../Utilities/Enums';
import { ICalendar } from './Interface/IAdaptableBlotterObjects';

export interface ICalendarApi {
    
  // Calendar State
  calendarSetCurrent(calendar: string): void
  calendarGetCurrent(): string




}



export class CalendarApi extends ApiBase implements ICalendarApi {

   
 
  // Calendar State
  public calendarSetCurrent(calendar: string): void {
    this.dispatchAction(CalendarRedux.CalendarSelect(calendar))
  }

  public calendarGetCurrent(): string {
    return this.getState().Calendar.CurrentCalendar;
  }

}