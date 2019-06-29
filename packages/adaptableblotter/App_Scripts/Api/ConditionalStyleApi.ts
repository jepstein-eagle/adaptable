import { ApiBase } from './ApiBase';
import { IConditionalStyleApi } from './Interface/IConditionalStyleApi';
import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../PredefinedConfig/RunTimeState/ConditionalStyleState';

export class ConditionalStyleApi extends ApiBase implements IConditionalStyleApi {
  public getConditionalStyleState(): ConditionalStyleState {
    return this.getBlotterState().ConditionalStyle;
  }

  public getAllConditionalStyle(): ConditionalStyle[] {
    return this.getConditionalStyleState().ConditionalStyles;
  }
}
