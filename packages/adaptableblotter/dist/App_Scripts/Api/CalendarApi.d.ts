import { ApiBase } from "./ApiBase";
import { ICalendarApi } from './Interface/ICalendarApi';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CalendarApi extends ApiBase implements ICalendarApi {
    GetState(): CalendarState;
    SetCurrent(calendar: string): void;
    GetCurrent(): string;
}
