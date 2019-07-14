import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';

/**
 * Provides full and comprehensive run-time access to the Conditional Style function and associated state.
 */
export interface IConditionalStyleApi {
  /**
   * Retrieves the Conditional Style State
   */
  getConditionalStyleState(): ConditionalStyleState;

  /**
   * Gets all Conditional Styles in the State
   */
  getAllConditionalStyle(): ConditionalStyle[];
}
