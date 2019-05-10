import { PlusMinusState } from '../../Redux/ActionsReducers/Interface/IState';
import { IPlusMinusRule } from '../../Utilities/Interface/BlotterObjects/IPlusMinusRule';

export interface IPlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): IPlusMinusRule[];
}
