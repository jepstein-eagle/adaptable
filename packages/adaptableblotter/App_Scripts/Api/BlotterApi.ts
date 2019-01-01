import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { IEvent } from "./Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from "./Interface/IStateEvents";
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


export class BlotterApi implements IBlotterApi {

  public AdvancedSearchApi: IAdvancedSearchApi;
  public AlertApi: IAlertApi;
  public CalendarApi: ICalendarApi;
  public CalculatedColumnApi: ICalculatedColumnApi;
  public CellValidationApi: ICellValidationApi;
  public ColumnCategoryApi: IColumnCategoryApi;
  public ColumnFilterApi: IColumnFilterApi;
  public ConfigApi: IConfigApi;
  public CustomSortApi: ICustomSortApi;
  public DashboardApi: IDashboardApi;
  public DataSourceApi: IDataSourceApi;
  public EntitlementApi: IEntitlementApi;
  public ExportApi: IExportApi;
  public FormatColumnApi: IFormatColumnApi;
  public FreeTextColumnApi: IFreeTextColumnApi;
  public LayoutApi: ILayoutApi;
  public PercentBarApi: IPercentBarApi;
  public QuickSearchApi: IQuickSearchApi;
  public ShortcutApi: IShortcutApi;
  public SmartEditApi: ISmartEditApi;
  public SystemFilterApi: ISystemFilterApi;
  public SystemStatusApi: ISystemStatusApi;
  public ThemeApi: IThemeApi;
  public UserInterfaceApi: IUserInterfaceApi;


  constructor(protected blotter: IAdaptableBlotter) {
    this.AdvancedSearchApi = new AdvancedSearchApi(blotter);
    this.AlertApi = new AlertApi(blotter);
    this.CalendarApi = new CalendarApi(blotter);
    this.CalculatedColumnApi = new CalculatedColumnApi(blotter);
    this.CellValidationApi = new CellValidationApi(blotter);
    this.ColumnCategoryApi = new ColumnCategoryApi(blotter);
    this.ColumnFilterApi = new ColumnFilterApi(blotter);
    this.ConfigApi = new ConfigApi(blotter);
    this.CustomSortApi = new CustomSortApi(blotter);
    this.DashboardApi = new DashboardApi(blotter);
    this.DataSourceApi = new DataSourceApi(blotter);
    this.EntitlementApi = new EntitlementApi(blotter);
    this.ExportApi = new ExportApi(blotter);
    this.FormatColumnApi = new FormatColumnApi(blotter);
    this.FreeTextColumnApi = new FreeTextColumnApi(blotter);
    this.LayoutApi = new LayoutApi(blotter);
    this.PercentBarApi = new PercentBarApi(blotter);
    this.QuickSearchApi = new QuickSearchApi(blotter);
    this.ShortcutApi = new ShortcutApi(blotter);
    this.SmartEditApi = new SmartEditApi(blotter);
    this.SystemFilterApi = new SystemFilterApi(blotter);
    this.SystemStatusApi = new SystemStatusApi(blotter);
    this.ThemeApi = new ThemeApi(blotter);
    this.UserInterfaceApi = new UserInterfaceApi(blotter);
  }

  public setGridData(dataSource: any): void {
    this.blotter.setGridData(dataSource);
  }

  // Events
  public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
    return this.blotter.SearchedChanged;
  }

  public onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs> {
    return this.blotter.StateChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs> {
    return this.blotter.ColumnStateChanged;
  }

}

