import { ApiBase } from "./ApiBase";
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import { IConditionalStyle } from '../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { ConditionalStyleState } from "../Redux/ActionsReducers/Interface/IState";

export class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {

 
  public GetState(): ConditionalStyleState {
    return this.getBlotterState().ConditionalStyle;
}

public GetAll(): IConditionalStyle[] {
    return this.getBlotterState().ConditionalStyle.ConditionalStyles;
  }


}