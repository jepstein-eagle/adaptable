"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class ReminderApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Reminder;
    }
    GetAll() {
        return this.getBlotterState().Reminder.Reminders;
    }
}
exports.ReminderApi = ReminderApi;
