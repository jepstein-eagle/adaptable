import { IQuickSearchApi } from "../QuickSearchApi";
import { ICalculatedColumnApi } from "../CalculatedColumnApi";
import { ICellValidationApi } from "../CellValidationApi";
import { IColumnCategoryApi } from "../ColumnCategoryApi";
import { ICustomSortApi } from "../CustomSortApi";
import { IDashboardApi } from "../DashboardApi";
import { IEntitlementApi } from "../EntitlementApi";
import { IFormatColumnApi } from "../FormatColumnApi";
import { ILayoutApi } from "../LayoutApi";
import { IPercentBarApi } from "../PercentBarApi";
import { IShortcutApi } from "../ShortcutApi";
import { ISmartEditApi } from "../SmartEditApi";
import { ISystemStatusApi } from "../SystemStatusApi";
import { IThemeApi } from "../ThemeApi";
import { IUserInterfaceApi } from "../UserInterfaceApi";
import { IAdvancedSearchApi } from "../AdvancedSearchApi";
import { IAlertApi } from "../AlertApi";
import { ICalendarApi } from "../CalendarApi";
import { IColumnFilterApi } from "../ColumnFilterApi";
import { IConfigApi } from "../ConfigApi";
import { IDataSourceApi } from "../DataSource";
import { IExportApi } from "../ExportApi";
import { IFreeTextColumnApi } from "../FreeTextColumn";
import { ISystemFilterApi } from "../SystemFilterApi";
import { IGridApi } from "../GridApi";
import { IEventApi } from "../EventApi";

/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
  advancedSearchApi: IAdvancedSearchApi;
  alertApi: IAlertApi;
  calculatedColumnApi: ICalculatedColumnApi;
  calendarApi: ICalendarApi;
  cellValidationApi: ICellValidationApi;
  columnCategoryApi: IColumnCategoryApi;
  columnFilterApi: IColumnFilterApi;
  configApi: IConfigApi;
  customSortApi: ICustomSortApi;
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