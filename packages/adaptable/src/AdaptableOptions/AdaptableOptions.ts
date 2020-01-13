import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
import { ConfigServerOptions } from './ConfigServerOptions';
import { LayoutOptions } from './LayoutOptions';
import { FilterOptions } from './FilterOptions';
import { QueryOptions } from './QueryOptions';
import { GeneralOptions } from './GeneralOptions';
import { ChartOptions } from './ChartOptions';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { EditOptions } from './EditOptions';
import { StateOptions } from './StateOptions';
import { UserInterfaceOptions } from './UserInterfaceOptions';
import { AdaptablePlugin } from './AdaptablePlugin';
import { SearchOptions } from './SearchOptions';
import { ExportOptions } from './ExportOptions';

/**
 * `AdaptableOptions` is the object created by you at design-time injected into the AdapTable constructor at startup.
 *
 * `AdaptableOptions` provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * The `AdaptableOptions` class contains a few regular properties of which 2 (`vendorGrid` and `primaryKey`) are mandatory - and a number of `xxxOptions` properties where the type is itself a collection of related properties.
 *
 * Typically users will only populate a few of the properties in `AdaptableOptions`, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 *
 * **AdaptableOptions is the only argument used in AdapTable's static constructor.**
 *
 * The contents of `AdaptableOptions` are:
 *
 *  | Option  	                                                                                          | Mandatory   | Details                                     	                |
 *  |----------------	                                                                                    |-----------  |---------------------------------------------	                |
 *  | [adaptableId](_adaptableoptions_adaptableoptions_.adaptableoptions.html#adaptableid)                | No	        | A unique ID for this instance of AdapTable	                  |
 *  | [predefinedConfig](_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig)      | No	        | User State shipped with AdapTable instance for first use      |
 *  | [primaryKey](_adaptableoptions_adaptableoptions_.adaptableoptions.html#primarykey)                  | Yes	        | Name of a column guaranteed to contain unique contents        |
 *  | [userName](_adaptableoptions_adaptableoptions_.adaptableoptions.html#username)                      | No	        | The current AdapTable user (useful for Audit purposes)      	|
 *  | [vendorGrid](_adaptableoptions_adaptableoptions_.adaptableoptions.html#vendorgrid)                  | Yes	        | Underlying vendor grid object (e.g. *GridOptions* for ag-Grid)|
 *  | [auditOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#auditoptions)              | No	        | Audit Log related options                                   	|
 *  | [chartOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#chartoptions)               | No	        | Chart-based options (used when using chart plugin)           	|
 *  | [configServerOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#configserveroptions)| No	        | Options related to Config Server (external state management)  |
 *  | [editOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#editoptions)                | No	        | Editing (and server-editing) related options                  |
 *  | [exportOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#exportoptions)            | No	        | Export and reporting related options                          |
 *  | [filterOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#filteroptions)            | No	        | Options relating to filtering functionality in AdapTable      |
 *  | [generalOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#generaloptions)          | No	        | General set of Options (e.g. for managing Primary Keys        |
 *  | [layoutOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#layoutoptions)            | No	        | Layout (Views) related Options                                |
 *  | [queryOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#queryoptions)              | No	        | Options when running a Query ( [Expression](https://api.adaptableblotter.com/modules/_predefinedconfig_common_expression_.html) ) in AdapTable |
 *  | [searchOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#searchoptions)            | No	        | Search-related options (e.g. for managing Server searching)   |
 *  | [stateOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#stateoptions)              | No	        | Series of functions to allow you to manage AdapTable State    |
 *  | [userInterfaceOptions](_adaptableoptions_adaptableoptions_.adaptableoptions.html#userinterfaceoptions)| No	      | User Interface related functions (e.g. menus, toolbars)       |
 *  | [plugins](_adaptableoptions_adaptableoptions_.adaptableoptions.html#plugins)                        | No	        | Options used by the AdapTable plugins (e.g. charting, finance)|
 *
 */
export interface AdaptableOptions {
  /**
   * Identifier for this instance of AdapTable
   *
   * Useful if Audit Log is turned on or you are using multiple grids
   *
   * **Note** it cannot contain a '.' (as this value is used to name styles which raises issues if it contains a full stop).
   *
   * The value provided here is also that used to name the *Home Toolbar* (the toolbar that appears on the left of the Dashboard).
   *
   * **Default Value: adaptable_id**
   */
  adaptableId?: string;

  /**
   * User State (a.ka. `predefinedConfig`) set at design-time and shipped with AdapTable for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default Value: undefined**
   */
  predefinedConfig?: PredefinedConfig | string;

  /**
   * **MANDATORY property**
   *
   * The name of a column in the grid guaranteed to contain unique values.
   *
   * Required for cell identification purpose when cell summary and editing functions.
   *
   * Also used by Audit Log to identify which cells have been edited.
   *
   * Note: The column does not need to be visible but it does need to exist in the grid's data source.
   *
   * **Default Value: N/A**
   */
  primaryKey: string;

  /**
   * The name of the current AdapTable user.
   *
   * Strongly recommended to be set if using Config Server.
   *
   * Also used in Audit Log to identify the current user who has made edits or changed state.
   *
   * **Default Value: anonymous**
   */
  userName?: string;

  /**
   * **MANDATORY property**
   *
   * This is the underlying vendor grid or grid object which AdapTable will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The `vendorGrid` object should contain all the column definitions and data sources required.
   *
   * Note: if you are using the *React Wrapper* or the *Angular Wrapper* then **you do not need to populate this property** (as `gridOptions` is a separate parameter and AdapTable will wire up everything for you).
   *
   * **Default Value: N/A**
   */
  vendorGrid?: any;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set audit messages will send details of actions in AdapTable to an Audit destination.
   *
   * You can choose to listen to any mixture of Audits for:
   *
   * - `CellEdit`
   *
   * - `TickingDataChange`
   *
   * - `FunctionEvent`
   *
   * - `UserStateChange`
   *
   * - `InternalStateChange`
   *
   * For each Audit type, you can choose to send each audit message (which is packaged as a simple JSON object) to any mixture of:
   *
   * - Http Channel
   *
   * - Console
   *
   * - Alert
   *
   * - Event
   *
   * If you select HttpChannel, you can subsequently see these message using your internal reporting software (e.g. he Elastic Stack).
   */
  auditOptions?: AuditOptions;

  /**
   * Options to manage AdapTable charting.
   *
   * Primarily concerned with how and where charts appear.
   */
  chartOptions?: ChartOptions;

  /**
   * Options for setting Config Server.
   *
   * This feature allows for storing user state remotely (as opposed to in local storage, which is the default).
   */
  configServerOptions?: ConfigServerOptions;

  /**
   * Options for setting the *Div elements* in which AdapTable and the underlying grid are placed.
   *
   * Also allows you to set where popups appear relative to the page and where charts are displayed.
   */
  containerOptions?: ContainerOptions;

  /**
   * Options related to Editing in AdapTable.
   *
   * Includes a function enabling you to perform custom validation when a cell changes values.
   */
  editOptions?: EditOptions;

  /**
   * Related to creating and managing filters in AdapTable.
   *
   * Includes options concerning whether to use AdapTable's filters (or those provided by the vendor grid).
   *
   * Also contains options to set if, how and when the Grid should repaint and refilter after user data edits and ticking data edits.
   */
  filterOptions?: FilterOptions;

  /**
   * General options to manage  AdapTable.
   *
   * Includes options for managing Server Searching, and how to manage Primary Keys.
   */
  generalOptions?: GeneralOptions;

  /**
   * Options related to Layouts (ie. saveable views of column order, visibility and sort).
   *
   * Includes properties for whether to include vendor state in the Layout (e.g. Column Grouping) and whether layouts should save automatically or manually.
   */
  layoutOptions?: LayoutOptions;

  /**
   * Options for running queries in AdapTable - known as an [Expression](https://api.adaptableblotter.com/modules/_predefinedconfig_common_expression_.html)
   *
   * Lets you specify how (and how many) values are returned when doing a column lookup, how to deal with case and what is in the Query.
   *
   * Also includes a callback function allowing devs to populate column lookups dynamically.
   */
  queryOptions?: QueryOptions;

  /**
   * Options for managing Search in AdapTable.
   */
  searchOptions?: SearchOptions;

  /**
   * Options for managing Exporting and Reports in AdapTable.
   */
  exportOptions?: ExportOptions;

  /**
   * Options related to state hydration / dehydration - allows users to intercept state persistence and state loading.
   *
   * By default, AdapTable state is persisted in the local storage of the user browser, under the `adaptableId` key.
   *
   * These state options allow you to change this default behavior and also to add custom properties or behaviour in the persisted state.
   *
   */
  stateOptions?: StateOptions;

  /**
   * Options for managing the User Interface elements of AdapTable.
   *
   * Includes options for themes, menus, tool panels etc.
   */
  userInterfaceOptions?: UserInterfaceOptions;

  /**
   * Used internally by AdapTable to manage Plug-ins (e.g. Charting, Finance etc.)
   *
   * **These should not be provided by users at design-time**
   */
  plugins?: AdaptablePlugin[];
}
