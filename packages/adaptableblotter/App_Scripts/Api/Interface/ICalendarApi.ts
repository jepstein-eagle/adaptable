import * as CalendarRedux from '../../Redux/ActionsReducers/CalendarRedux'
import { ApiBase } from "../ApiBase";

export interface ICalendarApi {
    
  SetCurrent(calendar: string): void
  GetCurrent(): string
}

