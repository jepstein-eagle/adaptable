import { ApiBase } from "./ApiBase";
import { PlusMinusState } from "../Redux/ActionsReducers/Interface/IState";
import { IPlusMinusRule } from "../Utilities/Interface/BlotterObjects/IPlusMinusRule";
import { IPlusMinusApi } from "./Interface/IPlusMinusApi";
export declare class PlusMinusApi extends ApiBase implements IPlusMinusApi {
    getPlusMinusState(): PlusMinusState;
    getAllPlusMinus(): IPlusMinusRule[];
}
