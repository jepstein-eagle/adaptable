import { ReminderState, ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const REMINDER_SCHEDULE_ADD = 'REMINDER_SCHEDULE_ADD';
export const REMINDER_SCHEDULE_EDIT = 'REMINDER_SCHEDULE_EDIT';
export const REMINDER_SCHEDULE_DELETE = 'REMINDER_SCHEDULE_DELETE';

export interface ReminderScheduleAction extends Redux.Action {
  reminderSchedule: ReminderSchedule;
}
export interface ReminderScheduleAddAction extends ReminderScheduleAction {}
export interface ReminderScheduleEditAction extends ReminderScheduleAction {}
export interface ReminderScheduleDeleteAction extends ReminderScheduleAction {}

export const ReminderScheduleAdd = (
  reminderSchedule: ReminderSchedule
): ReminderScheduleAddAction => ({
  type: REMINDER_SCHEDULE_ADD,
  reminderSchedule,
});

export const ReminderScheduleEdit = (
  reminderSchedule: ReminderSchedule
): ReminderScheduleEditAction => ({
  type: REMINDER_SCHEDULE_EDIT,
  reminderSchedule,
});
export const ReminderScheduleDelete = (
  reminderSchedule: ReminderSchedule
): ReminderScheduleDeleteAction => ({
  type: REMINDER_SCHEDULE_DELETE,
  reminderSchedule,
});

const initialReminderState: ReminderState = {
  Reminders: EMPTY_ARRAY,
};

export const ReminderReducer: Redux.Reducer<ReminderState> = (
  state: ReminderState = initialReminderState,
  action: Redux.Action
): ReminderState => {
  let reminderSchedules: ReminderSchedule[];

  switch (action.type) {
    case REMINDER_SCHEDULE_ADD: {
      const actionSchedule: ReminderSchedule = (action as ReminderScheduleAction).reminderSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      reminderSchedules = [].concat(state.Reminders);
      reminderSchedules.push(actionSchedule);
      return { ...state, Reminders: reminderSchedules };
    }
    case REMINDER_SCHEDULE_EDIT: {
      const actionSchedule: ReminderSchedule = (action as ReminderScheduleAction).reminderSchedule;
      return {
        ...state,
        Reminders: state.Reminders.map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case REMINDER_SCHEDULE_DELETE: {
      const actionSchedule: ReminderSchedule = (action as ReminderScheduleAction).reminderSchedule;
      return {
        ...state,
        Reminders: state.Reminders.filter(abObject => abObject.Uuid !== actionSchedule.Uuid),
      };
    }

    default:
      return state;
  }
};
