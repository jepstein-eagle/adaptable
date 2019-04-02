import { ScheduleState } from './Interface/IState';
import * as Redux from 'redux'
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { ISchedule } from '../../Utilities/Interface/BlotterObjects/ISchedule';


export const SCHEDULE_ADD = 'SCHEDULE_ADD';
export const SCHEDULE_EDIT = 'SCHEDULE_EDIT';
export const SCHEDULE_DELETE = 'SCHEDULE_DELETE';

export interface ScheduleAddAction extends Redux.Action {
    schedule: ISchedule
}

export interface ScheduleEditAction extends Redux.Action {
    index: number,
    schedule: ISchedule
}

export interface ScheduleDeleteAction extends Redux.Action {
    index: number,
    schedule: ISchedule
}

export const ScheduleAdd = (schedule: ISchedule): ScheduleAddAction => ({
    type: SCHEDULE_ADD,
    schedule
})

export const ScheduleEdit = (index: number, schedule: ISchedule): ScheduleEditAction => ({
    type: SCHEDULE_EDIT,
    index,
    schedule
})
export const ScheduleDelete = (index: number, schedule: ISchedule): ScheduleDeleteAction => ({
    type: SCHEDULE_DELETE,
    index,
    schedule
})


const initialScheduleState: ScheduleState = {
    Schedules: EMPTY_ARRAY
}


export const ScheduleReducer: Redux.Reducer<ScheduleState> = (state: ScheduleState = initialScheduleState, action: Redux.Action): ScheduleState => {

    let schedules: ISchedule[]

    switch (action.type) {

        case SCHEDULE_ADD:
            schedules = [].concat(state.Schedules);
            schedules.push((<ScheduleAddAction>action).schedule);
            return Object.assign({}, state, { Schedules: schedules });

        case SCHEDULE_EDIT: {
            schedules = [].concat(state.Schedules);
            let actionTyped = (<ScheduleEditAction>action)
            schedules[actionTyped.index] = (<ScheduleAddAction>action).schedule;
            return Object.assign({}, state, { Schedules: schedules });
        }
        case SCHEDULE_DELETE:
            schedules = [].concat(state.Schedules);
            schedules.splice((<ScheduleDeleteAction>action).index, 1)
            return Object.assign({}, state, { Schedules: schedules });

        default:
            return state
    }

}