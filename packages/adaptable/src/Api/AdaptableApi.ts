import { ActionColumnApi } from './ActionColumnApi';
import { SparklineColumnApi } from './SparklineColumnApi';
import { AlertApi } from './AlertApi';
import { PluginsApi } from './PluginsApi';
import { AuditEventApi } from './AuditEventApi';
import { BulkUpdateApi } from './BulkUpdateApi';
import { CalculatedColumnApi } from './CalculatedColumnApi';
import { CalendarApi } from './CalendarApi';
import { CellSummaryApi } from './CellSummaryApi';
import { CellValidationApi } from './CellValidationApi';
import { ChartApi } from './ChartApi';
import { ConfigApi } from './ConfigApi';
import { ConditionalStyleApi } from './ConditionalStyleApi';
import { CustomSortApi } from './CustomSortApi';
import { DashboardApi } from './DashboardApi';
import { ToolPanelApi } from './ToolPanelApi';
import { DataSourceApi } from './DataSourceApi';
import { EntitlementsApi } from './EntitlementsApi';
import { EventApi } from './EventApi';
import { ExportApi } from './ExportApi';
import { FlashingCellApi } from './FlashingCellApi';
import { UpdatedRowApi } from './UpdatedRowApi';
import { FormatColumnApi } from './FormatColumnApi';
import { FreeTextColumnApi } from './FreeTextColumnApi';
import { LayoutApi } from './LayoutApi';
import { PercentBarApi } from './PercentBarApi';
import { PlusMinusApi } from './PlusMinusApi';
import { ReminderApi } from './ReminderApi';
import { QuickSearchApi } from './QuickSearchApi';
import { ShortcutApi } from './ShortcutApi';
import { SmartEditApi } from './SmartEditApi';
import { FilterApi } from './FilterApi';
import { SystemStatusApi } from './SystemStatusApi';
import { ThemeApi } from './ThemeApi';
import { UserInterfaceApi } from './UserInterfaceApi';
import { InternalApi } from './InternalApi';
import { GridApi } from './GridApi';
import { ScheduleApi } from './ScheduleApi';
import { GradientColumnApi } from './GradientColumnApi';
import { QueryApi } from './QueryApi';
import { TeamSharingApi } from './TeamSharingApi';
import { ColumnApi } from './ColumnApi';
import { ApplicationApi } from './AppApi';
import { ScopeApi } from './ScopeApi';

/**
 *
 * The `AdaptableApi` provides developers with run-time access to AdapTable.
 *
 * It offers ALL the functionality provided by the AdapTable UI through code.
 *
 * This enables developers to access the AdapTable Store, and all AdapTable functionality, at run-time in a 'safe' way.
 *
 * It also allows them to bypass the UI screens altogether if they so wish.
 *
 * `The AdaptableApiApi is essentially just a wrapper around the AdapTable Store but provides additional error-checking, logging, and auditing. And it also ensures that the immutable "purity" of the store is maintained.`
 *
 * *Note to AdapTable users: If there is a method missing from `AdaptableApi` that you would like implemented, please contact [`support@adaptabletools.com`](mailto:support@adaptabletools.com) and we will add it*
 *
 * #### Accessing the AdaptableApi
 *
 * The AdaptableApi is the only object returned by the AdapTable static constructor.
 *
 * If you are using one of the Framework Wrappers then the AdaptableApi is available to you through the [AdaptableReady](interfaces/_src_api_eventapi_.eventapi.html) event.
 *
 * ### Api functions
 *
 * `AdaptableApi` consists of over 50 sets of properties.
 *
 * Most of these properties are each a class that contains a set of Api methods grouped either by AdapTable Function (e.g. `ConditionalStyleApi`) or type (e.g. `AuditEventApi`)
 *
 * In addition there are a few api classes designed primarily for internal use which deal with how AdapTable itself works (e.g. `gridApi`, `columnApi`, `gridApi`)
 *
 * #### Function-Related Api classes
 *
 *  | Api Class  	                                    | Details                                     	                                                                            |
 *  |----------------	                                |---------------------------------------------	                                                                            |
 *  | [actionColumnApi](#actioncolumnapi)             | Manages {@link ActionColumnState|Action Columns} which contain buttons with bespoke click logic	    |
 *  | [queryApi](#queryapi)         | Functions relating to the saveable, cross-column Queries  |
 *  | [alertApi](#alertapi)                           | {@link AlertState|Adaptable Alerts} provide bespoke notifications and messages                                 |
 *  | [applicationApi](#applicationapi)               | Use {@link ApplicationState|Application Data Entries} to manage custom state and data |
 *  | [auditEventApi](#auditeventapi)                 | Listen to the [Audit Events](_src_api_auditeventapi_.auditeventapi.html) published by the Audit Log           |
 *  | [bulkUpdateApi](#bulkupdateapi)                 | Run Bulk Update so mutliple selected cells are given same value  |
 *  | [calculatedColumnApi](#calculatedcolumnapi)     | Manages [Calculated Columns](_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html) which contain custom expresssions |
 *  | [calendarApi](#calendarapi)                     | Allows you to choose which [Calendar](_src_predefinedconfig_calendarstate_.calendarstate.html) AdapTable will use in its date filters |
 *  | [cellSummaryApi](#cellsummaryapi)               | Choose which [Cell Summaries](_src_predefinedconfig_cellsummarystate_.cellsummarystate.html) to display when cells are selected |
 *  | [cellValidationApi](#cellvalidationapi)         | Manages the [Cell Validation](_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html) function so that Grid cell edits are validated |
 *  | [chartApi](#chartapi)                           | Deals with the [Chart](_src_predefinedconfig_chartstate_.chartstate.html) functionality (available through a plugin) |
 *  | [columnChooserApi](#columnchooserapi)           | Popup which allows you quickly to order / hide Columns in the Grid|
 *  | [conditionalStyleApi](#conditionalstyleapi)     | Set bespoke [Conditional Styles](_src_predefinedconfig_conditionalstylestate_.conditionalstylestate.html)for rows and columns depending on cell data|
 *  | [customSortApi](#customsortapi)                 | Manages {@link CustomSortState|Custom Sorts} allowing bespoke column sorting|
 *  | [dashboardApi](#dashboardapi)                   | Large series of functions allowing full customisation of Adaptable [Dashboard](_src_predefinedconfig_dashboardstate_.dashboardstate.html)|
 *  | [dataSourceApi](#datasourceapi)                 | Deals with [Data Sources](_src_predefinedconfig_datasourcestate_.datasourcestate.html) used in Server Searching|
 *  | [exportApi](#exportapi)                         | Run reports either manually or at scheduled times|
 *  | [flashingCellApi](#flashingcellapi)             | Manages the [Flashing Cell](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_flashingcellstate_.flashingcellstate.html) |
 *  | [freeTextColumnApi](#freetextcolumnapi)         | Configures {@link FreeTextColumnState|FreeText Columns} - special columns containing bespoke data|
 *  | [gradientColumnApi](#gradientcolumnapi)         | Aids creation of visual {@link GradientColumnState|Gradient Columns} |
 *  | [layoutApi](#layoutapi)                         | Manages {@link LayoutState|Layouts} - sets of column order and visibility|
 *  | [percentBarApi](#percentbarapi)                 | Aids creation and editing of visual {@link PercentBarState: Percent Bars} |
 *  | [quickSearchApi](#quicksearchapi)               | Functions for running and clearing Quick Search|
 *  | [reminderApi](#reminderapi)                     | Manages Reminders (scheduled Alerts) |
 *  | [scheduleApi](#scheduleapi)                     | Supports {@link ScheduleState|Schedules} for running Actions at set time|
 *  | [shortcutApi](#shortcutapi)                     | Deals with {@link ShortcutState|Shortcuts} for faster & safer data entry|
 *  | [smartEditApi](#smarteditapi)                   | Functions for managing the Smart Edit function to enable better editing|
 *  | [sparklineColumnApi](#sparklinecolumnapi)       | For {@link SparklineColumnState|Sparkline Columns} - ideal for historical or array-based data|
 *  | [filterApi](#filterapi)             | Manages various filters provided by AdapTable
 *  | [systemStatusApi](#systemstatusapi)             | Manages how the System Status function will display run-time messages|
 *  | [themeApi](#themeapi)                           | Deals with {@link ThemeState|Themes} both AdapTable and Custom|
 *  | [toolPanelApi](#toolpanelapi)                   | Functions for working with the AdapTable Tool Panel|
 *  | [updatedRowApi](#updatedrowapi)                 | Manges {@link UpdatedRowState|Updated Rows} which indicated which rows have updated|
 *  | [userFilterApi](#userfilterapi)                 | Functions dealing with {@link UserFilterState| Custom User Filters} |
 *
 * #### General Api classes
 *
 *  | Api Class  	                                    | Details                                     	                                                                            |
 *  |----------------	                                |---------------------------------------------	                                                                            |
 *  | [columnApi](#columnapi)                         | Large number of column-related functions|
 *  | [configApi](#configapi)                         | Series of functions managing [Predefined Config](_src_predefinedconfig_predefinedconfig_.predefinedconfig.html) and User State|
 *  | [entitlementsApi](#entitlementsapi)             | Manages User {@link EntitlementState|Entitlements} (essentially Permissions)|
 *  | [eventApi](#eventapi)                           | Subscribe to some of the many Events that AdapTable fires|
 *  | [gridApi](#gridapi)                             | Series of Grid-management related functions e.g. get/set data|
 *  | [internalapi](#internalapi)                     | Used for **internal purposes only** - not designed for external use |
 *  | [pluginsApi](#pluginsapi)                       | Series of functions for when using Plugins|
 *  | [scopeApi](#scopeapiapi)                        | Many methods to manage the {@link Scope|Scope} object|
 *  | [userInterfaceApi](#userinterfaceapiapi)        | Many properties & methods to manage the {@link UserInterfaceState|User Interface}|
 *
 */
export interface AdaptableApi {
  /**
   * Provides access to the Action Column functionality, the *ActionColumn* object.
   */
  actionColumnApi: ActionColumnApi;

  /**
   * Provides access to the *Alert* function (enabling the displaying of **Alerts**) and [Alerrt State](_src_predefinedconfig_configstate_alertstate_.alertstate.html).
   */
  alertApi: AlertApi;

  /**
   * Enables use of the Application Function which lets developers render their own toolbar and screen (if required).
   */
  applicationApi: ApplicationApi;

  /**
   * Publishes the 3 Audit Events - *onAuditStateChanged*, *onAuditCellEdited* and *onAuditFunctionApplied*
   *
   * These Events are fired through **Audit Log** when the *auditAsEvent* property for any of these properties is set to **true**.
   */
  auditEventApi: AuditEventApi;

  /**
   * Provides access to the *Bulk Update* function and [Bulk Update State](_src_predefinedconfig_configstate_bulkupdatestate_.bulkupdatestate.html).
   */
  bulkUpdateApi: BulkUpdateApi;

  /**
   * Provides access to the *Calculated Column* function (enabling the creation of **Calculated Columns**) and [Calculated Column State](_src_predefinedconfig_configstate_calculatedcolumnstate_.calculatedcolumnstate.html).
   */
  calculatedColumnApi: CalculatedColumnApi;

  /**
   * Provides access to the *Calendar* function and [Calendar State](_src_predefinedconfig_configstate_calendarstate_.calendarstate.html).
   */
  calendarApi: CalendarApi;

  /**
   * Provides access to the *Cell Summary* function and [Cell Summary State](_src_predefinedconfig_configstate_cellsummarystate_.cellsummarystate.html).
   */
  cellSummaryApi: CellSummaryApi;

  /**
   * Provides access to the *Cell Validation* function, the *CellValidation* object and [Cell Validation State](_src_predefinedconfig_configstate_cellvalidationstate_.cellvalidationstate.html).
   */
  cellValidationApi: CellValidationApi;

  /**
   * Provides access to the *Chart* function, the various *Chart Definition* objects and [Chart State](_src_predefinedconfig_configstate_chartstate_.chartstate.html).
   */
  chartApi: ChartApi;

  /**
   * Provides a number of column-related methods
   */
  columnApi: ColumnApi;

  /**
   * Methods that give access to the Adaptable State and Store.
   */
  configApi: ConfigApi;

  /**
   * Provides access to the *Conditional Style* function, the *Conditional Style* object and [Conditional Style State](_src_predefinedconfig_configstate_conditionalstylestate_.conditionalstylestate.html).
   */
  conditionalStyleApi: ConditionalStyleApi;

  /**
   * Provides access to the *Custom Sort* function, the *Custom Sort* object and [Custom Sort State](_src_predefinedconfig_configstate_customsortstate_.customsortstate.html).
   */
  customSortApi: CustomSortApi;

  /**
   * Provides access to the *Dashboard* function, and [Dashboard State](_src_predefinedconfig_configstate_dashboardstate_.dashboardstate.html).
   */
  dashboardApi: DashboardApi;

  /**
   * Provides access to the *Data Source* function, the *Data Source* object and [Data Source State](_src_predefinedconfig_configstate_datasourcestate_.datasourcestate.html).
   */
  dataSourceApi: DataSourceApi;

  /**
   * Provides methods to manager User Entitlements (or Permissions)
   */
  entitlementsApi: EntitlementsApi;

  /**
   * The Api used for listenning / subscribing to the various Events fired / published by AdapTable e.g. the SearchChanged event.
   */
  eventApi: EventApi;

  /**
   * Provides access to the *Export* function, the *Report* object and [Export State](_src_predefinedconfig_configstate_exportstate_.exportstate.html).
   */
  exportApi: ExportApi;

  /**
   * Provides access to the *Flashing Cell* function, the *Flashing Cell* object and [Flashing Cell State](_src_predefinedconfig_configstate_flashingcellstate_.flashingcellstate.html).
   */
  flashingCellApi: FlashingCellApi;

  /**
   * Provides access to the *Format Column* function, the *Format Column* object and [Format Column State](_src_predefinedconfig_configstate_formatcolumnstate_.formatcolumnstate.html).
   */
  formatColumnApi: FormatColumnApi;

  /**
   * Provides access to the *FreeText Column* function, the *FreeText Column* object and [FreeText Column State](_src_predefinedconfig_configstate_freetextcolumnstate_.freetextcolumnstate.html).
   */
  freeTextColumnApi: FreeTextColumnApi;

  /**
   * Provides access to the *Gradient Column* function, the *Gradient Column* object and [Gradient Column State](_src_predefinedconfig_configstate_gradientcolumnstate_.gradientcolumnstate.html).
   */
  gradientColumnApi: GradientColumnApi;

  /**
   * Provides methods for managing the Grid directly e.g. setGridData which will replace the current DataSource with the one provided.
   */
  gridApi: GridApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_src_predefinedconfig_configstate_layoutstate_.layoutstate.html).
   */
  layoutApi: LayoutApi;

  /**
   * Provides access to the *Percent Bar* function, the *Percent Bar* object and [Percent Bar State](_src_predefinedconfig_configstate_percentbarstate_.percentbarstate.html).
   */
  percentBarApi: PercentBarApi;

  /**
   * Provides access to the *Plus Minus* function, the *Plus Minus* object and [Plus Minus State](_src_predefinedconfig_configstate_plusminusstate_.plusminusstate.html).
   */
  plusMinusApi: PlusMinusApi;

  /**
   * Provides access to the **Plugins** functionality of AdapTable - currently 8 in total including *Charting* and *Finance* and with more to come in due course.
   *
   * Use this api to get hold of the api for any plugins (i.e. for ipushpull, OpenFin etc)
   *
   * e.g. to get the ipushpull Api do:
   *
   * ```ts
   *
   * const ipushpullApi: IPushPullApi = adaptableApi.pluginsApi.getPluginApi('ipushpull');
   *
   * ```
   */
  pluginsApi: PluginsApi;

  /**
   * Provides access to the *Quick Search* function, the *Quick Search* object and [Quick Search State](_src_predefinedconfig_configstate_quicksearchstate_.quicksearchstate.html).
   */
  quickSearchApi: QuickSearchApi;

  /**
   * Provides access to the *Reminder* function
   */
  reminderApi: ReminderApi;

  /**
   * Provides access to the *Schedule* function which allows you to create schedules for Reminders, Reports and ipushpull.
   */
  scheduleApi: ScheduleApi;

  /**
   * Provides access to the *Shortcut* function, the *Shortcut* object and [Shortcut State](_src_predefinedconfig_configstate_shortcutstate_.shortcutstate.html).
   */
  shortcutApi: ShortcutApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_src_predefinedconfig_configstate_layoutstate_.layoutstate.html).
   */
  smartEditApi: SmartEditApi;

  /**
   * Provides access to the *Sparkline Column* functionality
   *
   * Only used if the Charts Plugin has been enabled.
   */
  sparklineColumnApi: SparklineColumnApi;

  /**
   * Provides access to [System Filter State](_src_predefinedconfig_configstate_systemfilterstate_.systemfilterstate.html) that manages the Filters that AdapTable ships with.
   */
  filterApi: FilterApi;

  /**
   * Api methods related to the System Status function which displays information about the health of the application.
   */
  systemStatusApi: SystemStatusApi;

  /**
   * Api methods related to Theme management and [Theme State](_src_predefinedconfig_configstate_themestate_.themestate.html).
   */
  themeApi: ThemeApi;

  /**
   * Provides access to the *ToolPanel* function, and [ToolPanel State](_src_predefinedconfig_configstate_toolpanelstate_.toolpanelstate.html).
   */
  toolPanelApi: ToolPanelApi;

  /**
   * Provides access to the *Updated Row* function and [Updated Row State](_src_predefinedconfig_configstate_flashingcellstate_.flashingcellstate.html).
   */
  updatedRowApi: UpdatedRowApi;

  /**
   * Provides access to [User Interface State](_src_predefinedconfig_configstate_userinterfacestate_.userinterfacestate.html) which allows you to set up colours, permitted values etc.
   */
  userInterfaceApi: UserInterfaceApi;

  queryApi: QueryApi;

  teamSharingApi: TeamSharingApi;

  scopeApi: ScopeApi;

  /**
   * Api methods used *internally* within AdapTable.
   *
   * **This api class is not intended for developers to use and it is not recommended to use this section if accessing AdapTable at runtime through code**
   *
   */
  internalApi: InternalApi;

  /**
   * Cleanup method - should be called only when using the vanilla javascript component, as framework components cleanup is performed when the component is destroyed/unmounted.
   */
  destroy: (config?: { unmount: boolean; destroyApi?: boolean }) => void;
}
