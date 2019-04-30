import { ApiBase } from "./ApiBase";
import { PlusMinusState } from "../Redux/ActionsReducers/Interface/IState";
import { IPlusMinusRule } from "../Utilities/Interface/BlotterObjects/IPlusMinusRule";
import { IPlusMinusApi } from "./Interface/IPlusMinusApi";

export class PlusMinusApi extends ApiBase implements IPlusMinusApi {
 
  public getPlusMinusState(): PlusMinusState {
    return this.getBlotterState().PlusMinus;
}

public getAllPlusMinus(): IPlusMinusRule[] {
    return this.getPlusMinusState().PlusMinusRules;
  }


}