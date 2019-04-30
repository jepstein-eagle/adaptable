"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class ReminderApi extends ApiBase_1.ApiBase {
    getReminderState() {
        return this.getBlotterState().Reminder;
    }
    getAllReminder() {
        return this.getBlotterState().Reminder.Reminders;
    }
}
exports.ReminderApi = ReminderApi;
