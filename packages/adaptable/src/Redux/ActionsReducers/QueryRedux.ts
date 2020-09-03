import { QueryState, SharedQuery } from '../../PredefinedConfig/QueryState';
import * as Redux from 'redux';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid, TypeUuid } from '../../PredefinedConfig/Uuid';

export const SHARED_QUERY_ADD = 'SHARED_QUERY_ADD';
export const SHARED_QUERY_EDIT = 'SHARED_QUERY_EDIT';
export const SHARED_QUERY_DELETE = 'SHARED_QUERY_DELETE';
export const CURRENT_QUERY_CHANGE = 'CURRENT_QUERY_CHANGE';

export interface SharedQueryAction extends Redux.Action {
  sharedQuery: SharedQuery;
}

export interface SharedQueryAddAction extends SharedQueryAction {}

export interface SharedQueryEditAction extends SharedQueryAction {}

export interface SharedQueryDeleteAction extends SharedQueryAction {}

export interface CurrentQueryChangeAction extends Redux.Action {
  query: string | TypeUuid;
}

export const SharedQueryAdd = (sharedQuery: SharedQuery): SharedQueryAddAction => ({
  type: SHARED_QUERY_ADD,
  sharedQuery,
});

export const SharedQueryEdit = (sharedQuery: SharedQuery): SharedQueryEditAction => ({
  type: SHARED_QUERY_EDIT,
  sharedQuery,
});

export const SharedQueryDelete = (sharedQuery: SharedQuery): SharedQueryDeleteAction => ({
  type: SHARED_QUERY_DELETE,
  sharedQuery,
});

export const CurrentQueryChange = (query: string | TypeUuid): CurrentQueryChangeAction => ({
  type: CURRENT_QUERY_CHANGE,
  query,
});

const initialSharedQueryState: QueryState = {
  SharedQueries: EMPTY_ARRAY,
  CurrentQuery: EMPTY_STRING,
};

export const QueryReducer: Redux.Reducer<QueryState> = (
  state: QueryState = initialSharedQueryState,
  action: Redux.Action
): QueryState => {
  let sharedQuerys: SharedQuery[];

  switch (action.type) {
    case SHARED_QUERY_ADD: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;

      if (!actionSharedQuery.Uuid) {
        actionSharedQuery.Uuid = createUuid();
      }
      sharedQuerys = [].concat(state.SharedQueries);
      sharedQuerys.push(actionSharedQuery);
      return { ...state, SharedQueries: sharedQuerys };
    }

    case SHARED_QUERY_EDIT: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;
      return {
        ...state,
        SharedQueries: state.SharedQueries.map(abObject =>
          abObject.Uuid === actionSharedQuery.Uuid ? actionSharedQuery : abObject
        ),
      };
    }

    case SHARED_QUERY_DELETE: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;
      return {
        ...state,
        SharedQueries: state.SharedQueries.filter(
          abObject => abObject.Uuid !== actionSharedQuery.Uuid
        ),
      };
    }
    case CURRENT_QUERY_CHANGE:
      return Object.assign({}, state, {
        CurrentQuery: (action as CurrentQueryChangeAction).query,
      });
    default:
      return state;
  }
};
