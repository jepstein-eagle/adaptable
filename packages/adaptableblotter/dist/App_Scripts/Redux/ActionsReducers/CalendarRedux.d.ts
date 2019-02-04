import { CalendarState } from './Interface/IState';
import * as Redux from 'redux';
export declare const CALENDAR_SELECT = "CALENDAR_SELECT";
export interface CalendarSelectAction extends Redux.Action {
    selectedCalendarName: string;
}
export declare const CalendarSelect: (selectedCalendarName: string) => CalendarSelectAction;
export declare const CalendarReducer: Redux.Reducer<CalendarState>;
