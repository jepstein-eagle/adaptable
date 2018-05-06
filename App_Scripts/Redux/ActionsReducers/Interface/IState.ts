import { MathOperation, LeafExpressionOperator, DisplayAction } from '../../../Core/Enums'
import { IScreenPopup, IWarningPopup, IConfirmationPopup, IErrorPopup, IPromptPopup, IInfoPopup } from '../../../Core/Interface/IMessage'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { IAdaptableBlotterOptions } from '../../../Core/Api/Interface/IAdaptableBlotterOptions';

/*
Created by the system  at run-time and not part of predefined or user config
*/

export interface GridState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    BlotterOptions: IAdaptableBlotterOptions;
    BlotterRestrictions: string[]
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
}

export interface TeamSharingState {
    Activated: boolean
    SharedEntities: ISharedEntity[]
}

export interface BulkUpdateState {
    BulkUpdateValue: string
    PreviewInfo: IPreviewInfo
}

/*
predefined config only - never editable by users
*/
export interface EntitlementsState {
    FunctionEntitlements: IEntitlement[];
}

export interface UserInterfaceState {
    ColorPalette: string[];
    StyleClassNames: string[]
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
    IsMinimised: boolean
}


export interface SmartEditState {
    SmartEditValue: string
    SmartEditOperation: MathOperation
    PreviewInfo: IPreviewInfo // not saved with state
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

export interface PlusMinusState {
    PlusMinusRules: IPlusMinusRule[]
}

export interface CustomSortState {
    CustomSorts: ICustomSort[];
}

export interface ShortcutState {
    Shortcuts: IShortcut[];
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


export interface AdvancedSearchState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}

export interface FilterState {
    ColumnFilters: IColumnFilter[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
}

export interface CellValidationState {
    CellValidations: ICellValidationRule[]
}

export interface LayoutState {
    CurrentLayout: string;
    Layouts: ILayout[]
}

export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string
}

export interface FormatColumnState {
    FormatColumns: IFormatColumn[]
}