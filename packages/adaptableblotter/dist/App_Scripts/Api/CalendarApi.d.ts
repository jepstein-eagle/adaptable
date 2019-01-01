import { ApiBase } from "./ApiBase";
export interface ICalendarApi {
    SetCurrent(calendar: string): void;
    GetCurrent(): string;
}
export declare class CalendarApi extends ApiBase implements ICalendarApi {
    SetCurrent(calendar: string): void;
    GetCurrent(): string;
}
