import * as Redux from 'redux';
import { PartnerConfigState } from '../../PredefinedConfig/PartnerConfigState';

const initialFilterState: PartnerConfigState = {
  ipushpull: undefined,
  glue42Config: undefined,
};

export const PartnerConfigReducer: Redux.Reducer<PartnerConfigState> = (
  state: PartnerConfigState = initialFilterState,
  action: Redux.Action
): PartnerConfigState => {
  switch (action.type) {
    default:
      return state;
  }
};
