import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { NamedFilterState } from '../../PredefinedConfig/NamedFilterState';

export const NAMED_FILTER_SET = 'NAMED_FILTER_SET';

export interface NamedFilterSetAction extends Redux.Action {
  NamedFilters: string[];
}

export const NamedFilterSet = (NamedFilters: string[]): NamedFilterSetAction => ({
  type: NAMED_FILTER_SET,
  NamedFilters,
});

const initialFilterState: NamedFilterState = {
  NamedFilters: EMPTY_ARRAY,
};

export const NamedFilterReducer: Redux.Reducer<NamedFilterState> = (
  state: NamedFilterState = initialFilterState,
  action: Redux.Action
): NamedFilterState => {
  switch (action.type) {
    case NAMED_FILTER_SET:
      return Object.assign({}, state, {
        NamedFilters: (action as NamedFilterSetAction).NamedFilters,
      });

    default:
      return state;
  }
};
