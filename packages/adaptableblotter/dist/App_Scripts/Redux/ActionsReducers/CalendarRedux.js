"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALENDAR_SELECT = 'CALENDAR_SELECT';
exports.CalendarSelect = (name) => ({
    type: exports.CALENDAR_SELECT,
    name
});
const initialCalendarState = {
    CurrentCalendar: "United States",
};
exports.CalendarReducer = (state = initialCalendarState, action) => {
    switch (action.type) {
        case exports.CALENDAR_SELECT:
            return Object.assign({}, state, { CurrentCalendar: action.name });
        default:
            return state;
    }
};
