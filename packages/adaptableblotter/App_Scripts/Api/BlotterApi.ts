import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { IQuickSearchApi, QuickSearchApi } from "./QuickSearchApi";
import { IDashboardApi, DashboardApi } from "./DashboardApi";
import { ILayoutApi, LayoutApi } from "./LayoutApi";
import { IShortcutApi, ShortcutApi } from "./ShortcutApi";
import { IThemeApi, ThemeApi } from "./ThemeApi";
import { ISmartEditApi, SmartEditApi } from "./SmartEditApi";
import { ICalculatedColumnApi, CalculatedColumnApi } from "./CalculatedColumnApi";
import { ICellValidationApi, CellValidationApi } from "./CellValidationApi";
import { IColumnCategoryApi, ColumnCategoryApi } from "./ColumnCategoryApi";
import { ICustomSortApi, CustomSortApi } from "./CustomSortApi";
import { IEntitlementApi, EntitlementApi } from "./EntitlementApi";
import { IFormatColumnApi, FormatColumnApi } from "./FormatColumnApi";
import { IPercentBarApi, PercentBarApi } from "./PercentBarApi";
import { ISystemStatusApi, SystemStatusApi } from "./SystemStatusApi";
import { IUserInterfaceApi, UserInterfaceApi } from "./UserInterfaceApi";
import { IAdvancedSearchApi, AdvancedSearchApi } from "./AdvancedSearchApi";
import { IAlertApi, AlertApi } from "./AlertApi";
import { ICalendarApi, CalendarApi } from "./CalendarApi";
import { IColumnFilterApi, ColumnFilterApi } from "./ColumnFilterApi";
import { IConfigApi, ConfigApi } from "./ConfigApi";
import { IDataSourceApi, DataSourceApi } from "./DataSource";
import { IExportApi, ExportApi } from "./ExportApi";
import { IFreeTextColumnApi, FreeTextColumnApi } from "./FreeTextColumn";
import { ISystemFilterApi, SystemFilterApi } from "./SystemFilterApi";
import { IGridApi, GridApi } from "./GridApi";
import { IEventApi, EventApi } from "./EventApi";

export class BlotterApi implements IBlotterApi {

  public advancedSearchApi: IAdvancedSearchApi;
  public alertApi: IAlertApi;
  public calendarApi: ICalendarApi;
  public calculatedColumnApi: ICalculatedColumnApi;
  public cellValidationApi: ICellValidationApi;
  public columnCategoryApi: IColumnCategoryApi;
  public columnFilterApi: IColumnFilterApi;
  public configApi: IConfigApi;
  public customSortApi: ICustomSortApi;
  public dashboardApi: IDashboardApi;
  public dataSourceApi: IDataSourceApi;
  public entitlementApi: IEntitlementApi;
  public eventApi: IEventApi;
  public exportApi: IExportApi;
  public formatColumnApi: IFormatColumnApi;
  public freeTextColumnApi: IFreeTextColumnApi;
  public gridApi: IGridApi
  public layoutApi: ILayoutApi;
  public percentBarApi: IPercentBarApi;
  public quickSearchApi: IQuickSearchApi;
  public shortcutApi: IShortcutApi;
  public smartEditApi: ISmartEditApi;
  public systemFilterApi: ISystemFilterApi;
  public systemStatusApi: ISystemStatusApi;
  public themeApi: IThemeApi;
  public userInterfaceApi: IUserInterfaceApi;


  constructor(protected blotter: IAdaptableBlotter) {
    this.advancedSearchApi = new AdvancedSearchApi(blotter);
    this.alertApi = new AlertApi(blotter);
    this.calendarApi = new CalendarApi(blotter);
    this.calculatedColumnApi = new CalculatedColumnApi(blotter);
    this.cellValidationApi = new CellValidationApi(blotter);
    this.columnCategoryApi = new ColumnCategoryApi(blotter);
    this.columnFilterApi = new ColumnFilterApi(blotter);
    this.configApi = new ConfigApi(blotter);
    this.customSortApi = new CustomSortApi(blotter);
    this.dashboardApi = new DashboardApi(blotter);
    this.dataSourceApi = new DataSourceApi(blotter);
    this.entitlementApi = new EntitlementApi(blotter);
    this.eventApi = new EventApi(blotter);
    this.exportApi = new ExportApi(blotter);
    this.formatColumnApi = new FormatColumnApi(blotter);
    this.freeTextColumnApi = new FreeTextColumnApi(blotter);
    this.gridApi = new GridApi(blotter);
    this.layoutApi = new LayoutApi(blotter);
    this.percentBarApi = new PercentBarApi(blotter);
    this.quickSearchApi = new QuickSearchApi(blotter);
    this.shortcutApi = new ShortcutApi(blotter);
    this.smartEditApi = new SmartEditApi(blotter);
    this.systemFilterApi = new SystemFilterApi(blotter);
    this.systemStatusApi = new SystemStatusApi(blotter);
    this.themeApi = new ThemeApi(blotter);
    this.userInterfaceApi = new UserInterfaceApi(blotter);
  }



}

