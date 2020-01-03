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

/**
 * `AdaptableOptions` is the object created by you at design-time injected into the Adaptable constructor at startup.
 *
 * **AdaptableOptions is the only argument used in Adaptable's static constructor.**
 *
 * `AdaptableOptions` provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * The `AdaptableOptions` class contains a few regular properties of which 2 (`vendorGrid` and `primaryKey`) are mandatory - and a number of `xxxOptions` properties where the type is itself a collection of related properties.
 *
 * Typically users will only populate a few of the properties in `AdaptableOptions`, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 *
 * The properties are
 *
 *  | Option  	                                                                              | Mandatory            | Details                                     	                |
 *  |----------------	                                                                        |-------------------	|---------------------------------------------	                |
 *  | [vendorGrid](_adaptableoptions_adaptableoptions_.adaptableoptions.html#vendorgrid)      | No	                | Underlying vendor grid object (e.g. GridOptions for ag-Grid)	|
 *  | [AdvancedSearch](_predefinedconfig_advancedsearchstate_.advancedsearchstate.html)   	  | Yes 	              | Create saveable multi-column searches with multiple criteria  |
 *  | [Alert](_predefinedconfig_alertstate_.alertstate.html)   	                              | Yes 	              | Provide Alert Definitions which will trigger run-time alerts  |
 *  | [Application](_predefinedconfig_applicationstate_.applicationstate.html)   	            | No	                | Save your own state as key / value pairs 	                    |
 *  | [BulkUpdate](_predefinedconfig__bulkupdatestate_.bulkupdatestate.html)   	              | Yes 	              | Update multiple cells in a column to contain a new value      |
 *  | [CalculatedColumn](_predefinedconfig_calculatedcolumnstate_.calculatedcolumn.html)   	  | Yes 	              | Create custom columns with dynamic values based on expression |
 *  | [Calendar](_predefinedconfig_calendarstate_.calendar.html)   	                          | Yes 	              | Select or provide your own calendar for dealing with holidays |
 *  | [CellSummary](_predefinedconfig_cellsummarystate_.cellsummarystate.html)   	            | Yes 	              | Choose which summary operations to see for selected cells     |
 *  | [CellValidation](_predefinedconfig_cellvalidationstate_.cellvalidationstate.html)     	| Yes 	              | Provide (complex) rules to validate cell edits                |
 *  | [Chart](_predefinedconfig_chartstate_.chartstate.html)   	                              | Yes 	              | Visualise grid data using a variety of different chart types  |
 *  | [ColumnCategory](_predefinedconfig_columncategorystate_.columncategorystate.html)       | Yes     	          | Group columns into category for easier column management      |
 *  | [ColumnFilter](_predefinedconfig_columnfilterstate_.columnfilterstate.html)             | Yes 	              | Supply your own filters for columns to findy your data easily |
 *  | [ConditionalStyle](_predefinedconfig_conditionalstylestate_.conditionalstylestate.html) | Yes 	              | Dynamically Style columns & rows according to rules provided  |
 *  | [CustomSort](_predefinedconfig_customsortstate_.customsortstate.html)                   | Yes 	              | Build your own sort orders for columns with non-standard sorts|
 *  | [Dashboard](_predefinedconfig_dashboardstate_.dashboardstate.html)                      | Yes 	              | Configure & populate the Dasboard area (abov the main grid)   |
 *  | [DataSource](_predefinedconfig_datasourcestate.datasourcestate.html)                    | Yes 	              | Provide Data Sources that will populate Grid via the server   |
 *  | [Entitlements](_predefinedconfig_entitlementstate_.entitlementstate.html)               | No	                | Manage permissions so users only see relevant functions       |
 *  | [Export](_predefinedconfig_exportstate_.exportstate.html)                               | Yes 	              | Create reports to export data from grid to numerous loctions  |
 *  | [FreeTextColumn](_predefinedconfig_freetextcolumnstate_.freetextcolumnstate.html)       | Yes 	              | Speical free entry columns (e.g. Comments) saved with state   |
 *  | [Layout](_predefinedconfig_layoutstate_.layoutstate.html)                               | Yes 	              | Named views of column sorts, order, pivots, visbility & groups|
 *  | [NamedFilter](_predefinedconfig_namedfilterstate_.namedfilterstate.html)                | No                  | Bespoke filters for which you provide a predicate function    |
 *  | [Partner](_predefinedconfig_partnerstate_.partnerstate.html)                            | No                  | State required for partners (e.g. iPushPull, OpenFin, Glue42) |
 *  | [QuickSearch](_predefinedconfig_quicksearchstate_.quicksearchstate.html)                | Yes 	              | Run a text based search across whole grid (using wildcards)   |
 *  | [Reminder](_predefinedconfig_reminderstate_.reminder.html)                              | Yes 	              | Schedule alerts to run to remind you of actions to perform    |
 *  | [Shortcut](_predefinedconfig_shortcutstate_.shortcutstate.html)                         | Yes 	              | Avoid fat finger issues by creating keyboard shortcuts        |
 *  | [SmartEdit](_predefinedconfig_smarteditstate_.smarteditstate.html)                      | Yes 	              | Update multiple numeric cells with a single maths operation   |
 *  | [SparklineColumn](_predefinedconfig_sparklinecolumnstate_.sparklinecolumnstate.html)    | No                  | See columns containing ranges of data as a sparkline          |
 *  | [SystemFilter](_predefinedconfig_systemfilterstate_.systemfilterstate.html)             | No                  | Select availability of System Filters (e.g. Today, Blanks)    |
 *  | [SystemStatus](_predefinedconfig_systemstatusstate_.systemstatusstate.html)             | No                  | Show Messages and Alerts describing curent Status of the App  |
 *  | [Theme](_predefinedconfig_themestate_.themestate.html)                                  | Yes                 | Select with shipped Theme is used or provide a custom one     |
 *  | [ToolPanel](_predefinedconfig_toolpanelstate_.toolpanelstate.html)                      | Yes                 | Manage Adaptable ToolPanel (the area to the right of grid)  |
 *  | [UpdatedRow](_predefinedconfig_updatedrowstate_.updatedrowstate.html)                   | Yes                 | Colour (and jump to) rows whose contents have changed         |
 *  | [UserFilter](_predefinedconfig_userfilterstate_.userfilterstate.html)                   | Yes                 | Create your own filters baseed on your data and requirements  |
 *  | [UserInterface](_predefinedconfig_userinterfacestate_.userinterfacestate.html)          | No                  | Provide your own menus, styles and colour palettes            |
 *
 *
 * This object when populated forms the **predefinedConfig** property in *adaptableOptions*.
 *
 */
export interface AdaptableOptions {
  /**
   * **MANDATORY property**
   *
   * This is the underlying vendor grid or grid object which Adaptable will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The `vendorGrid` object should contain all the column definitions and data sources required.
   *
   * Note: if you are using the *React Wrapper* or the *Angular Wrapper* then **you do not need to populate this property** (as `gridOptions` is a separate parameter).
   *
   * **Default Value: N/A**
   */
  vendorGrid?: any;

  /**
   * **MANDATORY property**
   *
   * The name of unique column in the grid
   *
   * Required for cell identification purpose when using Audit and other related functions.
   *
   * Note: The column does not need to be visible but it does need to exist in the grid's data source.
   *
   * **Default Value: N/A**
   */
  primaryKey: string;

  /**
   * Identifier for this instance of Adaptable
   *
   * Useful if Audit Log is turned on or you are using multiple grids
   *
   * **Note** it cannot contain a '.' (as this value is used to name styles which raises issues if it contains a full stop).
   *
   * The value provided here is also that used to name the *Home Toolbar* (the toolbar that appears first in the Dashboard on the left).
   *
   * **Default Value: adaptable_id**
   */

  adaptableId?: string;

  /**
   * The name of the current Adaptable user
   *
   * Strongly recommended to be set if using Config Server
   *
   * Also used in Audit Log to identify the current user who has made edits or changed state.
   *
   * **Default Value: anonymous**
   */
  userName?: string;

  /**
   * User State (a.ka. `predefinedConfig`) set at design-time and shipped with Adaptable for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default Value: undefined**
   */
  predefinedConfig?: PredefinedConfig | string;

  /**
   * Options for setting the *Div elements* in which Adaptable and the underlying grid are placed.
   *
   * Also allows you to set where popups appear relative to the page and where charts are displayed.
   */
  containerOptions?: ContainerOptions;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set audit messages will send details of actions in Adaptable to an Audit destination.
   *
   * You can choose to listen to any mixture of Audits for: **CellEdit**, **TickingDataChange**, **FunctionEvent**, **UserStateChange** and **InternalStateChange**.
   *
   * You additionally choose to send each audit message (which is packaged as a simple JSON object) to any mixture of: **Http Channel**, **Console**, **Alert** or **Event**.
   *
   * If you select HttpChannel, you can subsequently see these message using reporting software such as the Elastic Stack.
   */
  auditOptions?: AuditOptions;

  /**
   * Options for setting Config Server.
   *
   * This feature allows for storing user state remotely (as opposed to in local storage, which is the default).
   */
  configServerOptions?: ConfigServerOptions;

  /**
   * Options for running queries (or Expressions) in Adaptable.
   *
   * Lets you specify how (and how many) values are returned when doing a column lookup, how to deal with case and what is in the Query.
   *
   * Also includes a callback function allowing devs to populate column lookups dynamically.
   */
  queryOptions?: QueryOptions;

  /**
   * Options related to Editing in Adaptable.
   *
   * Includes a function enabling you to perform custom validation when a cell changes values.
   */
  editOptions?: EditOptions;

  /**
   * Options related to Layouts (ie. saveable views of column order, visibility and sort).
   *
   * Includes properties for whether to include vendor state in the Layout (e.g. Column Grouping) and whether layouts shoudl save automatically on clicking save.
   */
  layoutOptions?: LayoutOptions;

  /**
   * Related to creating and managing filters in Adaptable.
   *
   * Includes options concerning whether to use Adaptable's filters (or those provided by the vendor grid).
   *
   * Also contains options to set if, how and when the Grid should repaint and refilter after user data edits and ticking data edits.
   */
  filterOptions?: FilterOptions;

  /**
   * Options to manage Adaptable charting.
   *
   * Primarily concerned with how and where charts appear.
   */
  chartOptions?: ChartOptions;

  /**
   * General options to manage  Adaptable.
   *
   * Essentially those options that didn't fit into of the specific categories.
   *
   * Includes options for managing Server Searching, and how to manage Primary Keys.
   */
  generalOptions?: GeneralOptions;

  /**
   * Options for managing the User Interface Adaptable.
   *
   * Includes options for themes, menus, tool panels etc.
   */
  userInterfaceOptions?: UserInterfaceOptions;

  /**
   * Options related to state hydration/dehydration - allows users to intercept state persistence and state loading.
   *
   * By default, Adaptable state is persisted in the local storage of the user browser, under the `adaptableId` key.
   *
   * Using various state options allows you to change this default behavior and also add custom properties in the persisted state.
   *
   */
  stateOptions?: StateOptions;

  /**
   * Used by the Adaptable Plug-ins (e.g. Charting, Finance etc)
   *
   * **These should not be provided by users at design-time**
   */
  plugins?: AdaptablePlugin[];
}
