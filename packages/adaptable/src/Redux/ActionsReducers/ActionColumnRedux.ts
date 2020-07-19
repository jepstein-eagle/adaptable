import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { ActionColumnState, ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import { ActionColumnClickedInfo } from '../../Api/Events/ActionColumnClicked';

export const ACTION_COLUMNS_SET = 'ACTION_COLUMNS_SET';
export const ACTION_COLUMN_APPLY = 'ACTION_COLUMN_APPLY';

export interface ActionColumnsSetAction extends Redux.Action {
  ActionColumns: ActionColumn[];
}

export const ActionColumnsSet = (ActionColumns: ActionColumn[]): ActionColumnsSetAction => ({
  type: ACTION_COLUMNS_SET,
  ActionColumns,
});

export interface ActionColumnApplyAction extends Redux.Action {
  actionColumnClickedInfo: ActionColumnClickedInfo;
}

export const ActionColumnApply = (
  actionColumnClickedInfo: ActionColumnClickedInfo
): ActionColumnApplyAction => ({
  type: ACTION_COLUMN_APPLY,
  actionColumnClickedInfo,
});

const initialFilterState: ActionColumnState = {
  ActionColumns: EMPTY_ARRAY,
};

export const ActionColumnReducer: Redux.Reducer<ActionColumnState> = (
  state: ActionColumnState = initialFilterState,
  action: Redux.Action
): ActionColumnState => {
  switch (action.type) {
    case ACTION_COLUMNS_SET:
      return Object.assign({}, state, {
        ActionColumns: (action as ActionColumnsSetAction).ActionColumns,
      });

    default:
      return state;
  }
};
