import { ApiBase } from "./ApiBase";
import { ICalendarApi } from './Interface/ICalendarApi';
export declare class CalendarApi extends ApiBase implements ICalendarApi {
    SetCurrent(calendar: string): void;
    GetCurrent(): string;
}
