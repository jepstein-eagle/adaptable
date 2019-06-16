import { PercentBarState, PercentBar } from '../../PredefinedConfig/IUserState/PercentBarState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const PERCENT_BAR_ADD = 'PERCENT_BAR_ADD';
export const PERCENT_BAR_EDIT = 'PERCENT_BAR_EDIT';
export const PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';

export interface PercentBarAction extends Redux.Action {
  percentBar: PercentBar;
}

export interface PercentBarAddAction extends PercentBarAction {}

export interface PercentBarEditAction extends PercentBarAction {}

export interface PercentBarDeleteAction extends PercentBarAction {}

export const PercentBarAdd = (percentBar: PercentBar): PercentBarAddAction => ({
  type: PERCENT_BAR_ADD,
  percentBar,
});

export const PercentBarEdit = (percentBar: PercentBar): PercentBarEditAction => ({
  type: PERCENT_BAR_EDIT,
  percentBar,
});
export const PercentBarDelete = (percentBar: PercentBar): PercentBarDeleteAction => ({
  type: PERCENT_BAR_DELETE,
  percentBar,
});

const initialPercentBarState: PercentBarState = {
  PercentBars: EMPTY_ARRAY,
};

export const PercentBarReducer: Redux.Reducer<PercentBarState> = (
  state: PercentBarState = initialPercentBarState,
  action: Redux.Action
): PercentBarState => {
  let percentBars: PercentBar[];

  switch (action.type) {
    case PERCENT_BAR_ADD: {
      const actionPercentBar: PercentBar = (action as PercentBarAction).percentBar;

      if (!actionPercentBar.Uuid) {
        actionPercentBar.Uuid = createUuid();
      }
      percentBars = [].concat(state.PercentBars);
      percentBars.push(actionPercentBar);
      return { ...state, PercentBars: percentBars };
    }

    case PERCENT_BAR_EDIT: {
      const actionPercentBar: PercentBar = (action as PercentBarAction).percentBar;
      return {
        ...state,
        PercentBars: state.PercentBars.map(abObject =>
          abObject.Uuid === actionPercentBar.Uuid ? actionPercentBar : abObject
        ),
      };
    }
    case PERCENT_BAR_DELETE: {
      const actionPercentBar: PercentBar = (action as PercentBarAction).percentBar;
      return {
        ...state,
        PercentBars: state.PercentBars.filter(abObject => abObject.Uuid !== actionPercentBar.Uuid),
      };
    }

    default:
      return state;
  }
};
