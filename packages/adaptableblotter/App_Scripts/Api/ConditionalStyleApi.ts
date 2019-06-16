import { ApiBase } from './ApiBase';
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import {
  ConditionalStyleState,
  IConditionalStyle,
} from '../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';

export class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {
  public getConditionalStyleState(): ConditionalStyleState {
    return this.getBlotterState().ConditionalStyle;
  }

  public getAllConditionalStyle(): IConditionalStyle[] {
    return this.getConditionalStyleState().ConditionalStyles;
  }
}
