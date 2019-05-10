import { ApiBase } from './ApiBase';
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import { IConditionalStyle } from '../Utilities/Interface/BlotterObjects/IConditionalStyle';
import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';

export class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {
  public getConditionalStyleState(): ConditionalStyleState {
    return this.getBlotterState().ConditionalStyle;
  }

  public getAllConditionalStyle(): IConditionalStyle[] {
    return this.getConditionalStyleState().ConditionalStyles;
  }
}
