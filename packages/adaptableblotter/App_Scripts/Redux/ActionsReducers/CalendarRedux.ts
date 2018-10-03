import { CalendarState } from './Interface/IState';
import * as Redux from 'redux'

export const CALENDAR_SELECT = 'CALENDAR_SELECT';

export interface CalendarSelectAction extends Redux.Action {
    name: string
}

export const CalendarSelect = (name: string): CalendarSelectAction => ({
    type: CALENDAR_SELECT,
    name
})

const initialCalendarState: CalendarState = {
    CurrentCalendar: "United States",
    
}


export const CalendarReducer: Redux.Reducer<CalendarState> = (state: CalendarState = initialCalendarState, action: Redux.Action): CalendarState => {
    switch (action.type) {
        case CALENDAR_SELECT:
            return Object.assign({}, state, { CurrentCalendar: (<CalendarSelectAction>action).name })
        default:
            return state
    }
}