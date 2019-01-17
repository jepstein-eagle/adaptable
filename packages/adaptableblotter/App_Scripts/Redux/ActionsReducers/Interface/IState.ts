import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IColumn } from '../../../Api/Interface/IColumn';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition, IChartDefinition, IFreeTextColumn, IPercentBar, ISystemStatus, IEntitlement, IPermittedColumnValues, IColumnCategory } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';
import { IPreviewInfo } from '../../../Utilities/Interface/IPreview';
import { IMenuItem, IContextMenu } from '../../../Utilities/Interface/IMenu';
import { IAlert, IScreenPopup, IAlertPopup, IConfirmationPopup, IPromptPopup, ILoadingPopup, IAboutPopup } from '../../../Utilities/Interface/IMessage';
import { ChartVisibility } from '../../../Utilities/ChartEnums';

// Base interface
export interface IState {
}

/**
 * Interface for System related State elements
 * This is created by the system at run-time and NOT part of predefined or user config.
 * Therefore it is not saved nor included in State events

 */ 
export interface ISystemState extends IState {
}

// Interface for State elements which are provided at Design time and never modified in the Blotter
export interface IDesignTimeState extends IState {
}

// Interface for State elements which the User is able to modify during the lifetime of the application
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
    ChartData: any;
    ChartVisibility: ChartVisibility;
    CalculatedColumnErrorMessage: string;
    IPPDomainsPages: IPPDomain[];
    ReportErrorMessage: string;
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

/*
Predefined Config Only 
This can be set by users in Predefined Config at design-time but never editable by users at runtime
Therefore it is not saved nor included in State events
*/
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


/* 
Full Config 
Can bet set at design time and also editable at run time by users 
*/
export interface AdvancedSearchState extends IUserState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}

export interface AlertState extends IUserState {
    AlertDefinitions: IAlertDefinition[];
    MaxAlertsInStore: number;
    AlertPopupDiv: string
}

export interface BulkUpdateState extends IUserState {
    BulkUpdateValue: string;
}

export interface CalculatedColumnState extends IUserState {
    CalculatedColumns: ICalculatedColumn[];
}

export interface CalendarState extends IUserState {
    CurrentCalendar: string;
}

export interface CellValidationState extends IUserState {
    CellValidations: ICellValidationRule[];
}

export interface ChartState extends IUserState {
    ChartDefinitions: IChartDefinition[];
    CurrentChartDefinition: string;
    ShowModal: boolean;
    RefreshRate: number;
}

export interface ColumnCategoryState extends IUserState {
    ColumnCategories: IColumnCategory[];
}

export interface ColumnFilterState extends IUserState {
    ColumnFilters: IColumnFilter[];
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
    CurrentReport: string;
    Reports: IReport[];
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

export interface PercentBarState extends IUserState {
    PercentBars: IPercentBar[];
}

export interface PlusMinusState extends IUserState {
    PlusMinusRules: IPlusMinusRule[];
}

export interface QuickSearchState extends IUserState {
    QuickSearchText: string;
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


export interface UserFilterState extends IUserState {
    UserFilters: IUserFilter[];
}