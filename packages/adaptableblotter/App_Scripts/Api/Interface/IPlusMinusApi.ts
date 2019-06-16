import { PlusMinusState, IPlusMinusRule } from '../../PredefinedConfig/IUserState/PlusMinusState';

export interface IPlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): IPlusMinusRule[];
}
