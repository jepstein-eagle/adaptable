import { ConditionalStyleState, ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';
import { AdaptableColumn, Scope } from '../types';
import { PredicateDef } from '../PredefinedConfig/Common/Predicate';

/**
 * Provides full and comprehensive run-time access to the Conditional Style function and associated state.
 */
export interface ConditionalStyleApi {
  /**
   * Retrieves the Conditional Style section from Adaptable State
   */
  getConditionalStyleState(): ConditionalStyleState;

  /**
   * Gets all Conditional Styles in Adaptable State
   */
  getAllConditionalStyle(): ConditionalStyle[];

  /**
   * Opens the Conditional Style popup screen
   */
  showConditionalStylePopup(): void;

  getRowConditionalStyles(): ConditionalStyle[] | undefined;

  getConditionalStylesForColumn(column: AdaptableColumn): ConditionalStyle[] | undefined;

  getPredicateDefs(): PredicateDef[];
  getPredicateDefsForScope(scope: Scope): PredicateDef[];

  getOrderedConditionalStyles(): ConditionalStyle[] | undefined;
}
