import { ApplicationApi } from './ApplicationAPI';
import { ActionColumnApi } from './ActionColumnApi';
import { SparklineColumnApi } from './SparklineColumnApi';
import { PartnerAPI } from './PartnerAPI';
import { AdvancedSearchApi } from './AdvancedSearchApi';
import { AlertApi } from './AlertApi';
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
import { DataSourceApi } from './DataSourceApi';
import { EntitlementApi } from './EntitlementApi';
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

/**
 * The Blotter API provides developers with run-time access to the Adaptable Blotter.
 *
 * It attempts to offer ALL the functionality provided by the Adaptable Blotter UI in code form.
 *
 * This enables developers to access the Adaptable Blotter Store at a run-time in a 'safe' way.
 *
 * It also allows them to access all the functionality in the Adaptable Blotter while bypassing the UI screens altogether if they so wish.
 *
 * *Note to Adaptable Blotter users: If there is a method missing that you would like implemented please contact support@adaptabletools.com*
 *
 * The Blotter API consists of over 40 sets of properties grouped against a particular function.
 *
 * Each of these properties is a class that contains a set of API method grouped either by Adaptable Blotter Function (e.g. *AdvancedSearchAPI*) or type (e.g. *AuditEventApi*)
 */

export interface BlotterApi {
  /**
   * Enables use of the Application Function which lets developers render their own toolbar and screen (if required).
   */
  applicationApi: ApplicationApi;

  /**
   * Provides access to the Action Column functionality, the *ActionColumn* object.
   */
  actionColumnApi: ActionColumnApi;

  /**
   * Provides access to the *Sparkline Column* functionality
   */
  sparklineColumnApi: SparklineColumnApi;

  /**
   * Enables developers to set up configuration when using our Partner tools (like iPushPull and Glue42)
   */
  partnerApi: PartnerAPI;

  /**
   * Provides access to the *Advanced Search* function, the *AdvancedSearch* object and [Advanced Search State](_predefinedconfig_runtimestate_advancedsearchstate_.advancedsearchstate.html).
   */
  advancedSearchApi: AdvancedSearchApi;

  /**
   * Provides access to the *Alert* function (enabling the displyaing of **Alerts**) and [Alerrt State](_predefinedconfig_runtimestate_alertstate_.alertstate.html).
   */
  alertApi: AlertApi;

  /**
   * Publishes the 3 Audit Events - *onAuditStateChanged*, *onAuditCellEdited* and *onAuditFunctionApplied*
   *
   * These Events are fired through **Audit Log** when the *auditAsEvent* property for any of these properties is set to **true**.
   */
  auditEventApi: AuditEventApi;

  /**
   * Provides access to the *Bulk Update* function and [Bulk Update State](_predefinedconfig_runtimestate_bulkupdatestate_.bulkupdatestate.html).
   */
  bulkUpdateApi: BulkUpdateApi;

  /**
   * Provides access to the *Calculated Column* function (enabling the creation of **Calculated Columns**) and [Calculated Column State](_predefinedconfig_runtimestate_calculatedcolumnstate_.calculatedcolumnstate.html).
   */
  calculatedColumnApi: CalculatedColumnApi;

  /**
   * Provides access to the *Calendar* function and [Calendar State](_predefinedconfig_runtimestate_calendarstate_.calendarstate.html).
   */
  calendarApi: CalendarApi;

  /**
   * Provides access to the *Cell Summary* function and [Cell Summary State](_predefinedconfig_runtimestate_cellsummarystate_.cellsummarystate.html).
   */
  cellSummaryApi: CellSummaryApi;

  /**
   * Provides access to the *Cell Validation* function, the *CellValidation* object and [Cell Validation State](_predefinedconfig_runtimestate_cellvalidationstate_.cellvalidationstate.html).
   */
  cellValidationApi: CellValidationApi;

  /**
   * Provides access to the *Chart* function, the various *Chart Definition* objects and [Chart State](_predefinedconfig_runtimestate_chartstate_.chartstate.html).
   */
  chartApi: ChartApi;

  /**
   * Provides access to the *Column Category* function, the *Column Category* object and [Column Category State](_predefinedconfig_runtimestate_columncategorystate_.columncategorystate.html).
   */
  columnCategoryApi: ColumnCategoryApi;

  /**
   * Provides access to the *Column Chooser* function.
   */
  columnChooserApi: ColumnChooserAPI;

  /**
   * Provides access to the *Column Filter* function, the *Column Filter* object and [Column Filter State](_predefinedconfig_runtimestate_columnfilterstate_.columnfilterstate.html).
   */
  columnFilterApi: ColumnFilterApi;

  /**
   * Methods that give access to the [Predefined Config](_predefinedconfig_runtimestate_columncategorystate_.columncategorystate.html), State and Store.
   */
  configApi: ConfigApi;

  /**
   * Provides access to the *Conditional Style* function, the *Conditional Style* object and [Conditional Style State](_predefinedconfig_runtimestate_conditionalstylestate_.conditionalstylestate.html).
   */
  conditionalStyleApi: ConditionalStyleApi;

  /**
   * Provides access to the *Custom Sort* function, the *Custom Sort* object and [Custom Sort State](_predefinedconfig_runtimestate_customsortstate_.customsortstate.html).
   */
  customSortApi: CustomSortApi;

  /**
   * Provides access to the *Dashboard* function, and [Dashboard State](_predefinedconfig_runtimestate_dashboardstate_.dashboardstate.html).
   */
  dashboardApi: DashboardApi;

  /**
   * Provides access to the *Data Source* function, the *Data Source* object and [Data Source State](_predefinedconfig_runtimestate_datasourcestate_.datasourcestate.html).
   */
  dataSourceApi: DataSourceApi;

  /**
   * Provides methods to manager User Entitlements (or Permissions)
   */
  entitlementApi: EntitlementApi;

  /**
   * The Api used for listenning / subscribing to the various Events fired / published by the Adaptable Blotter e.g. the SearchChanged event.
   */
  eventApi: EventApi;

  /**
   * Provides access to the *Export* function, the *Report* object and [Export State](_predefinedconfig_runtimestate_exportstate_.exportstate.html).
   */
  exportApi: ExportApi;

  /**
   * Provides access to the *Flashing Cell* function, the *Flashing Cell* object and [Flashing Cell State](_predefinedconfig_runtimestate_flashingcellstate_.flashingcellstate.html).
   */
  flashingCellApi: FlashingCellApi;

  /**
   * Provides access to the *Updated Row* function and [Updated Row State](_predefinedconfig_runtimestate_flashingcellstate_.flashingcellstate.html).
   */
  updatedRowApi: UpdatedRowApi;

  /**
   * Provides access to the *Format Column* function, the *Format Column* object and [Format Column State](_predefinedconfig_runtimestate_formatcolumnstate_.formatcolumnstate.html).
   */
  formatColumnApi: FormatColumnApi;

  /**
   * Provides access to the *FreeText Column* function, the *FreeText Column* object and [FreeText Column State](_predefinedconfig_runtimestate_freetextcolumnstate_.freetextcolumnstate.html).
   */
  freeTextColumnApi: FreeTextColumnApi;

  /**
   * Provides methods for managing the Grid directly e.g. setGridData which will replace the current DataSource with the one provided.
   */
  gridApi: GridApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_predefinedconfig_runtimestate_layoutstate_.layoutstate.html).
   */
  layoutApi: LayoutApi;

  /**
   * Provides access to the *Percent Bar* function, the *Percent Bar* object and [Percent Bar State](_predefinedconfig_runtimestate_percentbarstate_.percentbarstate.html).
   */
  percentBarApi: PercentBarApi;

  /**
   * Provides access to the *Plus Minus* function, the *Plus Minus* object and [Plus Minus State](_predefinedconfig_runtimestate_plusminusstate_.plusminusstate.html).
   */
  plusMinusApi: PlusMinusApi;

  /**
   * Provides access to the *Reminder* function, the *Reminder* object and [Reminder State](_predefinedconfig_runtimestate_reminderstate_.reminderstate.html).
   */
  reminderApi: ReminderApi;

  /**
   * Provides access to the *Quick Search* function, the *Quick Search* object and [Quick Search State](_predefinedconfig_runtimestate_quicksearchstate_.quicksearchstate.html).
   */
  quickSearchApi: QuickSearchApi;

  /**
   * Provides access to the *Shortcut* function, the *Shortcut* object and [Shortcut State](_predefinedconfig_runtimestate_shortcutstate_.shortcutstate.html).
   */
  shortcutApi: ShortcutApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_predefinedconfig_runtimestate_layoutstate_.layoutstate.html).
   */
  smartEditApi: SmartEditApi;

  /**
   * Provides access to [System Filter State](_predefinedconfig_runtimestate_systemfilterstate_.systemfilterstate.html) that manages the Filters that the Adaptable Blotter ships with.
   */
  systemFilterApi: SystemFilterApi;

  /**
   * Api methods related to the System Status button (shown in the Home Toolbar) that displays information about the health of the application.
   */
  systemStatusApi: SystemStatusApi;

  /**
   * Api methods related to Theme management and [Theme State](_predefinedconfig_runtimestate_themestate_.themestate.html).
   */
  themeApi: ThemeApi;

  /**
   * Provides access to [User Interface State](_predefinedconfig_runtimestate_userinterfacestate_.userinterfacestate.html) which allows you to set up colours, permitted values etc.
   */
  userInterfaceApi: UserInterfaceApi;

  /**
   * Provides access to the *User Filter* function, the *User Filter* object and [User Filter State](_predefinedconfig_runtimestate_userfilterstate_.userfilterstate.html).
   */
  userFilterApi: UserFilterApi;

  /**
   * API methods used internally within the Adaptable Blotter.
   *
   * **It is not recommended to use this section if using the Adaptable Blotter externally**
   */
  internalApi: InternalApi;

  namedFilterApi: NamedFilterApi;
}
