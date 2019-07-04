import { ICellValidationApi } from './ICellValidationApi';
import { IColumnFilterApi } from './IColumnFilterApi';
import { IAdvancedSearchApi } from './IAdvancedSearchApi';
import { IAlertApi } from './IAlertApi';
import { ICalculatedColumnApi } from './ICalculatedColumnApi';
import { ICalendarApi } from './ICalendarApi';
import { IColumnCategoryApi } from './IColumnCategoryApi';
import { IConfigApi } from './IConfigApi';
import { IDashboardApi } from './IDashboardApi';
import { IDataSourceApi } from './IDataSourceApi';
import { IEntitlementApi } from './IEntitlementApi';
import { IEventApi } from './IEventApi';
import { IExportApi } from './IExportApi';
import { IFormatColumnApi } from './IFormatColumnApi';
import { IFreeTextColumnApi } from './IFreeTextColumnApi';
import { IGridApi } from './IGridApi';
import { ILayoutApi } from './ILayoutApi';
import { IPercentBarApi } from './IPercentBarApi';
import { IQuickSearchApi } from './IQuickSearchApi';
import { IShortcutApi } from './IShortcutApi';
import { ISmartEditApi } from './ISmartEditApi';
import { ISystemFilterApi } from './ISystemFilterApi';
import { ISystemStatusApi } from './ISystemStatusApi';
import { IThemeApi } from './IThemeApi';
import { IUserInterfaceApi } from './IUserInterfaceApi';
import { ICustomSortApi } from './ICustomSortApi';
import { IInternalApi } from './IInternalApi';
import { IConditionalStyleApi } from './IConditionalStyleApi';
import { IReminderApi } from './IReminderApi';
import { IFlashingCellApi } from './IFlashingCellApi';
import { IChartApi } from './IChartApi';
import { ICellSummaryApi } from './ICellSummaryApi';
import { IUserFilterApi } from './IUserFilterApi';
import { IPlusMinusApi } from './IPlusMinusApi';
import { IBulkUpdateApi } from './IBulkUpdateApi';
import { IAuditEventApi } from './IAuditEventApi';

/**
 * The Blotter API (which implements the **IBlotterAPI** interface) provides developers with run-time access to the Adaptable Blotter.
 *
 * It attempts to offer ALL the functionality provided by the Adaptable Blotter UI in code form.
 *
 * This enables developers to access the Adaptable Blotter Store at a run-time in a 'safe' way.
 *
 * It also allows them to access all the functionality in the Adaptable Blotter while bypassing the UI screens altogether if they so wish.
 *
 * *Note to Adaptable Blotter users: If there is a method missing that you would like implemented please contact support@adaptabletools.com*
 *
 * The Blotter API consists of over 35 properties.
 *
 * Eeach of these properties is a class that contains a set of API method grouped either by Adaptable Blotter Function (e.g. *AdvancedSearchAPI*) or type (e.g. *AuditEventApi*)
 */

export interface IBlotterApi {
  /**
   * Provides access to the *Advanced Search* function, the *AdvancedSearch* object and [Advanced Search State](_predefinedconfig_runtimestate_advancedsearchstate_.advancedsearchstate.html).
   */
  advancedSearchApi: IAdvancedSearchApi;

  /**
   * Provides access to the *Alert* function (enabling the displyaing of **Alerts**) and [Alerrt State](_predefinedconfig_runtimestate_alertstate_.alertstate.html).
   */
  alertApi: IAlertApi;

  /**
   * Publishes the 3 Audit Events - *onAuditStateChanged*, *onAuditCellEdited* and *onAuditFunctionApplied*
   *
   * These Events are fired through **Audit Log** when the *auditAsEvent* property for any of these properties is set to **true**.
   */
  auditEventApi: IAuditEventApi;

  /**
   * Provides access to the *Bulk Update* function and [Bulk Update State](_predefinedconfig_runtimestate_bulkupdatestate_.bulkupdatestate.html).
   */
  bulkUpdateApi: IBulkUpdateApi;

  /**
   * Provides access to the *Calculated Column* function (enabling the creation of **Calculated Columns**) and [Calculated Column State](_predefinedconfig_runtimestate_calculatedcolumnstate_.calculatedcolumnstate.html).
   */
  calculatedColumnApi: ICalculatedColumnApi;

  /**
   * Provides access to the *Calendar* function and [Calendar State](_predefinedconfig_runtimestate_calendarstate_.calendarstate.html).
   */
  calendarApi: ICalendarApi;

  /**
   * Provides access to the *Cell Summary* function and [Cell Summary State](_predefinedconfig_runtimestate_cellsummarystate_.cellsummarystate.html).
   */
  cellSummaryApi: ICellSummaryApi;

  /**
   * Provides access to the *Cell Validation* function, the *CellValidation* object and [Cell Validation State](_predefinedconfig_runtimestate_cellvalidationstate_.cellvalidationstate.html).
   */
  cellValidationApi: ICellValidationApi;

  /**
   * Provides access to the *Chart* function, the various *Chart Definition* objects and [Chart State](_predefinedconfig_runtimestate_chartstate_.chartstate.html).
   */
  chartApi: IChartApi;

  /**
   * Provides access to the *Column Caategory* function, the *Column Category* object and [Column Category State](_predefinedconfig_runtimestate_columncategorystate_.columncategorystate.html).
   */
  columnCategoryApi: IColumnCategoryApi;

  /**
   * Provides access to the *Column Filter* function, the *Column Filter* object and [Column Filter State](_predefinedconfig_runtimestate_columnfilterstate_.columnfilterstate.html).
   */
  columnFilterApi: IColumnFilterApi;

  /**
   * Methods that give access to the [Predefined Config](_predefinedconfig_runtimestate_columncategorystate_.columncategorystate.html), State and Store.
   */
  configApi: IConfigApi;

  /**
   * Provides access to the *Conditional Style* function, the *Conditional Style* object and [Conditional Style State](_predefinedconfig_runtimestate_conditionalstylestate_.conditionalstylestate.html).
   */
  conditionalStyleApi: IConditionalStyleApi;

  /**
   * Provides access to the *Custom Sort* function, the *Custom Sort* object and [Custom Sort State](_predefinedconfig_runtimestate_customsortstate_.customsortstate.html).
   */
  customSortApi: ICustomSortApi;

  /**
   * Provides access to the *Dashboard* function, and [Dashboard State](_predefinedconfig_runtimestate_dashboardstate_.dashboardstate.html).
   */
  dashboardApi: IDashboardApi;

  /**
   * Provides access to the *Data Source* function, the *Data Source* object and [Data Source State](_predefinedconfig_runtimestate_datasourcestate_.datasourcestate.html).
   */
  dataSourceApi: IDataSourceApi;

  /**
   * Provides methods to manager User Entitlements (or Permissions)
   */
  entitlementApi: IEntitlementApi;

  /**
   * The Api used for listenning / subscribing to the various Events fired / published by the Adaptable Blotter e.g. the SearchChanged event.
   */
  eventApi: IEventApi;

  /**
   * Provides access to the *Export* function, the *Report* object and [Export State](_predefinedconfig_runtimestate_exportstate_.exportstate.html).
   */
  exportApi: IExportApi;

  /**
   * Provides access to the *Flashing Cell* function, the *Flashing Cell* object and [Flashing Cell State](_predefinedconfig_runtimestate_flashingcellstate_.flashingcellstate.html).
   */
  flashingCellApi: IFlashingCellApi;

  /**
   * Provides access to the *Format Column* function, the *Format Column* object and [Format Column State](_predefinedconfig_runtimestate_formatcolumnstate_.formatcolumnstate.html).
   */
  formatColumnApi: IFormatColumnApi;

  /**
   * Provides access to the *FreeText Column* function, the *FreeText Column* object and [FreeText Column State](_predefinedconfig_runtimestate_freetextcolumnstate_.freetextcolumnstate.html).
   */
  freeTextColumnApi: IFreeTextColumnApi;

  /**
   * Provides methods for managing the Grid directly e.g. setGridData which will replace the current DataSource with the one provided.
   */
  gridApi: IGridApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_predefinedconfig_runtimestate_layoutstate_.layoutstate.html).
   */
  layoutApi: ILayoutApi;

  /**
   * Provides access to the *Percent Bar* function, the *Percent Bar* object and [Percent Bar State](_predefinedconfig_runtimestate_percentbarstate_.percentbarstate.html).
   */
  percentBarApi: IPercentBarApi;

  /**
   * Provides access to the *Plus Minus* function, the *Plus Minus* object and [Plus Minus State](_predefinedconfig_runtimestate_plusminusstate_.plusminusstate.html).
   */
  plusMinusApi: IPlusMinusApi;

  /**
   * Provides access to the *Reminder* function, the *Reminder* object and [Reminder State](_predefinedconfig_runtimestate_reminderstate_.reminderstate.html).
   */
  reminderApi: IReminderApi;

  /**
   * Provides access to the *Quick Search* function, the *Quick Search* object and [Quick Search State](_predefinedconfig_runtimestate_quicksearchstate_.quicksearchstate.html).
   */
  quickSearchApi: IQuickSearchApi;

  /**
   * Provides access to the *Shortcut* function, the *Shortcut* object and [Shortcut State](_predefinedconfig_runtimestate_shortcutstate_.shortcutstate.html).
   */
  shortcutApi: IShortcutApi;

  /**
   * Provides access to the *Layout* function, the *Layout* object and [Layout State](_predefinedconfig_runtimestate_layoutstate_.layoutstate.html).
   */
  smartEditApi: ISmartEditApi;

  /**
   * Provides access to [System Filter State](_predefinedconfig_runtimestate_systemfilterstate_.systemfilterstate.html) that manages the Filters that the Adaptable Blotter ships with.
   */
  systemFilterApi: ISystemFilterApi;

  /**
   * Api methods related to the System Status button (shown in the Home Toolbar) that displays information about the health of the application.
   */
  systemStatusApi: ISystemStatusApi;

  /**
   * Api methods related to Theme management and [Theme State](_predefinedconfig_runtimestate_themestate_.themestate.html).
   */
  themeApi: IThemeApi;

  /**
   * Provides access to [User Interface State](_predefinedconfig_runtimestate_userinterfacestate_.userinterfacestate.html) which allows you to set up colours, permitted values etc.
   */
  userInterfaceApi: IUserInterfaceApi;

  /**
   * Provides access to the *User Filter* function, the *User Filter* object and [User Filter State](_predefinedconfig_runtimestate_userfilterstate_.userfilterstate.html).
   */
  userFilterApi: IUserFilterApi;

  /**
   * API methods used internally within the Adaptable Blotter.
   *
   * **It is not recommended to use this section if using the Adaptable Blotter externally**
   */
  internalApi: IInternalApi;
}
