import { AdvancedSearchState } from './Interface/IState';
import * as Redux from 'redux';
import { IAdvancedSearch } from '../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const ADVANCED_SEARCH_ADD = 'ADVANCED_SEARCH_ADD';
export const ADVANCED_SEARCH_EDIT = 'ADVANCED_SEARCH_EDIT';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAddAction extends Redux.Action {
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchEditAction extends Redux.Action {
  index: number;
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchDeleteAction extends Redux.Action {
  advancedSearch: IAdvancedSearch;
}

export interface AdvancedSearchSelectAction extends Redux.Action {
  selectedSearchName: string;
}

export const AdvancedSearchAdd = (advancedSearch: IAdvancedSearch): AdvancedSearchAddAction => ({
  type: ADVANCED_SEARCH_ADD,
  advancedSearch,
});

export const AdvancedSearchEdit = (
  index: number,
  advancedSearch: IAdvancedSearch
): AdvancedSearchEditAction => ({
  type: ADVANCED_SEARCH_EDIT,
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
    case ADVANCED_SEARCH_ADD:
      let actionTypedAdd = <AdvancedSearchAddAction>action;
      advancedSearches = [].concat(state.AdvancedSearches);
      advancedSearches.push(actionTypedAdd.advancedSearch);
      return Object.assign({}, state, { AdvancedSearches: advancedSearches });

    case ADVANCED_SEARCH_EDIT:
      let actionTypedEdit = <AdvancedSearchEditAction>action;
      advancedSearches = [].concat(state.AdvancedSearches);
      advancedSearches[actionTypedEdit.index] = actionTypedEdit.advancedSearch;
      return Object.assign({}, state, { AdvancedSearches: advancedSearches });

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
