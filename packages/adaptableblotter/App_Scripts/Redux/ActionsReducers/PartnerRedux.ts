import * as Redux from 'redux';
import { PartnerState } from '../../PredefinedConfig/PartnerState';

const initialFilterState: PartnerState = {
  iPushPull: undefined,
  Glue42: undefined,
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
