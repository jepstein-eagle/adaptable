import {
  ConditionalStyleState,
  IConditionalStyle,
} from '../../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';

export interface IConditionalStyleApi {
  getConditionalStyleState(): ConditionalStyleState;
  getAllConditionalStyle(): IConditionalStyle[];
}
