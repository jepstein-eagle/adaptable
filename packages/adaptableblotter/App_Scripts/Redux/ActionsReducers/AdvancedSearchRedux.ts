import * as Redux from 'redux';
import { AdvancedSearchState } from './Interface/IState';
import { IAdvancedSearch } from '../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const ADVANCED_SEARCH_ADD_UPDATE = 'ADVANCED_SEARCH_ADD_UPDATE';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAddUpdateAction extends Redux.Action {
  index: number;
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchDeleteAction extends Redux.Action {
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchSelectAction extends Redux.Action {
  selectedSearchName: string;
}

export const AdvancedSearchAddUpdate = (
  index: number,
  advancedSearch: IAdvancedSearch
): AdvancedSearchAddUpdateAction => ({
  type: ADVANCED_SEARCH_ADD_UPDATE,
  index,
  advancedSearch,
});

export const AdvancedSearchDelete = (
  advancedSearch: IAdvancedSearch
): AdvancedSearchDeleteAction => ({
  type: ADVANCED_SEARCH_DELETE,
  advancedSearch,
});

export const AdvancedSearchSelect = (selectedSearchName: string): AdvancedSearchSelectAction => ({
  type: ADVANCED_SEARCH_SELECT,
  selectedSearchName,
});

const initialAdvancedSearchState: AdvancedSearchState = {
  AdvancedSearches: EMPTY_ARRAY,
  CurrentAdvancedSearch: EMPTY_STRING,
};

export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (
  state: AdvancedSearchState = initialAdvancedSearchState,
  action: Redux.Action
): AdvancedSearchState => {
  let advancedSearches: IAdvancedSearch[];

  switch (action.type) {
    case ADVANCED_SEARCH_ADD_UPDATE: {
      const actionAdvancedSearch = (action as AdvancedSearchAddUpdateAction).advancedSearch;

      if (actionAdvancedSearch.Uuid) {
        let isUpdate: boolean = false;

        advancedSearches = state.AdvancedSearches.map(s => {
          const found = s.Uuid === actionAdvancedSearch.Uuid;
          if (found) {
            isUpdate = true;
          }
          return found ? actionAdvancedSearch : s;
        });
        if (!isUpdate) {
          advancedSearches.push(actionAdvancedSearch);
        }
      } else {
        actionAdvancedSearch.Uuid = createUuid();
        advancedSearches = [...state.AdvancedSearches, actionAdvancedSearch];
      }
      return { ...state, AdvancedSearches: advancedSearches };
    }
    case ADVANCED_SEARCH_DELETE: {
      const actionAdvancedSearch = (action as AdvancedSearchDeleteAction).advancedSearch;

      const currentActiveSearch: IAdvancedSearch = state.AdvancedSearches.filter(
        s => s.Name === state.CurrentAdvancedSearch
      )[0];

      return {
        ...state,
        AdvancedSearches: state.AdvancedSearches.filter(s => s.Uuid !== actionAdvancedSearch.Uuid),
        CurrentAdvancedSearch:
          currentActiveSearch && currentActiveSearch.Uuid === actionAdvancedSearch.Uuid
            ? EMPTY_STRING
            : currentActiveSearch.Name,
      };
    }
    case ADVANCED_SEARCH_SELECT:
      return Object.assign({}, state, {
        CurrentAdvancedSearch: (<AdvancedSearchSelectAction>action).selectedSearchName,
      });

    default:
      return state;
  }
};
