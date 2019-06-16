import { CalendarState } from '../../PredefinedConfig/IUserState Interfaces/CalendarState';
import * as Redux from 'redux';
import { CALENDAR_DEFAULT_CURRENT_CALENDER } from '../../Utilities/Constants/GeneralConstants';

export const CALENDAR_SELECT = 'CALENDAR_SELECT';

export interface CalendarSelectAction extends Redux.Action {
  selectedCalendarName: string;
}

export const CalendarSelect = (selectedCalendarName: string): CalendarSelectAction => ({
  type: CALENDAR_SELECT,
  selectedCalendarName,
});

const initialCalendarState: CalendarState = {
  CurrentCalendar: CALENDAR_DEFAULT_CURRENT_CALENDER,
};

export const CalendarReducer: Redux.Reducer<CalendarState> = (
  state: CalendarState = initialCalendarState,
  action: Redux.Action
): CalendarState => {
  switch (action.type) {
    case CALENDAR_SELECT:
      return Object.assign({}, state, {
        CurrentCalendar: (<CalendarSelectAction>action).selectedCalendarName,
      });
    default:
      return state;
  }
};
