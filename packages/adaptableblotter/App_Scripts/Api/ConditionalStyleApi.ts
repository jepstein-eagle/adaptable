import { ConditionalStyleState, ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';

/**
 * Provides full and comprehensive run-time access to the Conditional Style function and associated state.
 */
export interface ConditionalStyleApi {
  /**
   * Retrieves the Conditional Style section from the Adaptable Blotter State
   */
  getConditionalStyleState(): ConditionalStyleState;

  /**
   * Gets all Conditional Styles in the Adaptable Blotter State
   */
  getAllConditionalStyle(): ConditionalStyle[];

  /**
   * Opens the Conditional Style popup screen
   */
  showConditionalStylePopup(): void;
}
