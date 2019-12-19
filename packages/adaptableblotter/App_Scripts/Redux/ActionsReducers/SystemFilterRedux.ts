import { SystemFilterState } from '../../PredefinedConfig/SystemFilterState';
import * as Redux from 'redux';
import {
  BLANKS_SYSTEM_FILTER,
  NON_BLANKS_SYSTEM_FILTER,
  TODAY_SYSTEM_FILTER,
  IN_PAST_SYSTEM_FILTER,
  IN_FUTURE_SYSTEM_FILTER,
  YESTERDAY_SYSTEM_FILTER,
  TOMORROW_SYSTEM_FILTER,
  NEXT_WORKING_DAY_SYSTEM_FILTER,
  PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
  THIS_YEAR_SYSTEM_FILTER,
  POSITIVE_SYSTEM_FILTER,
  NEGATIVE_SYSTEM_FILTER,
  ZERO_SYSTEM_FILTER,
  TRUE_SYSTEM_FILTER,
  FALSE_SYSTEM_FILTER,
} from '../../Utilities/Services/FilterService';

export const SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';

export interface SystemFilterSetAction extends Redux.Action {
  SystemFilters: string[];
}

export const SystemFilterSet = (SystemFilters: string[]): SystemFilterSetAction => ({
  type: SYSTEM_FILTER_SET,
  SystemFilters,
});

const initialFilterState: SystemFilterState = {
  SystemFilters: [
    BLANKS_SYSTEM_FILTER,
    NON_BLANKS_SYSTEM_FILTER,
    TODAY_SYSTEM_FILTER,
    IN_PAST_SYSTEM_FILTER,
    IN_FUTURE_SYSTEM_FILTER,
    YESTERDAY_SYSTEM_FILTER,
    TOMORROW_SYSTEM_FILTER,
    NEXT_WORKING_DAY_SYSTEM_FILTER,
    PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
    THIS_YEAR_SYSTEM_FILTER,
    POSITIVE_SYSTEM_FILTER,
    NEGATIVE_SYSTEM_FILTER,
    ZERO_SYSTEM_FILTER,
    TRUE_SYSTEM_FILTER,
    FALSE_SYSTEM_FILTER,
  ],
};

export const SystemFilterReducer: Redux.Reducer<SystemFilterState> = (
  state: SystemFilterState = initialFilterState,
  action: Redux.Action
): SystemFilterState => {
  switch (action.type) {
    case SYSTEM_FILTER_SET:
      return Object.assign({}, state, {
        SystemFilters: (action as SystemFilterSetAction).SystemFilters,
      });

    default:
      return state;
  }
};
