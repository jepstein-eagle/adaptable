import { IScreenPopup, IConfirmationPopup, IPromptPopup, IAlertPopup, IChartPopup, ILoadingPopup, IAlert, IAboutPopup } from '../../../Core/Interface/IMessage';
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu';
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues, ISystemStatus, IColumnCategory } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition, IChartDefinition, IFreeTextColumn, IPercentBar } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';
export interface IState {
}
export interface ISystemState extends IState {
}
export interface IDesignTimeState extends IState {
}
export interface IUserState extends IState {
}
export interface SystemState extends ISystemState {
    SystemStatus: ISystemStatus;
    Alerts: IAlert[];
    AvailableCalendars: ICalendar[];
    CurrentLiveReports: ILiveReport[];
    IsValidSmartEditSelection: boolean;
    SmartEditPreviewInfo: IPreviewInfo;
    IsValidBulkUpdateSelection: boolean;
    BulkUpdatePreviewInfo: IPreviewInfo;
}
export interface GridState extends ISystemState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    SelectedCellInfo: ISelectedCellInfo;
    SelectedCellSummary: ISelectedCellSummmary;
}
export interface MenuState extends ISystemState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu;
}
export interface PopupState extends ISystemState {
    ScreenPopup: IScreenPopup;
    ChartPopup: IChartPopup;
    AlertPopup: IAlertPopup;
    ConfirmationPopup: IConfirmationPopup;
    PromptPopup: IPromptPopup;
    LoadingPopup: ILoadingPopup;
    AboutPopup: IAboutPopup;
}
export interface TeamSharingState extends ISystemState {
    Activated: boolean;
    SharedEntities: ISharedEntity[];
}
export interface HomeState extends ISystemState {
}
export interface EntitlementsState extends IDesignTimeState {
    FunctionEntitlements: IEntitlement[];
}
export interface UserInterfaceState extends IDesignTimeState {
    ColorPalette: string[];
    StyleClassNames: string[];
    PermittedColumnValues: IPermittedColumnValues[];
}
export interface SystemFilterState extends IDesignTimeState {
    SystemFilters: string[];
}
export interface ApplicationState extends IDesignTimeState {
}
export interface AdvancedSearchState extends IUserState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}
export interface AlertState extends IUserState {
    AlertDefinitions: IAlertDefinition[];
    MaxAlertsInStore: number;
    AlertPopupDiv: string;
}
export interface BulkUpdateState extends IUserState {
    BulkUpdateValue: string;
}
export interface CalculatedColumnState extends IUserState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string;
}
export interface CalendarState extends IUserState {
    CurrentCalendar: string;
}
export interface CellValidationState extends IUserState {
    CellValidations: ICellValidationRule[];
}
export interface PercentBarState extends IUserState {
    PercentBars: IPercentBar[];
}
export interface ChartState extends IUserState {
    ChartDefinitions: IChartDefinition[];
    CurrentChartName: string;
    ChartData: any;
}
export interface ConditionalStyleState extends IUserState {
    ConditionalStyles: IConditionalStyle[];
}
export interface CustomSortState extends IUserState {
    CustomSorts: ICustomSort[];
}
export interface DashboardState extends IUserState {
    AvailableToolbars: string[];
    VisibleToolbars: string[];
    VisibleButtons: string[];
    Zoom: number;
    DashboardVisibility: 'Minimised' | 'Visible' | 'Hidden';
    ShowSystemStatusButton: boolean;
    ShowAboutButton: boolean;
    ShowFunctionsDropdown: boolean;
    ShowColumnsDropdown: boolean;
    ShowToolbarsDropdown: boolean;
    HomeToolbarTitle: string;
    ApplicationToolbarTitle: string;
}
export interface DataSourceState extends IUserState {
    DataSources: string[];
    CurrentDataSource: string;
}
export interface ExportState extends IUserState {
    IPPDomainsPages: IPPDomain[];
    CurrentReport: string;
    Reports: IReport[];
    ErrorMsg: string;
}
export interface ColumnFilterState extends IUserState {
    ColumnFilters: IColumnFilter[];
}
export interface UserFilterState extends IUserState {
    UserFilters: IUserFilter[];
}
export interface FlashingCellState extends IUserState {
    FlashingCells: IFlashingCell[];
}
export interface FormatColumnState extends IUserState {
    FormatColumns: IFormatColumn[];
}
export interface FreeTextColumnState extends IUserState {
    FreeTextColumns: IFreeTextColumn[];
}
export interface LayoutState extends IUserState {
    CurrentLayout: string;
    Layouts: ILayout[];
}
export interface ColumnCategoryState extends IUserState {
    ColumnCategories: IColumnCategory[];
}
export interface PlusMinusState extends IUserState {
    PlusMinusRules: IPlusMinusRule[];
}
export interface QuickSearchState extends IUserState {
    QuickSearchText: string;
    Operator: 'Contains' | 'StartsWith';
    DisplayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
    Style: IStyle;
}
export interface SelectedCellsState extends IUserState {
    SelectedCellOperation: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only';
}
export interface ShortcutState extends IUserState {
    Shortcuts: IShortcut[];
}
export interface SmartEditState extends IUserState {
    SmartEditValue: number;
    MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}
export interface ThemeState extends IUserState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}
