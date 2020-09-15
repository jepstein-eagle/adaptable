import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
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
import { UserFunctions } from './UserFunctions';
import { TeamSharingOptions } from './TeamSharingOptions';
import { AdaptablePredicateDef } from '../PredefinedConfig/Common/AdaptablePredicate';

/**
 * `AdaptableOptions` provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * This is the only object created that AdapTable requires to initialise and run; it is set up by developers at design-time and injected into the AdapTable constructor at startup.
 *
 * The `AdaptableOptions` class contains a few regular properties of which 2 (`vendorGrid` and `primaryKey`) are mandatory - and a number of `xxxOptions` properties where the type is itself a collection of related properties.
 *
 * Typically users will only populate a few of the properties in `AdaptableOptions`, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 *
 * All properties are optional with the exception of `primaryKey` and `vendorGrid`
 *
 * The current contents of `AdaptableOptions` are:
 *
 *  | Option  	                                                                                          | Details                                     	                |
 *  |----------------	                                                                                    |---------------------------------------------	                |
 *  | [adaptableId](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#adaptableid)                 | A unique ID for this instance of AdapTable	                  |
 *  | [predefinedConfig](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#predefinedconfig)       | User State shipped with AdapTable instance for first use      |
 *  | [primaryKey](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#primarykey)                 | Name of a column guaranteed to contain unique contents        |
 *  | [userName](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#username)                       | The current AdapTable user (useful for Audit purposes)      	|
 *  | [vendorGrid](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#vendorgrid)                  | Underlying vendor grid object (e.g. *GridOptions* for ag-Grid)|
 *  | [auditOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#auditoptions)               | Audit Log related options                                   	|
 *  | [chartOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#chartoptions)                | Chart-based options (used when using chart plugin)           	|
 *  | [editOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#editoptions)                 | Editing (and server-editing) related options                  |
 *  | [exportOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#exportoptions)             | Export and reporting related options                          |
 *  | [filterOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#filteroptions)             | Options relating to filtering functionality in AdapTable      |
 *  | [generalOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#generaloptions)           | General set of Options (e.g. for managing Primary Keys        |
 *  | [layoutOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#layoutoptions)             | Layout (Views) related Options                                |
 *  | [queryOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#queryoptions)               | Options when running a Query ( [Expression](https://api.adaptabletools.com/modules/_predefinedconfig_common_expression_.html) ) in AdapTable |
 *  | [searchOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#searchoptions)             | Search-related options (e.g. for managing Server searching)   |
 *  | [stateOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#stateoptions)               | Series of functions to allow you to manage AdapTable State    |
 *  | [teamSharingOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#teamsharingoptions)   | Enables 'Team Sharing' of AdapTable objects among colleagues |
 *  | [userFunctions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#userfunctions)             | Implementations of User Functions which are referenced in Config |
 *  | [userInterfaceOptions](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#userinterfaceoptions)| User Interface related functions (e.g. menus, toolbars)       |
 *  | [plugins](_src_adaptableoptions_adaptableoptions_.adaptableoptions.html#plugins)                         | Options used by the AdapTable plugins (e.g. charting, finance)|
 *  | [customPredicateDefs](_src_predefinedconfig_common_adaptablepredicate_.adaptablepredicatedef.html)       | Custom predicates provided by devs (e.g. for filters, alerts etc.)|
 *  | [ipushpullPluginOptions](_src_adaptableoptions_ipushpullpluginoptions_.ipushpullpluginoptions.html)      | Options used by the ipushpull Plugin|
 *  | [glue42PluginOptions](_src_adaptableoptions_glue42pluginoptions_.glue42pluginoptions.html)      | Options used by the Glue42 Plugin|
 *  | [openfinPluginOptions](_src_adaptableoptions_openfinpluginoptions_.openfinpluginoptions.html)      | Options used by the OpenFin Plugin|
 *  | [finsemblePluginOptions](_src_adaptableoptions_finsemblepluginoptions_.finsemblepluginoptions.html)      | Options used by the Finsemble Plugin|
 *  | [masterdetailPluginOptions](_src_adaptableoptions_masterdetailaggridpluginoptions_.masterdetailaggridpluginoptions.html)      | Options used by the Master / Detail Plugin|
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
   * The value provided here is also that used in the Dashboard Header.
   *
   * **Default Value: adaptable_id**
   */
  adaptableId?: string;

  /**
   * Identifier to be used as the localStorage persistence key for the AdaptableState.
   *
   * If not provided, will default to the value of the [adaptableId] option
   */
  adaptableStateKey?: string;

  /**
   * User State (a.ka. `predefinedConfig`) set at design-time and shipped with AdapTable for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](_src_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default Value: undefined**
   */
  predefinedConfig?: PredefinedConfig | string;

  /**
   * **MANDATORY property**
   *
   * The name of a column in AdapTable guaranteed to contain unique values.
   *
   * Required for cell identification purpose when using cell summary and editing functions.
   *
   * Also used by Audit Log to identify which cells have been edited.
   *
   * > Because AdapTable is fully data agnostic, the only way it can identify a particular cell is as a combination of Primary Key value and Column value (e.g. the user has edited in the 'Bid' column in the row where the value in the Primary Key Column is 15).
   *
   * Note: The column does not need to be visible but it **does need to exist in the grid's data source**.
   *
   * If the [​`​​showMissingPrimaryKeyWarning`​](_src_adaptableoptions_generaloptions_.generaloptions.html#showmissingprimarykeywarning) ​​property is true (the default), AdapTable will warn you at start-up if you have provided a value which does ​​not ​​match a column in the grid.
   *
   * If the [​`​​preventDuplicatePrimaryKeyValues​​`​](_src_adaptableoptions_generaloptions_.generaloptions.html#preventduplicateprimarykeyvalues​​) ​​property is true (the default), an error alert is triggered (and displayed) if a user attempts to enter a duplicate value into the Primary Key column.
   *
   * **Default Value: N/A**
   */
  primaryKey: string;

  /**
   * The name of the current AdapTable user.
   *
   * Strongly recommended to be set if using remote storages (via Server Options)
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
   * > If you are using ag-Grid and want to include Enterprise modules then you should add them to the `modules` property of ag-Grid.
   *
   * **Default Value: N/A**
   */
  vendorGrid?: any;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set, audit messages will send details of actions in AdapTable to an Audit destination.
   *
   * Each Audit message is a combination of an `AuditTrigger` and an `AuditDestination`, and packaged as a simple JSON object.
   *
   * You can set as many AuditTriggers as you want, and for each `AuditTrigger`, select as many AuditDestinations as you require.
   *
   * The 5 Audit Triggers are:
   *
   * - **CellEdit**: whenever a cell in AdapTable is changed as a result of user action
   *
   * - **TickingDataUpdate**: whenever the data in AdapTable is updated as a result of external action
   *
   * - **FunctionEvent**: whenever an AdapTable function is run (e.g. Quick Search, Smart Edit, Export)
   *
   * - **UserStateChange**: whenever a change is made to the User's state (e.g. selected a new layout)
   *
   * - **InternalStateChange**: whenever a change is made to AdapTable's internal state (e.g. new cells selected)
   *
   * The 4 possible Audit Destinations are:
   *
   * - **Http Channel**: If you choose this then you need to set up the channel, on which you can subsequently listen to Audit messages using your own internal reporting software (e.g. he Elastic Stack).
   *
   * - **Console**: Audits messages to the console - useful for testing, support and debug purposes
   *
   * - **Alert**: If you set this option for any Trigger, then you can should also choose the Type (e.g. 'Success', 'Info' etc) and whether to show it as a Popup.
   *
   * - **Event**: If selected, you will be able to listen to the the `Audit Event` using the {@link AuditEventApi|Audit Event Api}
   *
   */
  auditOptions?: AuditOptions;

  /**
   * Options to manage AdapTable charting.
   *
   * Primarily concerned with how and where charts appear.
   */
  chartOptions?: ChartOptions;

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
   * Options for running queries in AdapTable - known as an [Expression](https://api.adaptabletools.com/modules/_predefinedconfig_common_expression_.html)
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
   * Options for managing 'Team Sharing'
   *
   * This allows users to create Adaptable Objects and share with colleagues
   *
   * Includes 2 functions:
   *
   * - *getSharedEntities*: retrieves any available Shared Entities for the user to download
   *
   * - *setSharedEntities*: saves (essentially uploads) Shared Entities so they can be re-used by other members of the team
   *
   */
  teamSharingOptions?: TeamSharingOptions;

  /**
   * Options for managing the User Interface elements of AdapTable.
   *
   * Includes options for themes, menus, tool panels etc.
   */
  userInterfaceOptions?: UserInterfaceOptions;

  /**
   * Used for managing the AdapTable Plugins.
   *
   * These allow us to keep the download size of AdapTable manageable while allowing you to access only the functionality you need.
   *
   * There are currently 8 plugins:
   *
   * - `charts` - a powerful charting suite based on a package from Infragistics
   *
   * - `finance` - some additional finance-related features (e.g. for cell summaries)
   *
   * - `finsemble` - a plugin designed for using AdapTable with Finsemble from ChartIQ (currently empty)
   *
   * - `glue42` - a plugin with special functionality for working with Glue42, inclding 2-way live, validated Excel
   *
   * - `ipushpull` - features relating to ipushpull helping collaboration and data sharing
   *
   * - `master-detail-aggrid` - designed for when using the Master/Detail option in ag-Grid, so that all child grids are AdapTable instances
   *
   * - `nocode-aggrid` - powerful plugin whch enables the creation of new AdapTable instances (using ag-Grid) with no code required
   *
   * - `openfin` - designed for when using AdapTable inside the OpenFin container; contains custom functionality like 'Live Excel'
   */
  plugins?: AdaptablePlugin[];

  /**
   * The actual implementations of User Functions that users reference in Predefined Config.
   *
   * Predefined Config is stored as JSON - and often remotely - which means that it is not possible to store function implementations (as they are code and not strings, so cannot be serialised).
   *
   * Accordingly, the pattern we use in such cases is as follows:
   *
   * 1. The section in Predefined Config (e.g. CellSummary / OperationFunction) provides the **name** of the function
   *
   * 2. The `userFunctions` section of [AdaptableOptions](../modules/_src_adaptableoptions_userfunctions_.html#userfunction) contains the **implementation code** itself.
   *
   */
  userFunctions?: UserFunctions;

  /**
   * Predicate Definitions provided by Develoeprs at Design Time
   *
   * A Predicate Definition contains a number of properties of which the most important are:
   *
   * `id`: the unique identifier for the Predicate (a more friendly `label` can also be provided)
   *
   * `columnScope`: for which columns or DataTypes the Predicate can be applied
   *
   * `functionScope`: which AdapTable Functions can use this predicate (e.g. Filters, Conditional Styles, Alerts etc.)
   *
   * `inputs`: the definitions of any values the Predicate needs
   *
   * `handler`: the actual function that will run each time the Predicate is evaluated - it will receive a `PredicateDefHandlerParams' object and return a boolean
   *
   */
  customPredicateDefs?: AdaptablePredicateDef[];
}
