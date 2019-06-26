import { RunTimeState } from './RunTimeState';
/**
 * The Predefined Configuration for the Bulk Update function
 *
 * Bulk Update is a convenience function that allows you to update a group of selected cells in the same column to hold the same value with a single click.
 *
 * **Further Resources**
 *
 * [Bulk Update Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360017055491-BulkUpdates)
 *
 * [Bulk Update Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895731-BulkUpdates-Videos)
 *
 * [Bulk Update Demo](https://demo.adaptableblotter.com/BulkUpdatesmessages/aggridBulkUpdatedemo/)
 *
 * [Bulk Update Blotter API](_api_interface_ibulkupdateapi_.ibulkupdateapi.html)
 *
 * [Bulk Update FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-BulkUpdate-Functions-FAQ)
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
