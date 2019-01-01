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
import { IGridApi } from "../GridApi";
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
