/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import * as React from 'react';
import {CalendarState} from './Interface/IState';

export const CALENDAR_SET_DEFAULT_CALENDAR = 'CALENDAR_SET_DEFAULT_CALENDAR';

export interface CalendarSetDefaultCalendarAction extends Redux.Action {
    calendarName: string
}

export const CalendarSetDefaultCalendar = (calendarName: string): CalendarSetDefaultCalendarAction => ({
    type: CALENDAR_SET_DEFAULT_CALENDAR,
    calendarName
})

const initialCalendarState: CalendarState = {
    CurrentCalendar: "United Kingdom"
}

export const CalendarReducer: Redux.Reducer<CalendarState> = (state: CalendarState = initialCalendarState, action: Redux.Action): CalendarState => {
    switch (action.type) {
        case CALENDAR_SET_DEFAULT_CALENDAR:
            return Object.assign({}, state, { CurrentCalendar: (<CalendarSetDefaultCalendarAction>action).calendarName })
        default:
            return state
    }
}