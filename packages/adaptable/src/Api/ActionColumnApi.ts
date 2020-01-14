import { ActionColumnState, ActionColumn } from '../PredefinedConfig/ActionColumnState';

/**
 * Provides full and comprehensive run-time access to the Action Column function and associated state.
 *
 *  **Further AdapTable Help Resources**
 *
 * - [Action Column Demo](https://demo.adaptableblotter.com/column/aggridactioncolumnsdemo/)
 *
 * - [Action Column State](_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)
 *
 * - [Action Column FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002209498-Action-Column-FAQ)
 *
 * - [Action Column Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002204277-Action-Column-Videos)
 *
 * - [Adaptable User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
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
