import { ConfigState } from './/ConfigState';
/**
 * The Predefined Configuration for the Bulk Update function
 *
 * Bulk Update allows users - with a single action - to update a group of selected cells in the same column.   All the cells will contain the same value (either existing in the column already or now).
 *
 * Bulk Update works on any column type.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Bulk Update Demo](https://demo.adaptabletools.com/edit/aggridbulkupdatedemo/)
 *
 * {@link BulkUpdateApi|Bulk Update API}
 *
 * [Bulk Update Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/bulk-update-function.md)
 *
 *
 **/
export interface BulkUpdateState extends ConfigState {
  /**
   * What the initial value in the Bulk Update toolbar will be when the application starts.
   *
   * **Default Value**:  Empty String
   *
   */
  BulkUpdateValue?: string;
}
