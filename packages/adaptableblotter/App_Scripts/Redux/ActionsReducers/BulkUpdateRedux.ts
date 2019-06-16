import { BulkUpdateState } from '../../PredefinedConfig/IUserState Interfaces/BulkUpdateState';
import * as Redux from 'redux';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';

export const BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
export const BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';

export interface BulkUpdateApplyAction extends Redux.Action {
  bypassCellValidationWarnings: boolean;
}

export interface BulkUpdateChangeValueAction extends Redux.Action {
  bulkUpdateValue: string;
}

export const BulkUpdateApply = (bypassCellValidationWarnings: boolean): BulkUpdateApplyAction => ({
  type: BULK_UPDATE_APPLY,
  bypassCellValidationWarnings,
});

export const BulkUpdateChangeValue = (bulkUpdateValue: string): BulkUpdateChangeValueAction => ({
  type: BULK_UPDATE_CHANGE_VALUE,
  bulkUpdateValue,
});

const initialBulkUpdateState: BulkUpdateState = {
  BulkUpdateValue: EMPTY_STRING,
};

export const BulkUpdateReducer: Redux.Reducer<BulkUpdateState> = (
  state: BulkUpdateState = initialBulkUpdateState,
  action: Redux.Action
): BulkUpdateState => {
  switch (action.type) {
    case BULK_UPDATE_APPLY:
      //we apply logic in the middleware since it's an API call
      return Object.assign({}, state, { PreviewInfo: null });
    case BULK_UPDATE_CHANGE_VALUE:
      return Object.assign({}, state, {
        BulkUpdateValue: (<BulkUpdateChangeValueAction>action).bulkUpdateValue,
      });
    default:
      return state;
  }
};
