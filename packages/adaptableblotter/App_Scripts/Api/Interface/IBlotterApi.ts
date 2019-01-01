import { IEvent } from "./IEvent";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from "./IStateEvents";
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

/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
  AdvancedSearchApi: IAdvancedSearchApi;
  AlertApi: IAlertApi;
  CalendarApi: ICalendarApi;
  CalculatedColumnApi: ICalculatedColumnApi;
  CellValidationApi: ICellValidationApi;
  ColumnCategoryApi: IColumnCategoryApi;
  ColumnFilterApi: IColumnFilterApi;
  ConfigApi: IConfigApi;
  CustomSortApi: ICustomSortApi;
  DashboardApi: IDashboardApi;
  DataSourceApi: IDataSourceApi;
  EntitlementApi: IEntitlementApi;
  ExportApi: IExportApi;
  FormatColumnApi: IFormatColumnApi;
  FreeTextColumnApi: IFreeTextColumnApi;
  LayoutApi: ILayoutApi;
  PercentBarApi: IPercentBarApi;
  QuickSearchApi: IQuickSearchApi;
  ShortcutApi: IShortcutApi;
  SmartEditApi: ISmartEditApi;
  SystemFilterApi: ISystemFilterApi;
  SystemStatusApi: ISystemStatusApi;
  ThemeApi: IThemeApi;
  UserInterfaceApi: IUserInterfaceApi;

  /**
   * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
   * @param data can be any data from any datasource that is suitable for the underlying grid.  
   */
  setGridData(data: any): void;

  /**
  * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
  * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
  */
  onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

  /**
  * Event fired whenever the state in the Blotter changes, providing full coverage of what triggered the change and what the new state for that function is.
  * @returns IEvent<IAdaptableBlotter, IStateChangedEventArgs>
  */
  onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;

  /**
  * Event fired whenever column order (and visiblity) and grid sorts in the Blotter change.
  * Only fires when in a user layout and currently just passes the name of the layout.
  * @returns IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>
  */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
}
