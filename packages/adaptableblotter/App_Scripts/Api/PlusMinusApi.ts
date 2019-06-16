import { ApiBase } from './ApiBase';
import { PlusMinusState, PlusMinusRule } from '../PredefinedConfig/IUserState/PlusMinusState';
import { IPlusMinusApi } from './Interface/IPlusMinusApi';

export class PlusMinusApi extends ApiBase implements IPlusMinusApi {
  public getPlusMinusState(): PlusMinusState {
    return this.getBlotterState().PlusMinus;
  }

  public getAllPlusMinus(): PlusMinusRule[] {
    return this.getPlusMinusState().PlusMinusRules;
  }
}
