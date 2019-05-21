import * as Redux from 'redux';
import { AdvancedSearchState } from './Interface/IState';
import { IAdvancedSearch } from '../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const ADVANCED_SEARCH_ADD = 'ADVANCED_SEARCH_ADD';
export const ADVANCED_SEARCH_EDIT = 'ADVANCED_SEARCH_EDIT';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAddAction extends Redux.Action {
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchEditAction extends AdvancedSearchAddAction {}

export interface AdvancedSearchDeleteAction extends AdvancedSearchAddAction {}

export interface AdvancedSearchSelectAction extends Redux.Action {
  selectedSearchName: string;
}

export const AdvancedSearchAdd = (advancedSearch: IAdvancedSearch): AdvancedSearchAddAction => ({
  type: ADVANCED_SEARCH_ADD,
  advancedSearch,
});

export const AdvancedSearchEdit = (advancedSearch: IAdvancedSearch): AdvancedSearchEditAction => ({
  type: ADVANCED_SEARCH_EDIT,
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
  switch (action.type) {
    case ADVANCED_SEARCH_ADD: {
      const actionConditionalStyle = (action as AdvancedSearchAddAction).advancedSearch;
      if (!actionConditionalStyle.Uuid) {
        actionConditionalStyle.Uuid = createUuid();
      }
      return { ...state, AdvancedSearches: [...state.AdvancedSearches, actionConditionalStyle] };
    }

    case ADVANCED_SEARCH_EDIT: {
      const actionAdvancedSearch = (action as AdvancedSearchEditAction).advancedSearch;

      return {
        ...state,
        AdvancedSearches: state.AdvancedSearches.map(s =>
          s.Uuid === actionAdvancedSearch.Uuid ? actionAdvancedSearch : s
        ),
      };
    }
    case ADVANCED_SEARCH_DELETE: {
      const actionAdvancedSearch = (action as AdvancedSearchEditAction).advancedSearch;

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
