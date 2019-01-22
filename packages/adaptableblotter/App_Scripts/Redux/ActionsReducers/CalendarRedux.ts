import { CalendarState } from './Interface/IState';
import * as Redux from 'redux'

export const CALENDAR_SELECT = 'CALENDAR_SELECT';

export interface CalendarSelectAction extends Redux.Action {
    selectedCalendarName: string
}

export const CalendarSelect = (selectedCalendarName: string): CalendarSelectAction => ({
    type: CALENDAR_SELECT,
    selectedCalendarName
})

const initialCalendarState: CalendarState = {
    CurrentCalendar: "United States",
    
}


export const CalendarReducer: Redux.Reducer<CalendarState> = (state: CalendarState = initialCalendarState, action: Redux.Action): CalendarState => {
    switch (action.type) {
        case CALENDAR_SELECT:
            return Object.assign({}, state, { CurrentCalendar: (<CalendarSelectAction>action).selectedCalendarName })
        default:
            return state
    }
}