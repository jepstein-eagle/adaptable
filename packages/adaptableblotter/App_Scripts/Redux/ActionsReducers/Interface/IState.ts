import { IScreenPopup, IConfirmationPopup, IPromptPopup, IAlertPopup, IChartPopup, ILoadingPopup, IAlert } from '../../../Core/Interface/IMessage'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues, ISystemStatus, IColumnCategory } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition, IChartDefinition } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';

/*
System Config
This is created by the system at run-time and NOT part of predefined or user config.
Therefore it is not saved nor included in State events
*/

export interface SystemState {
    SystemStatus: ISystemStatus;
    Alerts: IAlert[];
    AvailableCalendars: ICalendar[];
    CurrentLiveReports: ILiveReport[];
    IsValidSmartEditSelection: boolean;
    SmartEditPreviewInfo: IPreviewInfo;
    IsValidBulkUpdateSelection: boolean;
    BulkUpdatePreviewInfo: IPreviewInfo;
}

export interface GridState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    SelectedCellInfo: ISelectedCellInfo;
    SelectedCellSummary: ISelectedCellSummmary
}

export interface MenuState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu;
}

export interface PopupState {
    ScreenPopup: IScreenPopup
    ChartPopup: IChartPopup
    AlertPopup: IAlertPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup,
    LoadingPopup: ILoadingPopup
}

export interface TeamSharingState {
    Activated: boolean
    SharedEntities: ISharedEntity[]
}


/*
Predefined Config Only 
This can be set by users in Predefined Config at design-time but never editable by users at runtime
Therefore it is not saved nor included in State events
*/
export interface EntitlementsState {
    FunctionEntitlements: IEntitlement[];
}

export interface UserInterfaceState {
    ColorPalette: string[];
    StyleClassNames: string[]
    PermittedColumnValues: IPermittedColumnValues[]
    ColumnCategories: IColumnCategory[]
}

export interface ApplicationState {
}


/* 
Full Config 
Can bet set at design time and also editable at run time by users 
*/

export interface AlertState {
    AlertDefinitions: IAlertDefinition[]
    MaxAlertsInStore: number
}


export interface BulkUpdateState {
    BulkUpdateValue: string
}

export interface CalendarState {
    CurrentCalendar: string;
}

export interface QuickSearchState {
    QuickSearchText: string
    Operator: 'Contains' | 'StartsWith'
    DisplayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'
    Style: IStyle
}


export interface DashboardState {
    AvailableToolbars: string[]
    VisibleToolbars: string[]
    VisibleButtons: string[]
    Zoom: number,
    DashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'
    ShowSystemStatusButton: boolean
    ShowFunctionsDropdown: boolean
    ShowColumnsDropdown: boolean
    HomeToolbarTitle: string
    ApplicationToolbarTitle: string
}

export interface ExportState {
    IPPDomainsPages: IPPDomain[]  // should we persist this???
    CurrentReport: string;
    Reports: IReport[];
    ErrorMsg: string;
}

export interface AdvancedSearchState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}

export interface DataSourceState {
    DataSources: string[];
    CurrentDataSource: string;
}

export interface LayoutState {
    CurrentLayout: string;
    Layouts: ILayout[]
}

export interface CustomSortState {
    CustomSorts: ICustomSort[];
}

export interface FilterState {
    ColumnFilters: IColumnFilter[];
    SavedColumnFilters: IColumnFilter[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
}

export interface ShortcutState {
    Shortcuts: IShortcut[];
}

export interface PlusMinusState {
    PlusMinusRules: IPlusMinusRule[]
}


export interface FlashingCellState {
    FlashingCells: IFlashingCell[]
}

export interface ConditionalStyleState {
    ConditionalStyles: IConditionalStyle[];
}

export interface CellValidationState {
    CellValidations: ICellValidationRule[]
}

export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string
}

export interface FormatColumnState {
    FormatColumns: IFormatColumn[]
}

// need to think this through...
export interface ChartState {
    ChartDefinitions: IChartDefinition[]
    CurrentChartName: string;
    ChartData: any;
}

export interface SmartEditState {
    SmartEditValue: number
    MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide'
}

export interface ThemeState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}

export interface SelectedCellsState {
    SelectedCellOperation: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only'
}