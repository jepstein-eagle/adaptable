import { SharedQueryState, SharedQuery } from '../../PredefinedConfig/SharedQueryState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const SHAREDQUERY_ADD = 'SHAREDQUERY_ADD';
export const SHAREDQUERY_EDIT = 'SHAREDQUERY_EDIT';
export const SHAREDQUERY_DELETE = 'SHAREDQUERY_DELETE';

export interface SharedQueryAction extends Redux.Action {
  sharedQuery: SharedQuery;
}

export interface SharedQueryAddAction extends SharedQueryAction {}

export interface SharedQueryEditAction extends SharedQueryAction {}

export interface SharedQueryDeleteAction extends SharedQueryAction {}

export const SharedQueryAdd = (sharedQuery: SharedQuery): SharedQueryAddAction => ({
  type: SHAREDQUERY_ADD,
  sharedQuery,
});

export const SharedQueryEdit = (sharedQuery: SharedQuery): SharedQueryEditAction => ({
  type: SHAREDQUERY_EDIT,
  sharedQuery,
});

export const SharedQueryDelete = (sharedQuery: SharedQuery): SharedQueryDeleteAction => ({
  type: SHAREDQUERY_DELETE,
  sharedQuery,
});

const initialSharedQueryState: SharedQueryState = {
  SharedQueries: EMPTY_ARRAY,
};

export const SharedQueryReducer: Redux.Reducer<SharedQueryState> = (
  state: SharedQueryState = initialSharedQueryState,
  action: Redux.Action
): SharedQueryState => {
  let sharedQuerys: SharedQuery[];

  switch (action.type) {
    case SHAREDQUERY_ADD: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;

      if (!actionSharedQuery.Uuid) {
        actionSharedQuery.Uuid = createUuid();
      }
      sharedQuerys = [].concat(state.SharedQueries);
      sharedQuerys.push(actionSharedQuery);
      return { ...state, SharedQueries: sharedQuerys };
    }

    case SHAREDQUERY_EDIT: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;
      return {
        ...state,
        SharedQueries: state.SharedQueries.map(abObject =>
          abObject.Uuid === actionSharedQuery.Uuid ? actionSharedQuery : abObject
        ),
      };
    }

    case SHAREDQUERY_DELETE: {
      const actionSharedQuery: SharedQuery = (action as SharedQueryAction).sharedQuery;
      return {
        ...state,
        SharedQueries: state.SharedQueries.filter(
          abObject => abObject.Uuid !== actionSharedQuery.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
