import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { ApplicationState } from '../../PredefinedConfig/ApplicationState';

const initialFilterState: ApplicationState = {
  ApplicationToolbarButtons: EMPTY_ARRAY,
};

export const ApplicationReducer: Redux.Reducer<ApplicationState> = (
  state: ApplicationState = initialFilterState,
  action: Redux.Action
): ApplicationState => {
  switch (action.type) {
    default:
      return state;
  }
};
