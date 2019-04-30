"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarRedux = require("../Redux/ActionsReducers/CalendarRedux");
const ApiBase_1 = require("./ApiBase");
class CalendarApi extends ApiBase_1.ApiBase {
    getCalendarState() {
        return this.getBlotterState().Calendar;
    }
    setCurrentCalendar(calendar) {
        this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
    }
    getCurrentCalendar() {
        return this.getBlotterState().Calendar.CurrentCalendar;
    }
}
exports.CalendarApi = CalendarApi;
