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
 * The Blotter API is designed to be the run-time interface between developers and the Adaptable Blotter.
 * The aim is that is provides ALL the functionality provided by the Adaptable Blotter UI in code form.
 * This means that developers can access the Adaptable Blotter Store at a run-time in a 'safe' way, and also allows them to access all the functionality in the Adaptable Blotter while bypassing the UI screens altogether if they so wish.
 */
export interface IBlotterApi {
  advancedSearchApi: IAdvancedSearchApi;
  alertApi: IAlertApi;
  auditEventApi: IAuditEventApi;
  bulkUpdateApi: IBulkUpdateApi;
  calculatedColumnApi: ICalculatedColumnApi;
  calendarApi: ICalendarApi;
  cellSummaryApi: ICellSummaryApi;
  cellValidationApi: ICellValidationApi;
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
