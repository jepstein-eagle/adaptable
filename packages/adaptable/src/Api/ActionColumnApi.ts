import { ActionColumnState, ActionColumn } from '../PredefinedConfig/ActionColumnState';

/**
 * Provides full and comprehensive run-time access to the Action Column function and associated state.
 *
 *  **Further AdapTable Help Resources**
 *
 * - [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo/)
 *
 * - [Action Column State](_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)
 *
 * - [Action Column Function Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/action-column-function.md)
 *
 */
export interface ActionColumnApi {
  /**
   * Retrieves the `ActionColumn` section from Adaptable State
   */
  getActionColumnState(): ActionColumnState;

  /**
   * Returns all the `ActionColumn` objects in the Action Column section of Adaptable State
   */
  getAllActionColumn(): ActionColumn[];
}
