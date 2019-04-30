import { ApiBase } from "./ApiBase";
import { ICalendarApi } from './Interface/ICalendarApi';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CalendarApi extends ApiBase implements ICalendarApi {
    getCalendarState(): CalendarState;
    setCurrentCalendar(calendar: string): void;
    getCurrentCalendar(): string;
}
