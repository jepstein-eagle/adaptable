import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/RunTimeState/PlusMinusState';

export interface IPlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): PlusMinusRule[];
}
