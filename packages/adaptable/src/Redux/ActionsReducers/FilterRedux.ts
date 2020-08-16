import { FilterState } from '../../PredefinedConfig/FilterState';
import * as Redux from 'redux';
import { SystemFilterIdList } from '../../Utilities/Services/FilterService';

export const SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';

export interface SystemFilterSetAction extends Redux.Action {
  SystemFilters: string[];
}

export const SystemFilterSet = (SystemFilters: string[]): SystemFilterSetAction => ({
  type: SYSTEM_FILTER_SET,
  SystemFilters,
});

const initialFilterState: FilterState = {
  SystemFilters: SystemFilterIdList,
  UserFilters: [],
  ColumnFilters: [],
};

export const FilterReducer: Redux.Reducer<FilterState> = (
  state: FilterState = initialFilterState,
  action: Redux.Action
): FilterState => {
  switch (action.type) {
    case SYSTEM_FILTER_SET:
      return Object.assign({}, state, {
        SystemFilters: (action as SystemFilterSetAction).SystemFilters,
      });

    default:
      return state;
  }
};
