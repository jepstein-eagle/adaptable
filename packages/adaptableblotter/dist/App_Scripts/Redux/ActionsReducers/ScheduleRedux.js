"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SCHEDULE_ADD = 'SCHEDULE_ADD';
exports.SCHEDULE_EDIT = 'SCHEDULE_EDIT';
exports.SCHEDULE_DELETE = 'SCHEDULE_DELETE';
exports.ScheduleAdd = (schedule) => ({
    type: exports.SCHEDULE_ADD,
    schedule
});
exports.ScheduleEdit = (index, schedule) => ({
    type: exports.SCHEDULE_EDIT,
    index,
    schedule
});
exports.ScheduleDelete = (index, schedule) => ({
    type: exports.SCHEDULE_DELETE,
    index,
    schedule
});
const initialScheduleState = {
    Schedules: GeneralConstants_1.EMPTY_ARRAY
};
exports.ScheduleReducer = (state = initialScheduleState, action) => {
    let schedules;
    switch (action.type) {
        case exports.SCHEDULE_ADD:
            schedules = [].concat(state.Schedules);
            schedules.push(action.schedule);
            return Object.assign({}, state, { Schedules: schedules });
        case exports.SCHEDULE_EDIT: {
            schedules = [].concat(state.Schedules);
            let actionTyped = action;
            schedules[actionTyped.index] = action.schedule;
            return Object.assign({}, state, { Schedules: schedules });
        }
        case exports.SCHEDULE_DELETE:
            schedules = [].concat(state.Schedules);
            schedules.splice(action.index, 1);
            return Object.assign({}, state, { Schedules: schedules });
        default:
            return state;
    }
};
