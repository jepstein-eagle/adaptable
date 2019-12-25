import { RunTimeState } from './RunTimeState';
import { ToolbarButton } from './Common/ToolbarButton';
import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for the Application function
 *
 * The Application function is designed to allow developers to provide the Adaptable Blotter with appliation-specific data
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardapplicationtoolbardemo/) | [API](_api_applicationapi_.applicationapi.html) |
 *
 * **The Application Data Entries**
 *
 * The Application State provides an ApplicationDataEntries array.
 *
 * This enables you to provide the Adaptable Blotter with your own data (which needs to be provided in key / value form) that the Adaptable Blotter will then store in its State.
 *
 *  **Because these entries are stored as JSON, the value must be something that is capable of being 'stringified'**
 *
 * **Application Data Entries Predefined Config Example**
 *
 *  ```ts
 * export default {
 * Application: {
 *  ApplicationDataEntries:[
 *    {
 *      Key: 'Name',
 *      Value: 'John Smith',
 *    },
 *    {
 *      Key: 'Employee Number',
 *      Value: 20283728,
 *    },
 *    {
 *      Key: 'Joined Date',
 *      Value: new Date(2017, 13, 7),
 *    },
 *    {
 *      Key: 'Super User',
 *      Value: false,
 *    },
 *    ],
 *  }
 * } as PredefinedConfig;
 * ```
 *
 **/
export interface ApplicationState extends DesignTimeState {
  /**
   * An array of Application Data Entries (essentially Key / Value pairs) enabling you to provide the Adaptable Blotter with your own data.
   *
   * That data will then be persisted by Adaptable Blotter in its own State.
   */
  ApplicationDataEntries?: ApplicationDataEntry[];
}

/**
 * Defines a simple Key / Value pair object.
 *
 * This can be used to store any inforrmation that is particular to your application in the Adaptable Blotter state.
 *
 * **note: because this is stored as JSON the value must be something that is capable of being 'stringified'**
 */
export interface ApplicationDataEntry {
  /**
   * The key of the Key / Value pair - always stored as a string
   */
  Key: string;

  /**
   * The actual piece of data or object being stored.
   *
   * The only limitation is that it needs to be something that can be stringified as it will be converted to JSON.
   */
  Value: any;
}
