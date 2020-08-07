import * as Redux from 'redux';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const ADVANCED_SEARCH_ADD = 'ADVANCED_SEARCH_ADD';
export const ADVANCED_SEARCH_EDIT = 'ADVANCED_SEARCH_EDIT';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_CHANGE = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAction extends Redux.Action {
  advancedSearch: AdvancedSearch;
}
export interface AdvancedSearchAddAction extends AdvancedSearchAction {}

export interface AdvancedSearchEditAction extends AdvancedSearchAddAction {}

export interface AdvancedSearchDeleteAction extends AdvancedSearchAddAction {}

export interface AdvancedSearchChangeAction extends Redux.Action {
  expression: string;
}

export const AdvancedSearchAdd = (advancedSearch: AdvancedSearch): AdvancedSearchAddAction => ({
  type: ADVANCED_SEARCH_ADD,
  advancedSearch,
});

export const AdvancedSearchEdit = (advancedSearch: AdvancedSearch): AdvancedSearchEditAction => ({
  type: ADVANCED_SEARCH_EDIT,
  advancedSearch,
});

export const AdvancedSearchDelete = (
  advancedSearch: AdvancedSearch
): AdvancedSearchDeleteAction => ({
  type: ADVANCED_SEARCH_DELETE,
  advancedSearch,
});

export const AdvancedSearchChange = (expression: string): AdvancedSearchChangeAction => ({
  type: ADVANCED_SEARCH_CHANGE,
  expression,
});

const initialAdvancedSearchState: AdvancedSearchState = {
  AdvancedSearches: EMPTY_ARRAY,
  CurrentAdvancedSearch: EMPTY_STRING,
};

export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (
  state: AdvancedSearchState = initialAdvancedSearchState,
  action: Redux.Action
): AdvancedSearchState => {
  switch (action.type) {
    case ADVANCED_SEARCH_ADD: {
      const actionAdvancedSearch = (action as AdvancedSearchAddAction).advancedSearch;
      if (!actionAdvancedSearch.Uuid) {
        actionAdvancedSearch.Uuid = createUuid();
      }
      return { ...state, AdvancedSearches: [...state.AdvancedSearches, actionAdvancedSearch] };
    }

    case ADVANCED_SEARCH_EDIT: {
      const actionAdvancedSearch = (action as AdvancedSearchEditAction).advancedSearch;
      return {
        ...state,
        AdvancedSearches: state.AdvancedSearches.map(abObject =>
          abObject.Uuid === actionAdvancedSearch.Uuid ? actionAdvancedSearch : abObject
        ),
      };
    }
    case ADVANCED_SEARCH_DELETE: {
      const actionAdvancedSearch = (action as AdvancedSearchEditAction).advancedSearch;
      const currentActiveSearch: AdvancedSearch = state.AdvancedSearches.filter(
        s => s.Name === state.CurrentAdvancedSearch
      )[0];

      const currentAdvancedSearchName: string = currentActiveSearch
        ? currentActiveSearch.Name
        : EMPTY_STRING;

      return {
        ...state,
        AdvancedSearches: state.AdvancedSearches.filter(
          abObject => abObject.Uuid !== actionAdvancedSearch.Uuid
        ),

        CurrentAdvancedSearch:
          currentActiveSearch && currentActiveSearch.Uuid === actionAdvancedSearch.Uuid
            ? EMPTY_STRING
            : currentAdvancedSearchName,
      };
    }
    case ADVANCED_SEARCH_CHANGE:
      return Object.assign({}, state, {
        CurrentAdvancedSearch: (action as AdvancedSearchChangeAction).expression,
      });

    default:
      return state;
  }
};
