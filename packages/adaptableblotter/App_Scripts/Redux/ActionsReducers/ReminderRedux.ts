import { ReminderState, Reminder } from '../../PredefinedConfig/IUserState/ReminderState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const REMINDER_ADD = 'REMINDER_ADD';
export const REMINDER_EDIT = 'REMINDER_EDIT';
export const REMINDER_DELETE = 'REMINDER_DELETE';

export interface ReminderAction extends Redux.Action {
  reminder: Reminder;
}

export interface ReminderAddAction extends ReminderAction {}

export interface ReminderEditAction extends ReminderAction {}

export interface ReminderDeleteAction extends ReminderAction {}

export const ReminderAdd = (reminder: Reminder): ReminderAddAction => ({
  type: REMINDER_ADD,
  reminder,
});

export const ReminderEdit = (reminder: Reminder): ReminderEditAction => ({
  type: REMINDER_EDIT,
  reminder,
});
export const ReminderDelete = (reminder: Reminder): ReminderDeleteAction => ({
  type: REMINDER_DELETE,
  reminder,
});

const initialReminderState: ReminderState = {
  Reminders: EMPTY_ARRAY,
};

export const ReminderReducer: Redux.Reducer<ReminderState> = (
  state: ReminderState = initialReminderState,
  action: Redux.Action
): ReminderState => {
  let reminders: Reminder[];

  switch (action.type) {
    case REMINDER_ADD: {
      const actionReminder: Reminder = (action as ReminderAction).reminder;

      if (!actionReminder.Uuid) {
        actionReminder.Uuid = createUuid();
      }
      reminders = [].concat(state.Reminders);
      reminders.push(actionReminder);
      return { ...state, Reminders: reminders };
    }

    case REMINDER_EDIT: {
      const actionReminder: Reminder = (action as ReminderAction).reminder;
      return {
        ...state,
        Reminders: state.Reminders.map(abObject =>
          abObject.Uuid === actionReminder.Uuid ? actionReminder : abObject
        ),
      };
    }
    case REMINDER_DELETE: {
      const actionReminder: Reminder = (action as ReminderAction).reminder;
      return {
        ...state,
        Reminders: state.Reminders.filter(abObject => abObject.Uuid !== actionReminder.Uuid),
      };
    }

    default:
      return state;
  }
};
