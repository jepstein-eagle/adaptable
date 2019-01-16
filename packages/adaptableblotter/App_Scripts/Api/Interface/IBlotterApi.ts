import { ICellValidationApi } from "./ICellValidationApi";
import { IColumnFilterApi } from "./IColumnFilterApi";
import { IAdvancedSearchApi } from "./IAdvancedSearchApi";
import { IAlertApi } from "./IAlertApi";
import { ICalculatedColumnApi } from "./ICalculatedColumnApi";
import { ICalendarApi } from "./ICalendarApi";
import { IColumnCategoryApi } from "./IColumnCategoryApi";
import { IConfigApi } from "./IConfigApi";
import { IDashboardApi } from "./IDashboardApi";
import { IDataSourceApi } from "./IDataSourceApi";
import { IEntitlementApi } from "./IEntitlementApi";
import { IEventApi } from "./IEventApi";
import { IExportApi } from "./IExportApi";
import { IFormatColumnApi } from "./IFormatColumnApi";
import { IFreeTextColumnApi } from "./IFreeTextColumnApi";
import { IGridApi } from "./IGridApi";
import { ILayoutApi } from "./ILayoutApi";
import { IPercentBarApi } from "./IPercentBarApi";
import { IQuickSearchApi } from "./IQuickSearchApi";
import { IShortcutApi } from "./IShortcutApi";
import { ISmartEditApi } from "./ISmartEditApi";
import { ISystemFilterApi } from "./ISystemFilterApi";
import { ISystemStatusApi } from "./ISystemStatusApi";
import { IThemeApi } from "./IThemeApi";
import { IUserInterfaceApi } from "./IUserInterfaceApi";
import { ICustomSortApi } from "./ICustomSortApi";


/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 * Contains all the functionality provided by the Adaptable Blotter UI in function form
 * Allows users to access our Store in a 'safe' way
 */
export interface IBlotterApi {
  advancedSearchApi: IAdvancedSearchApi;
  alertApi: IAlertApi;
  calculatedColumnApi: ICalculatedColumnApi;
  calendarApi: ICalendarApi;
  cellValidationApi: ICellValidationApi
  columnCategoryApi: IColumnCategoryApi;
  columnFilterApi: IColumnFilterApi
  configApi: IConfigApi;
  customSortApi: ICustomSortApi
  dashboardApi: IDashboardApi;
  dataSourceApi: IDataSourceApi;
  entitlementApi: IEntitlementApi;
  eventApi:IEventApi;
  exportApi: IExportApi;
  formatColumnApi: IFormatColumnApi;
  freeTextColumnApi: IFreeTextColumnApi;
  gridApi: IGridApi;
  layoutApi: ILayoutApi;
  percentBarApi: IPercentBarApi;
  quickSearchApi: IQuickSearchApi;
  shortcutApi: IShortcutApi;
  smartEditApi: ISmartEditApi;
  systemFilterApi: ISystemFilterApi;
  systemStatusApi: ISystemStatusApi;
  themeApi: IThemeApi;
  userInterfaceApi: IUserInterfaceApi;
}