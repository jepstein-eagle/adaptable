import { IScreenPopup, IConfirmationPopup, IPromptPopup, IAlertPopup } from '../../../Core/Interface/IMessage'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues, ISystemStatus } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';
import { KeyValuePair } from '../../../View/UIInterfaces';

/*
Created by the system  at run-time and not part of predefined or user config and not saved
*/

export interface GridState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    BlotterRestrictions: string[];
    SystemStatus: ISystemStatus
    SelectedCellInfo: ISelectedCellInfo
}

export interface MenuState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu;
}

export interface PopupState {
    ScreenPopup: IScreenPopup
    AlertPopup: IAlertPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup
}

export interface AboutState {
    AboutInfo: KeyValuePair[]
}


export interface TeamSharingState {
    Activated: boolean
    SharedEntities: ISharedEntity[]
}

export interface BulkUpdateState {
    BulkUpdateValue: string
    IsValidSelection: boolean
    PreviewInfo: IPreviewInfo
}

/*
predefined config only - never editable by users at runtime
*/
export interface EntitlementsState {
    FunctionEntitlements: IEntitlement[];
}

export interface UserInterfaceState {
    ColorPalette: string[];
    StyleClassNames: string[]
    PermittedColumnValues: IPermittedColumnValues[]
}

export interface ApplicationState {

}


/* 
predefined and user config and editable by users but not Adaptable Blotter objects 
*/

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
}


export interface SmartEditState {
    SmartEditValue: number
    MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide'
    IsValidSelection: boolean
    PreviewInfo: IPreviewInfo

}


export interface SelectedCellsState {
    SelectedCellOperation: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only'
    SelectedCellSummary: ISelectedCellSummmary
}


export interface CalendarState {
    CurrentCalendar: string;
    AvailableCalendars: ICalendar[]
}

export interface ThemeState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}

/* 
predefined and user config and editable by users - includes Adaptable Blotter objects 
*/


export interface AlertState {
    AlertDefinitions: IAlertDefinition[]
    MaxAlertsInStore: number
    Alerts: any[]
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
    UserFilters: IUserFilter[];
    SystemFilters: string[];
}

export interface ShortcutState {
    Shortcuts: IShortcut[];
}

export interface PlusMinusState {
    PlusMinusRules: IPlusMinusRule[]
}


export interface ExportState {
    IPPDomainsPages: IPPDomain[]
    CurrentReport: string;
    CurrentLiveReports: ILiveReport[];
    Reports: IReport[];
    ErrorMsg: string;
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
export interface ChartsState {
    Charts: string[]
}