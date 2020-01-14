import { RunTimeState } from './/RunTimeState';
/**
 * The Predefined Configuration for the Bulk Update function
 *
 * Bulk Update is a convenience function that allows you to update a group of selected cells in the same column to hold the same value with a single click.
 *
 * **Further AdapTable Help Resources**
 *
 * [Bulk Update Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028638032-Bulk-Update-Videos)
 *
 * [Bulk Update Demo](https://demo.adaptableblotter.com/edit/aggridbulkupdatedemo/)
 *
 * [Bulk Update Adaptable API](https://api.adaptableblotter.com/interfaces/_api_bulkupdateapi_.bulkupdateapi.html)
 *
 * [Bulk Update FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029742872-Bulk-Update-FAQ)
 *
 * [Bulk Update Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754698-Edit-Functions)
 *
 **/
export interface BulkUpdateState extends RunTimeState {
  /**
   * What the initial value in the Bulk Update toolbar will be when the application starts.
   *
   * **Default Value**:  Empty String
   *
   */
  BulkUpdateValue?: string;
}
