import { IScreenPopup, IConfirmationPopup, IPromptPopup, IAlertPopup, IChartPopup, ILoadingPopup, IAlert } from '../../../Core/Interface/IMessage'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues, ISystemStatus, IColumnCategory } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition, IChartDefinition } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';

export interface IState{

}

export interface ISystemState extends IState {
}

export interface IDesignTimeState extends IState {
}

export interface IRunTimeState extends IState {
}

/*
System Config
This is created by the system at run-time and NOT part of predefined or user config.
Therefore it is not saved nor included in State events
*/

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
}

export interface TeamSharingState extends ISystemState {
    Activated: boolean;
    SharedEntities: ISharedEntity[];
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
    ColumnCategories: IColumnCategory[];
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
export interface AdvancedSearchState extends IRunTimeState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}

export interface AlertState extends IRunTimeState {
    AlertDefinitions: IAlertDefinition[];
    MaxAlertsInStore: number;
    AlertPopupDiv: string
}

export interface BulkUpdateState extends IRunTimeState {
    BulkUpdateValue: string;
}

export interface CalculatedColumnState extends IRunTimeState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string;
}

export interface CalendarState extends IRunTimeState {
    CurrentCalendar: string;
}

export interface CellValidationState extends IRunTimeState {
    CellValidations: ICellValidationRule[];
}

export interface ChartState extends IRunTimeState {
    ChartDefinitions: IChartDefinition[];
    CurrentChartName: string;
    ChartData: any;
}

export interface ConditionalStyleState extends IRunTimeState {
    ConditionalStyles: IConditionalStyle[];
}

export interface CustomSortState extends IRunTimeState {
    CustomSorts: ICustomSort[];
}

export interface DashboardState extends IRunTimeState {
    AvailableToolbars: string[];
    VisibleToolbars: string[];
    VisibleButtons: string[];
    Zoom: number;
    DashboardVisibility: 'Minimised' | 'Visible' | 'Hidden';
    ShowSystemStatusButton: boolean;
    ShowFunctionsDropdown: boolean;
    ShowColumnsDropdown: boolean;
    HomeToolbarTitle: string;
    ApplicationToolbarTitle: string;
}

export interface DataSourceState extends IRunTimeState {
    DataSources: string[];
    CurrentDataSource: string;
}

export interface ExportState extends IRunTimeState {
    IPPDomainsPages: IPPDomain[];  // should we persist this???
    CurrentReport: string;
    Reports: IReport[];
    ErrorMsg: string;
}

export interface ColumnFilterState extends IRunTimeState {
    ColumnFilters: IColumnFilter[];
}

export interface UserFilterState extends IRunTimeState {
    UserFilters: IUserFilter[];
}

export interface FlashingCellState extends IRunTimeState {
    FlashingCells: IFlashingCell[];
}

export interface FormatColumnState extends IRunTimeState {
    FormatColumns: IFormatColumn[];
}

export interface LayoutState extends IRunTimeState {
    CurrentLayout: string;
    Layouts: ILayout[];
}

export interface PlusMinusState extends IRunTimeState {
    PlusMinusRules: IPlusMinusRule[];
}

export interface QuickSearchState extends IRunTimeState {
    QuickSearchText: string;
    Operator: 'Contains' | 'StartsWith';
    DisplayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
    Style: IStyle;
}

export interface SelectedCellsState extends IRunTimeState {
    SelectedCellOperation: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only';
}

export interface ShortcutState extends IRunTimeState {
    Shortcuts: IShortcut[];
}

export interface SmartEditState extends IRunTimeState {
    SmartEditValue: number;
    MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}

export interface ThemeState extends IRunTimeState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}
