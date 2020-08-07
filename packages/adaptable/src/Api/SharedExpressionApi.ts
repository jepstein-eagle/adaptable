import { SharedExpressionState, SharedExpression } from '../PredefinedConfig/SharedExpressionState';

export interface SharedExpressionApi {
  /**
   * Retrieves the Shared Expression section from Adaptable State
   *
   */
  getSharedExpressionState(): SharedExpressionState;

  /**
   * Gets all the Shared Expression objects in Adaptable State
   */
  getAllSharedExpression(): SharedExpression[];

  /**
   * Opens the Shared Expression popup screen
   */
  showSharedExpressionPopup(): void;
}
