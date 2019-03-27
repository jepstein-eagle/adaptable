import { ScheduleState } from './Interface/IState';
import * as Redux from 'redux'
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

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
const initialScheduleState: ScheduleState = {
    Schedules: EMPTY_ARRAY
}


export const ScheduleReducer: Redux.Reducer<ScheduleState> = (state: ScheduleState = initialScheduleState, action: Redux.Action): ScheduleState => {
   
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
            return state
    }
    
}