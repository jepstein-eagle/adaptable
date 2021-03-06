import { ConditionalStyleState, ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';
import { AdaptableColumn, Scope } from '../types';
import { AdaptablePredicateDef } from '../PredefinedConfig/Common/AdaptablePredicate';

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

  getPredicateDefs(): AdaptablePredicateDef[];
  getPredicateDefsForScope(scope: Scope): AdaptablePredicateDef[];

  getOrderedConditionalStyles(): ConditionalStyle[] | undefined;

  editConditionalStyle(conditionalStyle: ConditionalStyle): void;
}
