import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';

export interface IConditionalStyleApi {
  getConditionalStyleState(): ConditionalStyleState;
  getAllConditionalStyle(): ConditionalStyle[];
}
