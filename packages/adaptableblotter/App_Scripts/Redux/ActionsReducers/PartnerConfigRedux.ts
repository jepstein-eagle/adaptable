import * as Redux from 'redux';
import { PartnerConfigState } from '../../PredefinedConfig/RunTimeState/PartnerConfigstate';

export interface PartnerConfigSetAction extends Redux.Action {
  PartnerConfigs: string[];
}

const initialFilterState: PartnerConfigState = {
  pushPullConfig: null,
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
