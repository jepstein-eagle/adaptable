import { ActionColumnState, ActionColumn } from '../PredefinedConfig/ActionColumnState';

/**
 * Provides run-time access to the Action Column function and associated {@link ActionColumnState|Action Column State}.
 *
 * The Action Column Function enables the creation of a special {@link ActionColumn|Action Column} that contain buttons together with a function that is called when the button is clicked by the user.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo/)
 *
 * - {@link ActionColumnState|Action Column State}
 *
 * - [Action Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/action-column-function.md)
 *
 * - [Action Column Video](https://youtu.be/y0cDvtdmSKM)
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
