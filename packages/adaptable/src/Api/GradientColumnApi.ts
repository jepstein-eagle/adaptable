import { GradientColumnState, GradientColumn } from '../PredefinedConfig/GradientColumnState';

/**
 * Provides access to the Gradient Column function.
 *
 * Gradient Columns will format the back colour of each cell in the column according to a maximum value.
 *
 */
export interface GradientColumnApi {
  /**
   * Returns the whole of `GradientColumn` section of AdapTable State
   */
  getGradientColumnState(): GradientColumnState;

  /**
   * Returns all the Gradient Columns in the Gradient Column state
   */
  getAllGradientColumn(): GradientColumn[];

  /**
   * Opens the Free Text Column popup screen
   */
  showGradientColumnPopup(): void;
}
