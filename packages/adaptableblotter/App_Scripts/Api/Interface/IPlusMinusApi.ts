import {
  PlusMinusState,
  IPlusMinusRule,
} from '../../PredefinedConfig/IUserState Interfaces/PlusMinusState';

export interface IPlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): IPlusMinusRule[];
}
