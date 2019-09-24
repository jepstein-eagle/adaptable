import * as Redux from 'redux';
import { PartnerConfigState } from '../../PredefinedConfig/RunTimeState/PartnerConfigstate';

const initialFilterState: PartnerConfigState = {
  pushPullConfig: null,
  glue42Config: null,
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
