import * as Redux from 'redux';

import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { getHexForName, RED, GREEN, GRAY } from '../../View/UIHelper';
import {
  UPDATED_ROWS_DEFAULT_DURATION,
  UPDATED_ROW_DEFAULT_MAX_ALERTS_IN_STORE,
} from '../../Utilities/Constants/GeneralConstants';

export const UPDATED_ROW_ENABLE_DISABLE = 'UPDATED_ROW_ENABLE_DISABLE';
export const JUMP_TO_ROW_ENABLE_DISABLE = 'JUMP_TO_ROW_ENABLE_DISABLE';
export const UP_COLOR_SET = 'UP_COLOR_SET';
export const DOWN_COLOR_SET = 'DOWN_COLOR_SET';
export const NEUTRAL_COLOR_SET = 'NEUTRAL_COLOR_SET';

export interface UpdatedRowEnableDisableAction extends Redux.Action {
  shouldEnable: boolean;
}

export interface JumpToRowEnableDisableAction extends Redux.Action {
  shouldEnable: boolean;
}

export interface UpColorSetAction extends Redux.Action {
  upColor: string;
}
export interface DownColorSetAction extends Redux.Action {
  downColor: string;
}
export interface NeutralColorSetAction extends Redux.Action {
  neutralColor: string;
}

export const UpdatedRowEnableDisable = (shouldEnable: boolean): UpdatedRowEnableDisableAction => ({
  type: UPDATED_ROW_ENABLE_DISABLE,
  shouldEnable,
});

export const JumpToRowEnableDisable = (shouldEnable: boolean): JumpToRowEnableDisableAction => ({
  type: JUMP_TO_ROW_ENABLE_DISABLE,
  shouldEnable,
});

export const UpColorSet = (upColor: string): UpColorSetAction => ({
  type: UP_COLOR_SET,
  upColor,
});

export const DownColorSet = (downColor: string): DownColorSetAction => ({
  type: DOWN_COLOR_SET,
  downColor,
});

export const NeutralColorSet = (neutralColor: string): NeutralColorSetAction => ({
  type: NEUTRAL_COLOR_SET,
  neutralColor,
});

const initialUpdatedRowState: UpdatedRowState = {
  EnableUpdatedRow: false,
  UpColor: getHexForName(GREEN),
  DownColor: getHexForName(RED),
  NeutralColor: getHexForName(GRAY),
  Duration: UPDATED_ROWS_DEFAULT_DURATION,
  JumpToRow: false,
  MaxUpdatedRowsInStore: UPDATED_ROW_DEFAULT_MAX_ALERTS_IN_STORE,
};

export const UpdatedRowReducer: Redux.Reducer<UpdatedRowState> = (
  state: UpdatedRowState = initialUpdatedRowState,
  action: Redux.Action
): UpdatedRowState => {
  switch (action.type) {
    case UPDATED_ROW_ENABLE_DISABLE: {
      let shouldEnable = (action as UpdatedRowEnableDisableAction).shouldEnable;
      return Object.assign({}, state, {
        EnableUpdatedRow: shouldEnable,
      });
    }

    case JUMP_TO_ROW_ENABLE_DISABLE: {
      let shouldEnable = (action as JumpToRowEnableDisableAction).shouldEnable;
      return Object.assign({}, state, {
        JumpToRow: shouldEnable,
      });
    }

    case UP_COLOR_SET: {
      let upColor = (action as UpColorSetAction).upColor;
      return Object.assign({}, state, {
        UpColor: upColor,
      });
    }

    case DOWN_COLOR_SET: {
      let downColor = (action as DownColorSetAction).downColor;
      return Object.assign({}, state, {
        DownColor: downColor,
      });
    }
    case NEUTRAL_COLOR_SET: {
      let neutralColor = (action as NeutralColorSetAction).neutralColor;
      return Object.assign({}, state, {
        NeutralColor: neutralColor,
      });
    }

    default:
      return state;
  }
};
