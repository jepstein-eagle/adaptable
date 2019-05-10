import { AdvancedSearchState } from './Interface/IState';
import * as Redux from 'redux';
import { IAdvancedSearch } from '../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

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
  let index: number;
  let advancedSearches: IAdvancedSearch[];

  switch (action.type) {
    case ADVANCED_SEARCH_ADD_UPDATE:
      let actionTypedAddUpdate = <AdvancedSearchAddUpdateAction>action;
      advancedSearches = [].concat(state.AdvancedSearches);
      if (actionTypedAddUpdate.index != -1) {
        // it exists
        advancedSearches[actionTypedAddUpdate.index] = actionTypedAddUpdate.advancedSearch;
      } else {
        advancedSearches.push(actionTypedAddUpdate.advancedSearch);
      }
      return Object.assign({}, state, { AdvancedSearches: advancedSearches }); //, CurrentAdvancedSearch: currentSearchName })

    case ADVANCED_SEARCH_DELETE:
      let actionTypedDelete = <AdvancedSearchDeleteAction>action;
      advancedSearches = [].concat(state.AdvancedSearches);
      index = advancedSearches.findIndex(a => a.Name == actionTypedDelete.advancedSearch.Name);
      advancedSearches.splice(index, 1);
      return Object.assign({}, state, {
        AdvancedSearches: advancedSearches,
        CurrentAdvancedSearch: EMPTY_STRING,
      });

    case ADVANCED_SEARCH_SELECT:
      return Object.assign({}, state, {
        CurrentAdvancedSearch: (<AdvancedSearchSelectAction>action).selectedSearchName,
      });

    default:
      return state;
  }
};
