import { ReminderState } from './Interface/IState';
import * as Redux from 'redux';
import { IReminder } from '../../Utilities/Interface/BlotterObjects/IReminder';
export declare const Reminder_ADD = "Reminder_ADD";
export declare const Reminder_EDIT = "Reminder_EDIT";
export declare const Reminder_DELETE = "Reminder_DELETE";
export interface ReminderAddAction extends Redux.Action {
    Reminder: IReminder;
}
export interface ReminderEditAction extends Redux.Action {
    index: number;
    Reminder: IReminder;
}
export interface ReminderDeleteAction extends Redux.Action {
    index: number;
}
export declare const ReminderAdd: (Reminder: IReminder) => ReminderAddAction;
export declare const ReminderEdit: (index: number, Reminder: IReminder) => ReminderEditAction;
export declare const ReminderDelete: (index: number) => ReminderDeleteAction;
export declare const ReminderReducer: Redux.Reducer<ReminderState>;
