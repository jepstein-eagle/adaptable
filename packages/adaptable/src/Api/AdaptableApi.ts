import { ActionColumnApi } from './ActionColumnApi';
import { SparklineColumnApi } from './SparklineColumnApi';
import { AdvancedSearchApi } from './AdvancedSearchApi';
import { AlertApi } from './AlertApi';
import { PluginsApi } from './PluginsApi';
import { AuditEventApi } from './AuditEventApi';
import { BulkUpdateApi } from './BulkUpdateApi';
import { CalculatedColumnApi } from './CalculatedColumnApi';
import { CalendarApi } from './CalendarApi';
import { CellSummaryApi } from './CellSummaryApi';
import { CellValidationApi } from './CellValidationApi';
import { ChartApi } from './ChartApi';
import { ColumnCategoryApi } from './ColumnCategoryApi';
import { ColumnChooserAPI } from './ColumnChooserAPI';
import { ColumnFilterApi } from './ColumnFilterApi';
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
import { SystemFilterApi } from './SystemFilterApi';
import { SystemStatusApi } from './SystemStatusApi';
import { ThemeApi } from './ThemeApi';
import { UserInterfaceApi } from './UserInterfaceApi';
import { UserFilterApi } from './UserFilterApi';
import { InternalApi } from './InternalApi';
import { NamedFilterApi } from './NamedFilterApi';
import { GridApi } from './GridApi';
import { Glue42Api } from './Glue42Api';
import { ScheduleApi } from './ScheduleApi';
import { GradientColumnApi } from './GradientColumnApi';
import { ApplicationApi } from './ApplicationAPI';

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
 * `The AdaptableAPI is essentially just a wrapper around the AdapTable Store but provides additional error-checking, logging, and auditing. And it also ensures that the immutable "purity" of the store is maintained.`
 *
 * *Note to AdapTable users: If there is a method missing from `AdaptableApi` that you would like implemented, please contact [`support@adaptabletools.com`](mailto:support@adaptabletools.com) and we will add it*
 *
 * #### Accessing the AdaptableApi
 *
 * The AdaptableApi is the only object returned by the AdapTable static constructor.
 *
 * If you are using one of the Framework Wrappers then the AdaptableApi is available to you through the [AdaptableReady](interfaces/_src_api_eventapi_.eventapi.html) event.
 *
 * ### API functions
 *
 * `AdaptableApi` consists of over 50 sets of properties.
 *
 * Each of these properties is a class that contains a set of Api methods grouped either by AdapTable Function (e.g. `AdvancedSearchAPI`) or type (e.g. `AuditEventApi`)
 *
 * The full list is:
 *
 *  | API Class  	                                    | Details                                     	                                                                            |
 *  |----------------	                                |---------------------------------------------	                                                                            |
 *  | [actionColumnApi](#actioncolumnapi)             | Manages {@link ActionColumnState|Action Columns} which contain buttons with bespoke click logic	    |
 *  | [advancedSearchApi](#advancedsearchapi)         | Functions relating to the saveable, cross-column {@link AdvancedSearchState|Advanced Searches}  |
 *  | [alertApi](#alertapi)                           | {@link AlertState|Adaptable Alerts} provide bespoke notifications and messages                                 |
 *  | [applicationApi](#applicationapi)               | Use {@link ApplicationState|Application Data Entries} to manage custom state and data |
 *  | [auditEventApi](#auditeventapi)                 | Listen to the [Audit Events](_src_api_auditeventapi_.auditeventapi.html) published by the Audit Log           |
 *  | [bulkUpdateApi](#bulkupdateapi)                 | Run Bulk Update so mutliple selected cells are given same value  |
 *  | [calculatedColumnApi](#calculatedcolumnapi)     | Manages [Calculated Columns](_src_predefinedconfig_calculatedcolumnstate_.calculatedcolumnstate.html) which contain custom expresssions |
 *  | [calendarApi](#calendarapi)                     | Allows you to choose which [Calendar](_src_predefinedconfig_calendarstate_.calendarstate.html) AdapTable will use in its date filters |
 *  | [cellSummaryApi](#cellsummaryapi)               | Choose which [Cell Summaries](_src_predefinedconfig_cellsummarystate_.cellsummarystate.html) to display when cells are selected |
 *  | [cellValidationApi](#cellvalidationapi)         | Manages the [Cell Validation](_src_predefinedconfig_cellvalidationstate_.cellvalidationstate.html) function so that Grid cell edits are validated |
 *  | [chartApi](#chartapi)                           | Deals with the [Chart](_src_predefinedconfig_chartstate_.chartstate.html) functionality (available through a plugin) |
 *  | [columnCategoryApi](#columncategoryapi)         | Arranges columns into [Column Categories](_src_predefinedconfig_columncategorystate_.columncategorystate.html) (i.e. groups) |
 *  | [columnChooserApi](#columnchooserapi)           | Popup which allows you quickly to order / hide Columns in the Grid|
 *  | [columnFilterApi](#columnfilterapi)             | Manages [Column Filters](_src_predefinedconfig_columnfilterstate_.columnfilterstate.html), allowing run-time code access to filtering|
 *  | [conditionalStyleApi](#conditionalstyleapi)     | Set bespoke [Conditional Styles](_src_predefinedconfig_conditionalstylestate_.conditionalstylestate.html)for rows and columns depending on cell data|
 *  | [configApi](#configapi)                         | Series of functions managing [Predefined Config](_src_predefinedconfig_predefinedconfig_.predefinedconfig.html) and User State|
 *  | [customSortApi](#customsortapi)                 | Manages {@link CustomSortState|Custom Sorts} allowing bespoke column sorting|
 *  | [dashboardApi](#dashboardapi)                   | Large series of functions allowing full customisation of the Adaptable [Dashboard](_src_predefinedconfig_dashboardstate_.dashboardstate.html)|
 *  | [dataSourceApi](#datasourceapi)                 | Deals with [Data Sources](_src_predefinedconfig_datasourcestate_.datasourcestate.html) used in Server Searching|
 *  | [entitlementsApi](#entitlementsapi)             | Manages User {@link EntitlementState|Entitlements} (essentially Permissions)|
 *  | [eventApi](#eventapi)                           | Subscribe to some of the many Events that AdapTable fires|
 *  | [exportApi](#exportapi)                         | Run reports either manually or at scheduled times|
 *  | [flashingCellApi](#flashingcellapi)             | Manages the [Flashing Cell](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_flashingcellstate_.flashingcellstate.html) |
 *  | [freeTextColumnApi](#freetextcolumnapi)         | Configures {@link FreeTextColumnState|FreeText Columns} - special columns containing bespoke data|
 *  | [glue42Api](#glue42api)                         | Runs {@link Glue42State|Glue42} partner integration |
 *  | [gradientColumnApi](#gradientcolumnapi)         | Aids creation of visual {@link GradientColumnState|Gradient Columns} |
 *  | [gridApi](#gridapi)                             | Series of Grid-management related functions e.g. get/set data|
 *  | [ipushpullApi](#ipushpullapi)                   | Runs {@link IPushPullState|ipushpull} partner integration ||
 *  | [internalapi](#internalapi)                     | Used for **internal purposes only** - not designed for external use |
 *  | [layoutApi](#layoutapi)                         | Manages {@link LayoutState|Layouts} - sets of column order and visibility|
 *  | [namedFilterApi](#namedfilterapi)         | |
 *  | [percentBarApi](#percentbarapi)         | |
 *  | [pluginsApi](#pluginsapi)         | |
 *  | [quickSearchApi](#quicksearchapi)         | |
 *  | [reminderApi](#reminderapi)         | |
 *  | [scheduleApi](#scheduleapi)         | |
 *  | [shortcutApi](#shortcutapi)         | |
 *  | [smartEditApi](#smarteditapi)         | |
 *  | [sparklineColumnApi](#sparklinecolumnapi)         | |
 *  | [systemFilterApi](#systemfilterapi)         | |
 *  | [systemStatusApi](#systemstatusapi)         | |
 *  | [themeApi](#themeapi)         | |
 *  | [toolPanelApi](#toolpanelapi)         | |
 *  | [updatedRowApi](#updatedrowapi)         | |
 *  | [userFilterApi](#userfilterapi)         | |
 *  | [userInterfaceApi](#userinterfaceapiapi)         | |
 *  |
 */
export interface AdaptableApi {
  /**
   * Provides access to the Action Column functionality, the *ActionColumn* object.
   */
  actionColumnApi: ActionColumnApi;

  /**
   * Provides access to the *Advanced Search* function, the *AdvancedSearch* object and [Advanced Search State](_src_predefinedconfig_configstate_advancedsearchstate_.advancedsearchstate.html).
   */
  advancedSearchApi: AdvancedSearchApi;

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
   * Provides access to the *Column Category* function, the *Column Category* object and [Column Category State](_src_predefinedconfig_configstate_columncategorystate_.columncategorystate.html).
   */
  columnCategoryApi: ColumnCategoryApi;

  /**
   * Provides access to the *Column Chooser* function.
   */
  columnChooserApi: ColumnChooserAPI;

  /**
   * Provides access to the *Column Filter* function, the *Column Filter* object and [Column Filter State](_src_predefinedconfig_configstate_columnfilterstate_.columnfilterstate.html).
   */
  columnFilterApi: ColumnFilterApi;

  /**
   * Methods that give access to the [Predefined Config](_src_predefinedconfig_configstate_columncategorystate_.columncategorystate.html), State and Store.
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
   *  Provides access to *Glue42* related functionality, the *Glue42* object and [Glue42 State](_src_predefinedconfig_glue42state_.glue42.html).
   */
  glue42Api: Glue42Api;

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
   * Provides access to the *Named Filter* function, the `NamedFilter` object and [NamedFilter State](_src_predefinedconfig_configstate_namedfilterstate_.namedfilterstate.html).
   */
  namedFilterApi: NamedFilterApi;

  /**
   * Provides access to the *Percent Bar* function, the *Percent Bar* object and [Percent Bar State](_src_predefinedconfig_configstate_percentbarstate_.percentbarstate.html).
   */
  percentBarApi: PercentBarApi;

  /**
   * Provides access to the *Plus Minus* function, the *Plus Minus* object and [Plus Minus State](_src_predefinedconfig_configstate_plusminusstate_.plusminusstate.html).
   */
  plusMinusApi: PlusMinusApi;

  /**
   * Provides access to the **Plugins** functionality of AdapTable - currently *Charting* and *Finance*, but with more to come in due course.
   */
  pluginsApi: PluginsApi;

  /**
   * Provides access to the *Quick Search* function, the *Quick Search* object and [Quick Search State](_src_predefinedconfig_configstate_quicksearchstate_.quicksearchstate.html).
   */
  quickSearchApi: QuickSearchApi;

  /**
   * Provides access to the *Reminder* function, the *Reminder* object and [Reminder State](_src_predefinedconfig_configstate_reminderstate_.reminderstate.html).
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
  systemFilterApi: SystemFilterApi;

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

  /**
   * Provides access to the *User Filter* function, the *User Filter* object and [User Filter State](_src_predefinedconfig_configstate_userfilterstate_.userfilterstate.html).
   */
  userFilterApi: UserFilterApi;

  /**
   * API methods used internally within AdapTable.
   *
   * **This api class is not intended for developers to use and it is not recommended to use this section if accessing AdapTable at runtime through code**
   *
   */
  internalApi: InternalApi;

  /**
   * Cleanup method - should be called only when using the vanilla javascript component, as framework components cleanup is performed when the component is destroyed/unmounted.
   */
  destroy: () => void;
}
