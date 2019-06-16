import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/IUserState/PlusMinusState';

export interface IPlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): PlusMinusRule[];
}
