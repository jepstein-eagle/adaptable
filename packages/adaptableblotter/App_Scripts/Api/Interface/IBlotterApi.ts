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
   * Provides access to the *Advanced Search* function, the *AdvancedSearch* object and associated state.
   */
  advancedSearchApi: IAdvancedSearchApi;

  /**
   * Provides access to the *Alert* function (enabling the displyaing of **Alerts**) and associated state.
   */
  alertApi: IAlertApi;

  /**
   * Fires the 3 Audit Events - *onAuditStateChanged*, *onAuditCellEdited* and *onAuditFunctionApplied*
   *
   * These Events are fired through **Audit Log** when the *auditAsEvent* property for any of these properties is set to **true**.
   */
  auditEventApi: IAuditEventApi;

  /**
   * Provides access to the *Bulk Update* function and associated state.
   */
  bulkUpdateApi: IBulkUpdateApi;

  /**
   * Provides access to the *Calculated Column* function (enabling the creation of **Calculated Columns**) and associated state.
   */
  calculatedColumnApi: ICalculatedColumnApi;

  /**
   * Provides access to the *Calendar* function and associated state.
   */
  calendarApi: ICalendarApi;

  /**
   * Provides access to the *Cell Summary* function and associated state.
   */
  cellSummaryApi: ICellSummaryApi;

  /**
   * Provides access to the *Cell Validation* function, the *CellValidation* object and associated state.
   */
  cellValidationApi: ICellValidationApi;

  /**
   * Provides access to the *Chart* function, the various *Chart Definition* objects and associated state.
   */
  chartApi: IChartApi;
  columnCategoryApi: IColumnCategoryApi;
  columnFilterApi: IColumnFilterApi;
  configApi: IConfigApi;
  conditionalStyleApi: IConditionalStyleApi;
  customSortApi: ICustomSortApi;
  dashboardApi: IDashboardApi;
  dataSourceApi: IDataSourceApi;
  entitlementApi: IEntitlementApi;
  eventApi: IEventApi;
  exportApi: IExportApi;
  flashingCellApi: IFlashingCellApi;
  formatColumnApi: IFormatColumnApi;
  freeTextColumnApi: IFreeTextColumnApi;
  gridApi: IGridApi;
  layoutApi: ILayoutApi;
  percentBarApi: IPercentBarApi;
  plusMinusApi: IPlusMinusApi;
  reminderApi: IReminderApi;
  quickSearchApi: IQuickSearchApi;
  shortcutApi: IShortcutApi;
  smartEditApi: ISmartEditApi;
  systemFilterApi: ISystemFilterApi;
  systemStatusApi: ISystemStatusApi;
  themeApi: IThemeApi;
  userInterfaceApi: IUserInterfaceApi;
  userFilterApi: IUserFilterApi;

  // internal use
  internalApi: IInternalApi;
}
