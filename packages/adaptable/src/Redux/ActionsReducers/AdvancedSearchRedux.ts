import * as Redux from 'redux';
import { AdvancedSearchState } from '../../PredefinedConfig/AdvancedSearchState';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid, TypeUuid } from '../../PredefinedConfig/Uuid';

export const ADVANCED_SEARCH_CHANGE = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchChangeAction extends Redux.Action {
  query: string | TypeUuid;
}

export const AdvancedSearchChange = (query: string | TypeUuid): AdvancedSearchChangeAction => ({
  type: ADVANCED_SEARCH_CHANGE,
  query,
});

const initialAdvancedSearchState: AdvancedSearchState = {
  CurrentAdvancedSearch: EMPTY_STRING,
};

export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (
  state: AdvancedSearchState = initialAdvancedSearchState,
  action: Redux.Action
): AdvancedSearchState => {
  switch (action.type) {
    case ADVANCED_SEARCH_CHANGE:
      return Object.assign({}, state, {
        CurrentAdvancedSearch: (action as AdvancedSearchChangeAction).query,
      });

    default:
      return state;
  }
};
