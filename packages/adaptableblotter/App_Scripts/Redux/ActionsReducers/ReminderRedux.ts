import { ReminderState } from './Interface/IState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { IReminder } from '../../Utilities/Interface/BlotterObjects/IReminder';

export const REMINDER_ADD = 'REMINDER_ADD';
export const REMINDER_EDIT = 'REMINDER_EDIT';
export const REMINDER_DELETE = 'REMINDER_DELETE';

export interface ReminderAddAction extends Redux.Action {
  Reminder: IReminder;
}

export interface ReminderEditAction extends Redux.Action {
  index: number;
  Reminder: IReminder;
}

export interface ReminderDeleteAction extends Redux.Action {
  index: number;
  Reminder: IReminder;
}

export const ReminderAdd = (Reminder: IReminder): ReminderAddAction => ({
  type: REMINDER_ADD,
  Reminder,
});

export const ReminderEdit = (index: number, Reminder: IReminder): ReminderEditAction => ({
  type: REMINDER_EDIT,
  index,
  Reminder,
});
export const ReminderDelete = (index: number, Reminder: IReminder): ReminderDeleteAction => ({
  type: REMINDER_DELETE,
  index,
  Reminder,
});

const initialReminderState: ReminderState = {
  Reminders: EMPTY_ARRAY,
};

export const ReminderReducer: Redux.Reducer<ReminderState> = (
  state: ReminderState = initialReminderState,
  action: Redux.Action
): ReminderState => {
  let Reminders: IReminder[];

  switch (action.type) {
    case REMINDER_ADD:
      Reminders = [].concat(state.Reminders);
      Reminders.push((<ReminderAddAction>action).Reminder);
      return Object.assign({}, state, { Reminders: Reminders });

    case REMINDER_EDIT: {
      Reminders = [].concat(state.Reminders);
      let actionTyped = <ReminderEditAction>action;
      Reminders[actionTyped.index] = (<ReminderAddAction>action).Reminder;
      return Object.assign({}, state, { Reminders: Reminders });
    }
    case REMINDER_DELETE:
      Reminders = [].concat(state.Reminders);
      Reminders.splice((<ReminderDeleteAction>action).index, 1);
      return Object.assign({}, state, { Reminders: Reminders });

    default:
      return state;
  }
};
