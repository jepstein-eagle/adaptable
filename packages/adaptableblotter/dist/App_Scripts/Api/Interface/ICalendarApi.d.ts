import { CalendarState } from "../../Redux/ActionsReducers/Interface/IState";
export interface ICalendarApi {
    GetState(): CalendarState;
    SetCurrent(calendar: string): void;
    GetCurrent(): string;
}
