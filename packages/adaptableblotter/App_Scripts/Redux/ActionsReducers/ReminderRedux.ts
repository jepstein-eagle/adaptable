import { ReminderState } from './Interface/IState';
import * as Redux from 'redux'
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { IReminder } from '../../Utilities/Interface/BlotterObjects/IReminder';


export const Reminder_ADD = 'Reminder_ADD';
export const Reminder_EDIT = 'Reminder_EDIT';
export const Reminder_DELETE = 'Reminder_DELETE';

export interface ReminderAddAction extends Redux.Action {
    Reminder: IReminder
}

export interface ReminderEditAction extends Redux.Action {
    index: number,
    Reminder: IReminder
}

export interface ReminderDeleteAction extends Redux.Action {
    index: number
}

export const ReminderAdd = (Reminder: IReminder): ReminderAddAction => ({
    type: Reminder_ADD,
    Reminder
})

export const ReminderEdit = (index: number, Reminder: IReminder): ReminderEditAction => ({
    type: Reminder_EDIT,
    index,
    Reminder
})
export const ReminderDelete = (index: number): ReminderDeleteAction => ({
    type: Reminder_DELETE,
    index
})


const initialReminderState: ReminderState = {
    Reminders: EMPTY_ARRAY
}


export const ReminderReducer: Redux.Reducer<ReminderState> = (state: ReminderState = initialReminderState, action: Redux.Action): ReminderState => {

    let Reminders: IReminder[]

    switch (action.type) {

        case Reminder_ADD:
            Reminders = [].concat(state.Reminders);
            Reminders.push((<ReminderAddAction>action).Reminder);
            return Object.assign({}, state, { Reminders: Reminders });

        case Reminder_EDIT: {
            Reminders = [].concat(state.Reminders);
            let actionTyped = (<ReminderEditAction>action)
            Reminders[actionTyped.index] = (<ReminderAddAction>action).Reminder;
            return Object.assign({}, state, { Reminders: Reminders });
        }
        case Reminder_DELETE:
            Reminders = [].concat(state.Reminders);
            Reminders.splice((<ReminderDeleteAction>action).index, 1)
            return Object.assign({}, state, { Reminders: Reminders });

        default:
            return state
    }

}