import * as Redux from 'redux';
import { PercentBarState } from './Interface/IState';
import { IPercentBar } from '../../Utilities/Interface/BlotterObjects/IPercentBar';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const PERCENT_BAR_ADD = 'PERCENT_BAR_ADD';
export const PERCENT_BAR_EDIT = 'PERCENT_BAR_EDIT';
export const PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';

export interface PercentBarAddAction extends Redux.Action {
  PercentBar: IPercentBar;
}

export interface PercentBarEditAction extends Redux.Action {
  Index: number;
  PercentBar: IPercentBar;
}

export interface PercentBarDeleteAction extends Redux.Action {
  Index: number;
  PercentBar: IPercentBar;
}

export const PercentBarAdd = (PercentBar: IPercentBar): PercentBarAddAction => ({
  type: PERCENT_BAR_ADD,
  PercentBar,
});

export const PercentBarEdit = (Index: number, PercentBar: IPercentBar): PercentBarEditAction => ({
  type: PERCENT_BAR_EDIT,
  Index,
  PercentBar,
});

export const PercentBarDelete = (
  Index: number,
  PercentBar: IPercentBar
): PercentBarDeleteAction => ({
  type: PERCENT_BAR_DELETE,
  Index,
  PercentBar,
});

const initialPercentBarState: PercentBarState = {
  PercentBars: EMPTY_ARRAY,
};

export const PercentBarReducer: Redux.Reducer<PercentBarState> = (
  state: PercentBarState = initialPercentBarState,
  action: Redux.Action
): PercentBarState => {
  let PercentBars: IPercentBar[];

  switch (action.type) {
    case PERCENT_BAR_ADD: {
      let actionTyped = <PercentBarAddAction>action;
      PercentBars = [].concat(state.PercentBars);
      PercentBars.push(actionTyped.PercentBar);
      return Object.assign({}, state, { PercentBars: PercentBars });
    }

    case PERCENT_BAR_EDIT: {
      let actionTyped = <PercentBarEditAction>action;
      PercentBars = [].concat(state.PercentBars);
      PercentBars[actionTyped.Index] = actionTyped.PercentBar;
      return Object.assign({}, state, { PercentBars: PercentBars });
    }

    case PERCENT_BAR_DELETE: {
      PercentBars = [].concat(state.PercentBars);
      PercentBars.splice((<PercentBarDeleteAction>action).Index, 1);
      return Object.assign({}, state, { PercentBars: PercentBars });
    }

    default:
      return state;
  }
};
