import { ConfigState } from './/ConfigState';
/**
 * The Predefined Configuration for the Bulk Update function
 *
 * Bulk Update is a convenience function that allows you to update a group of selected cells in the same column to hold the same value with a single click.
 *
 * **Further AdapTable Help Resources**
 *
 * [Bulk Update Demo](https://demo.adaptabletools.com/edit/aggridbulkupdatedemo/)
 *
 * {@link BulkUpdateApi|Bulk Update API}
 *
 * [Bulk Update Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/bulk-update-function.md)
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
