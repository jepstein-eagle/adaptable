"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarRedux = require("../Redux/ActionsReducers/CalendarRedux");
const ApiBase_1 = require("./ApiBase");
class CalendarApi extends ApiBase_1.ApiBase {
    SetCurrent(calendar) {
        this.dispatchAction(CalendarRedux.CalendarSelect(calendar));
    }
    GetCurrent() {
        return this.getState().Calendar.CurrentCalendar;
    }
}
exports.CalendarApi = CalendarApi;
