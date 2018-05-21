import { MathOperation, LeafExpressionOperator, DisplayAction, Visibility } from '../../../Core/Enums'
import { IScreenPopup, IWarningPopup, IConfirmationPopup, IErrorPopup, IPromptPopup, IInfoPopup } from '../../../Core/Interface/IMessage'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { IAdaptableBlotterOptions } from '../../../Core/Api/Interface/IAdaptableBlotterOptions';

/*
Created by the system  at run-time and not part of predefined or user config and not saved
*/

export interface GridState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    BlotterRestrictions: string[];
}

export interface MenuState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu;
}

export interface PopupState {
    ScreenPopup: IScreenPopup
    ErrorPopup: IErrorPopup
    WarningPopup: IWarningPopup
    InfoPopup: IInfoPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup
    PreviewInfo: IPreviewInfo
}

export interface TeamSharingState {
    Activated: boolean
    SharedEntities: ISharedEntity[]
}

export interface BulkUpdateState {
    BulkUpdateValue: string
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
}


export interface SmartEditState {
    SmartEditValue: number
    MathOperation:  'Add'|'Subtract'|'Multiply'| 'Divide'| 'Replace'
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
    IncludeVendorState: boolean;
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