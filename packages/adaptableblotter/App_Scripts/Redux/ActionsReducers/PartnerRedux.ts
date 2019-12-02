import * as Redux from 'redux';
import { PartnerState } from '../../PredefinedConfig/PartnerState';

const initialFilterState: PartnerState = {
  ipushpull: undefined,
  glue42Config: undefined,
};

export const PartnerReducer: Redux.Reducer<PartnerState> = (
  state: PartnerState = initialFilterState,
  action: Redux.Action
): PartnerState => {
  switch (action.type) {
    default:
      return state;
  }
};
