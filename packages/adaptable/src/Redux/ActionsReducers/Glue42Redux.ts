import * as Redux from 'redux';
import { Glue42State, Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const GLUE42_SET_THROTTLE_TIME = 'GLUE42_SET_THROTTLE_TIME';

export const GLUE42_SEND_SNAPSHOT = 'GLUE42_SEND_SNAPSHOT';

export const SET_GLUE42_AVAILABLE_ON = 'SET_GLUE42_AVAILABLE_ON';
export const SET_GLUE42_AVAILABLE_OFF = 'SET_GLUE42_AVAILABLE_OFF';

export const GLUE42_SCHEDULE_ADD = 'GLUE42_SCHEDULE_ADD';
export const GLUE42_SCHEDULE_EDIT = 'GLUE42_SCHEDULE_EDIT';
export const GLUE42_SCHEDULE_DELETE = 'GLUE42_SCHEDULE_DELETE';

export interface Glue42SetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface Glue42SendSnapshotAction extends Redux.Action {
  glue42Report: Glue42Report;
}

export interface SetGlue42AvailableOnAction extends Redux.Action {}

export interface SetGlue42AvailableOffAction extends Redux.Action {}

export interface Glue42ScheduleAction extends Redux.Action {
  glue42Schedule: Glue42Schedule;
}
export interface Glue42ScheduleAddAction extends Glue42ScheduleAction {}
export interface Glue42ScheduleEditAction extends Glue42ScheduleAction {}
export interface Glue42ScheduleDeleteAction extends Glue42ScheduleAction {}

export const Glue42SetThrottleTime = (throttleTime: number): Glue42SetThrottleTimeAction => ({
  type: GLUE42_SET_THROTTLE_TIME,
  throttleTime,
});

export const Glue42SendSnapshot = (glue42Report: Glue42Report): Glue42SendSnapshotAction => ({
  type: GLUE42_SEND_SNAPSHOT,
  glue42Report,
});

export const SetGlue42AvailableOn = (): SetGlue42AvailableOnAction => ({
  type: SET_GLUE42_AVAILABLE_ON,
});

export const SetGlue42AvailableOff = (): SetGlue42AvailableOffAction => ({
  type: SET_GLUE42_AVAILABLE_OFF,
});

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

const initialFilterState: Glue42State = {
  // Glue42: undefined,
  Glue42Schedules: EMPTY_ARRAY,
  IsGlue42Available: false,
};

export const Glue42Reducer: Redux.Reducer<Glue42State> = (
  state: Glue42State = initialFilterState,
  action: Redux.Action
): Glue42State => {
  let Glue42Schedules: Glue42Schedule[];
  switch (action.type) {
    case GLUE42_SET_THROTTLE_TIME: {
      const atctionType = action as Glue42SetThrottleTimeAction;
      return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
    }
    case SET_GLUE42_AVAILABLE_ON:
      return Object.assign({}, state, { IsGlue42Available: true });
    case SET_GLUE42_AVAILABLE_OFF:
      return Object.assign({}, state, { IsGlue42Available: false });

    case GLUE42_SCHEDULE_ADD: {
      const actionSchedule: Glue42Schedule = (action as Glue42ScheduleAction).glue42Schedule;

      if (!actionSchedule.Uuid) {
        actionSchedule.Uuid = createUuid();
      }
      Glue42Schedules = [].concat(state.Glue42Schedules);
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
    default:
      return state;
  }
};
