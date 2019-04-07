"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.Reminder_ADD = 'Reminder_ADD';
exports.Reminder_EDIT = 'Reminder_EDIT';
exports.Reminder_DELETE = 'Reminder_DELETE';
exports.ReminderAdd = (Reminder) => ({
    type: exports.Reminder_ADD,
    Reminder
});
exports.ReminderEdit = (index, Reminder) => ({
    type: exports.Reminder_EDIT,
    index,
    Reminder
});
exports.ReminderDelete = (index) => ({
    type: exports.Reminder_DELETE,
    index
});
const initialReminderState = {
    Reminders: GeneralConstants_1.EMPTY_ARRAY
};
exports.ReminderReducer = (state = initialReminderState, action) => {
    let Reminders;
    switch (action.type) {
        case exports.Reminder_ADD:
            Reminders = [].concat(state.Reminders);
            Reminders.push(action.Reminder);
            return Object.assign({}, state, { Reminders: Reminders });
        case exports.Reminder_EDIT: {
            Reminders = [].concat(state.Reminders);
            let actionTyped = action;
            Reminders[actionTyped.index] = action.Reminder;
            return Object.assign({}, state, { Reminders: Reminders });
        }
        case exports.Reminder_DELETE:
            Reminders = [].concat(state.Reminders);
            Reminders.splice(action.index, 1);
            return Object.assign({}, state, { Reminders: Reminders });
        default:
            return state;
    }
};
