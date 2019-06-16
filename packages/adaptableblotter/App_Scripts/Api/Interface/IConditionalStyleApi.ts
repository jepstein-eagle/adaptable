import {
  ConditionalStyleState,
  IConditionalStyle,
} from '../../PredefinedConfig/IUserState/ConditionalStyleState';

export interface IConditionalStyleApi {
  getConditionalStyleState(): ConditionalStyleState;
  getAllConditionalStyle(): IConditionalStyle[];
}
