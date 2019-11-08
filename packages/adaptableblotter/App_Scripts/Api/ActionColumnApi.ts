import {
  ActionColumnState,
  ActionColumn,
} from '../PredefinedConfig/DesignTimeState/ActionColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 */
export interface ActionColumnApi {
  /**
   * Retrieves the Action Column section from the Adaptable Blotter State
   */
  getActionColumnState(): ActionColumnState;

  /**
   * Returns all the Advanced Searches in the Adaptable Blotter State
   */
  getAllActionColumn(): ActionColumn[];
}
