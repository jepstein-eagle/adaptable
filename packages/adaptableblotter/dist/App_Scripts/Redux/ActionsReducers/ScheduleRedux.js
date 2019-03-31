"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
/*
export const FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
export const FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
export const FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';

export interface SchedulerAddAction extends Redux.Action {
    Scheduler: IScheduler
}

export interface SchedulerEditAction extends Redux.Action {
    Scheduler: IScheduler
}

export interface SchedulerDeleteAction extends Redux.Action {
    Scheduler: IScheduler
}

export const SchedulerAdd = (Scheduler: IScheduler): SchedulerAddAction => ({
    type: FORMAT_COLUMN_ADD,
    Scheduler
})

export const SchedulerEdit = (Scheduler: IScheduler): SchedulerEditAction => ({
    type: FORMAT_COLUMN_EDIT,
    Scheduler
})
export const SchedulerDelete = (Scheduler: IScheduler): SchedulerDeleteAction => ({
    type: FORMAT_COLUMN_DELETE,
    Scheduler
})
*/
const initialScheduleState = {
    Schedules: GeneralConstants_1.EMPTY_ARRAY
};
exports.ScheduleReducer = (state = initialScheduleState, action) => {
    //  let Schedulers: IScheduler[]
    switch (action.type) {
        /*
        case FORMAT_COLUMN_ADD:
            Schedulers = [].concat(state.Schedulers);
            Schedulers.push((<SchedulerAddAction>action).Scheduler);
            return Object.assign({}, state, { Schedulers: Schedulers });

        case FORMAT_COLUMN_EDIT: {
            Schedulers = [].concat(state.Schedulers);
            let index = Schedulers.findIndex(x => x.ColumnId == (<SchedulerAddAction>action).Scheduler.ColumnId)
            Schedulers[index] = (<SchedulerAddAction>action).Scheduler;
            return Object.assign({}, state, { Schedulers: Schedulers });
        }
        case FORMAT_COLUMN_DELETE:
            Schedulers = [].concat(state.Schedulers);
            let index = Schedulers.findIndex(x => x.ColumnId == (<SchedulerDeleteAction>action).Scheduler.ColumnId)
            Schedulers.splice(index, 1);
            return Object.assign({}, state, { Schedulers: Schedulers });
            */
        default:
            return state;
    }
};
