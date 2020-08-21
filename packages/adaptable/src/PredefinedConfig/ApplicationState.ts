import { ConfigState } from './ConfigState';

/**
 * The Predefined Configuration for the Application function
 *
 * The Application function is designed to allow developers to provide Adaptable with appliation-specific data.
 *
 * In previous versions of AdapTable, Application State included an ApplicationToolbar for users to render application-specific content, but this is now available through the [Custom Toolbars](_src_predefinedconfig_dashboardstate_.dashboardstate.html#customtoolbars) property in Dashboard State.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Application Demo](https://demo.adaptabletools.com/adaptablestate/aggridapplicationdataentriesdemo)
 *
 * - {@link ApplicationApi|Application Api}
 *
 * - [Application Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/application-function.md)
 *
 * - [Adaptable State Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-state-guide.md)
 *
 * --------------
 *
 * **Application Data Entries**
 *
 * The `ApplicationDataEntries` array enables you to provide Adaptable with your own data (which needs to be provided in key / value form) that Adaptable will then store in its State.
 *
 *  **Note** Because these entries are stored as JSON, the value must be something that is capable of being 'stringified'.
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
export interface ApplicationState extends ConfigState {
  /**
   * An array of Application Data Entries (essentially Key / Value pairs) enabling you to provide Adaptable with your own data.
   *
   * That data will then be persisted by Adaptable in its own State.
   */
  ApplicationDataEntries?: ApplicationDataEntry[];
}

/**
 * Defines a simple Key / Value pair object.
 *
 * This can be used to store any inforrmation that is particular to your application in Adaptable state.
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
