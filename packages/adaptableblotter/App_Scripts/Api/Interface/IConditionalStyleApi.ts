import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/IUserState/ConditionalStyleState';

export interface IConditionalStyleApi {
  getConditionalStyleState(): ConditionalStyleState;
  getAllConditionalStyle(): ConditionalStyle[];
}
