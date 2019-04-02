import { ScheduleState } from './Interface/IState';
import * as Redux from 'redux';
import { ISchedule } from '../../Utilities/Interface/BlotterObjects/ISchedule';
export declare const SCHEDULE_ADD = "SCHEDULE_ADD";
export declare const SCHEDULE_EDIT = "SCHEDULE_EDIT";
export declare const SCHEDULE_DELETE = "SCHEDULE_DELETE";
export interface ScheduleAddAction extends Redux.Action {
    schedule: ISchedule;
}
export interface ScheduleEditAction extends Redux.Action {
    index: number;
    schedule: ISchedule;
}
export interface ScheduleDeleteAction extends Redux.Action {
    index: number;
    schedule: ISchedule;
}
export declare const ScheduleAdd: (schedule: ISchedule) => ScheduleAddAction;
export declare const ScheduleEdit: (index: number, schedule: ISchedule) => ScheduleEditAction;
export declare const ScheduleDelete: (index: number, schedule: ISchedule) => ScheduleDeleteAction;
export declare const ScheduleReducer: Redux.Reducer<ScheduleState>;
