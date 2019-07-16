import {
  ActionColumnState,
  ActionColumn,
} from '../../PredefinedConfig/DesignTimeState/ActionColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 */
export interface IActionColumnApi {
  /**
   * Retrieves the Action Column State
   */
  getActionColumnState(): ActionColumnState;

  /**
   * Returns all the Advanced Searches in the State
   */
  getAllActionColumn(): ActionColumn[];
}
