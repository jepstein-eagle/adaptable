import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { ScheduleState } from '../../PredefinedConfig/ScheduleState';
import { ReminderSchedule, ReportSchedule } from '../../types';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { OpenFinSchedule } from '../../PredefinedConfig/OpenFinState';

export const REPORT_SCHEDULE_ADD = 'REPORT_SCHEDULE_ADD';
export const REPORT_SCHEDULE_EDIT = 'REPORT_SCHEDULE_EDIT';
export const REPORT_SCHEDULE_DELETE = 'REPORT_SCHEDULE_DELETE';

export const REMINDER_SCHEDULE_ADD = 'REMINDER_SCHEDULE_ADD';
export const REMINDER_SCHEDULE_EDIT = 'REMINDER_SCHEDULE_EDIT';
export const REMINDER_SCHEDULE_DELETE = 'REMINDER_SCHEDULE_DELETE';

export const IPUSHPULL_SCHEDULE_ADD = 'IPUSHPULL_SCHEDULE_ADD';
export const IPUSHPULL_SCHEDULE_EDIT = 'IPUSHPULL_SCHEDULE_EDIT';
export const IPUSHPULL_SCHEDULE_DELETE = 'IPUSHPULL_SCHEDULE_DELETE';

export const GLUE42_SCHEDULE_ADD = 'GLUE42_SCHEDULE_ADD';
export const GLUE42_SCHEDULE_EDIT = 'GLUE42_SCHEDULE_EDIT';
export const GLUE42_SCHEDULE_DELETE = 'GLUE42_SCHEDULE_DELETE';

export const OPENFIN_SCHEDULE_ADD = 'OPENFIN_SCHEDULE_ADD';
export const OPENFIN_SCHEDULE_EDIT = 'OPENFIN_SCHEDULE_EDIT';
export const OPENFIN_SCHEDULE_DELETE = 'OPENFIN_SCHEDULE_DELETE';

export interface Glue42ScheduleAction extends Redux.Action {
  glue42Schedule: Glue42Schedule;
}
export interface Glue42ScheduleAddAction extends Glue42ScheduleAction {}
export interface Glue42ScheduleEditAction extends Glue42ScheduleAction {}
export interface Glue42ScheduleDeleteAction extends Glue42ScheduleAction {}

export const Glue42ScheduleAdd = (glue42Schedule: Glue42Schedule): Glue42ScheduleAddAction => ({
  type: GLUE42_SCHEDULE_ADD,
  glue42Schedule,
});

export const Glue42ScheduleEdit = (glue42Schedule: Glue42Schedule): Glue42ScheduleEditAction => ({
  type: GLUE42_SCHEDULE_EDIT,
  glue42Schedule,
});
export const Glue42ScheduleDelete = (
  glue42Schedule: Glue42Schedule
): Glue42ScheduleDeleteAction => ({
  type: GLUE42_SCHEDULE_DELETE,
  glue42Schedule,
});

export interface OpenFinScheduleAction extends Redux.Action {
  openFinSchedule: OpenFinSchedule;
}
export interface OpenFinScheduleAddAction extends OpenFinScheduleAction {}
export interface OpenFinScheduleEditAction extends OpenFinScheduleAction {}
export interface OpenFinScheduleDeleteAction extends OpenFinScheduleAction {}

export const OpenFinScheduleAdd = (openFinSchedule: OpenFinSchedule): OpenFinScheduleAddAction => ({
  type: OPENFIN_SCHEDULE_ADD,
  openFinSchedule,
});

export const OpenFinScheduleEdit = (
  openFinSchedule: OpenFinSchedule
): OpenFinScheduleEditAction => ({
  type: OPENFIN_SCHEDULE_EDIT,
  openFinSchedule,
});
export const OpenFinScheduleDelete = (
  openFinSchedule: OpenFinSchedule
): OpenFinScheduleDeleteAction => ({
  type: OPENFIN_SCHEDULE_DELETE,
  openFinSchedule,
});

export interface IPushPullScheduleAction extends Redux.Action {
  iPushPullSchedule: IPushPullSchedule;
}
export interface IPushPullScheduleAddAction extends IPushPullScheduleAction {}
export interface IPushPullScheduleEditAction extends IPushPullScheduleAction {}
export interface IPushPullScheduleDeleteAction extends IPushPullScheduleAction {}

export interface ReminderScheduleAction extends Redux.Action {
  reminderSchedule: ReminderSchedule;
}
export interface ReminderScheduleAddAction extends ReminderScheduleAction {}
export interface ReminderScheduleEditAction extends ReminderScheduleAction {}
export interface ReminderScheduleDeleteAction extends ReminderScheduleAction {}

export interface ReportScheduleAction extends Redux.Action {
  reportSchedule: ReportSchedule;
}
export interface ReportScheduleAddAction extends ReportScheduleAction {}
export interface ReportScheduleEditAction extends ReportScheduleAction {}
export interface ReportScheduleDeleteAction extends ReportScheduleAction {}

// Report
export const ReportScheduleAdd = (reportSchedule: ReportSchedule): ReportScheduleAddAction => ({
  type: REPORT_SCHEDULE_ADD,
  reportSchedule,
});

export const ReportScheduleEdit = (reportSchedule: ReportSchedule): ReportScheduleEditAction => ({
  type: REPORT_SCHEDULE_EDIT,
  reportSchedule,
});
export const ReportScheduleDelete = (
  reportSchedule: ReportSchedule
): ReportScheduleDeleteAction => ({
  type: REPORT_SCHEDULE_DELETE,
  reportSchedule,
});

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

export const IPushPullScheduleAdd = (
  iPushPullSchedule: IPushPullSchedule
): IPushPullScheduleAddAction => ({
  type: IPUSHPULL_SCHEDULE_ADD,
  iPushPullSchedule,
});

export const IPushPullScheduleEdit = (
  iPushPullSchedule: IPushPullSchedule
): IPushPullScheduleEditAction => ({
  type: IPUSHPULL_SCHEDULE_EDIT,
  iPushPullSchedule,
});
export const IPushPullScheduleDelete = (
  iPushPullSchedule: IPushPullSchedule
): IPushPullScheduleDeleteAction => ({
  type: IPUSHPULL_SCHEDULE_DELETE,
  iPushPullSchedule,
});

const initialScheduleState: ScheduleState = {
  ReportSchedules: EMPTY_ARRAY,
  Reminders: EMPTY_ARRAY,
  IPushPullSchedules: EMPTY_ARRAY,
  OpenFinSchedules: EMPTY_ARRAY,
};

export const ScheduleReducer: Redux.Reducer<ScheduleState> = (
  state: ScheduleState = initialScheduleState,
  action: Redux.Action
): ScheduleState => {
  switch (action.type) {
    case GLUE42_SCHEDULE_ADD: {
      const actionSchedule: Glue42Schedule = (action as Glue42ScheduleAction).glue42Schedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      const Glue42Schedules = [].concat(state.Glue42Schedules);
      Glue42Schedules.push(actionSchedule);
      return { ...state, Glue42Schedules: Glue42Schedules };
    }
    case GLUE42_SCHEDULE_EDIT: {
      const actionSchedule: Glue42Schedule = (action as Glue42ScheduleAction).glue42Schedule;
      return {
        ...state,
        Glue42Schedules: state.Glue42Schedules.map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case GLUE42_SCHEDULE_DELETE: {
      const actionSchedule: Glue42Schedule = (action as Glue42ScheduleAction).glue42Schedule;
      return {
        ...state,
        Glue42Schedules: state.Glue42Schedules.filter(
          abObject => abObject.Uuid !== actionSchedule.Uuid
        ),
      };
    }

    case OPENFIN_SCHEDULE_ADD: {
      const actionSchedule: OpenFinSchedule = (action as OpenFinScheduleAction).openFinSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      const OpenFinSchedules = [].concat(state.OpenFinSchedules);
      OpenFinSchedules.push(actionSchedule);
      return { ...state, OpenFinSchedules: OpenFinSchedules };
    }
    case OPENFIN_SCHEDULE_EDIT: {
      const actionSchedule: OpenFinSchedule = (action as OpenFinScheduleAction).openFinSchedule;
      return {
        ...state,
        OpenFinSchedules: state.OpenFinSchedules.map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case OPENFIN_SCHEDULE_DELETE: {
      const actionSchedule: OpenFinSchedule = (action as OpenFinScheduleAction).openFinSchedule;
      return {
        ...state,
        OpenFinSchedules: state.OpenFinSchedules.filter(
          abObject => abObject.Uuid !== actionSchedule.Uuid
        ),
      };
    }
    case REPORT_SCHEDULE_ADD: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      const reportSchedules = [].concat(state.ReportSchedules);
      reportSchedules.push(actionSchedule);
      return { ...state, ReportSchedules: reportSchedules };
    }
    case REPORT_SCHEDULE_EDIT: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;
      return {
        ...state,
        ReportSchedules: state.ReportSchedules.map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case REPORT_SCHEDULE_DELETE: {
      const actionSchedule: ReportSchedule = (action as ReportScheduleAction).reportSchedule;
      return {
        ...state,
        ReportSchedules: state.ReportSchedules.filter(
          abObject => abObject.Uuid !== actionSchedule.Uuid
        ),
      };
    }
    case REMINDER_SCHEDULE_ADD: {
      const actionSchedule: ReminderSchedule = (action as ReminderScheduleAction).reminderSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      const reminderSchedules = [].concat(state.Reminders);
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
    case IPUSHPULL_SCHEDULE_ADD: {
      const actionSchedule: IPushPullSchedule = (action as IPushPullScheduleAction)
        .iPushPullSchedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      const iPushPullSchedules = state.IPushPullSchedules ? [...state.IPushPullSchedules] : [];
      iPushPullSchedules.push(actionSchedule);
      return { ...state, IPushPullSchedules: iPushPullSchedules };
    }
    case IPUSHPULL_SCHEDULE_EDIT: {
      const actionSchedule: IPushPullSchedule = (action as IPushPullScheduleAction)
        .iPushPullSchedule;
      return {
        ...state,
        IPushPullSchedules: (state.IPushPullSchedules || []).map(abObject =>
          abObject.Uuid === actionSchedule.Uuid ? actionSchedule : abObject
        ),
      };
    }
    case IPUSHPULL_SCHEDULE_DELETE: {
      const actionSchedule: IPushPullSchedule = (action as IPushPullScheduleAction)
        .iPushPullSchedule;
      return {
        ...state,
        IPushPullSchedules: (state.IPushPullSchedules || []).filter(
          abObject => abObject.Uuid !== actionSchedule.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
