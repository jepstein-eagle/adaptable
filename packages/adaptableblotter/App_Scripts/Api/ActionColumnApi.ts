import { ActionColumnState, ActionColumn } from '../PredefinedConfig/ActionColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 *
 *  **Further Resources**
 *
 * -[Demo Site](https://demo.adaptableblotter.com/column/aggridactioncolumnsdemo/)
 *
 * -[State](_predefinedconfig_actioncolumnstate_.actioncolumnstate.html)
 *
 * -[FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002209498-Action-Column-FAQ)
 *
 * -[Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002204277-Action-Column-Videos)
 *
 * -[User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
 *
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
