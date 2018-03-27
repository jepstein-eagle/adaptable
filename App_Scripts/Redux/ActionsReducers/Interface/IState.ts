import { MathOperation, LeafExpressionOperator, QuickSearchDisplayType } from '../../../Core/Enums'
import { IScreenPopup, IWarningPopup, IConfirmationPopup, IErrorPopup, IPromptPopup, IInfoPopup } from '../../../Core/Interface/IMessage'
import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy'
import { ICalculatedColumn } from '../../../Strategy/Interface/ICalculatedColumnStrategy'
import { IShortcut } from '../../../Strategy/Interface/IShortcutStrategy'
import { IReport, ILiveReport, IPPDomain } from '../../../Strategy/Interface/IExportStrategy'
import { IFlashingCell } from '../../../Strategy/Interface/IFlashingCellsStrategy'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import {  IPlusMinusRule } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Strategy/Interface/ICalendarStrategy';
import { IConditionalStyle } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import { IStyle } from '../../../Core/Interface/IStyle';
import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import { IColumnFilter } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { IUserFilter, ISystemFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement } from '../../../Core/Interface/Interfaces';
import { IUserTheme } from '../../../Strategy/Interface/IThemeStrategy';

/*
Created by the system and not part of predefined or user config
*/
export interface GridState {
    Columns: IColumn[];
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
    Activated : boolean
    SharedEntities: ISharedEntity[]
}

export interface UIControlConfigState {  // not sure about this one...
    PredefinedColorChoices: string[];
}

export interface BulkUpdateState {
    BulkUpdateValue: string  
    PreviewInfo: IPreviewInfo 
}

export interface  SystemFilterState{
    SystemFilters: ISystemFilter[]
}

/*
predefined config only - not editable by users
*/
export interface EntitlementsState {
    FunctionEntitlements: IEntitlement[];
}

/* 
predefined and user config
*/
export interface DashboardState {
    FunctionToolbars: string[]
    FunctionButtons: string[]
    Zoom: number,
    IsMinimised: boolean
}

export interface PlusMinusState {
    PlusMinusRules: IPlusMinusRule[]
}

export interface SmartEditState {
    SmartEditValue: string
    SmartEditOperation: MathOperation
    PreviewInfo: IPreviewInfo // not saved with state
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
    Reports: Array<IReport>;
    ErrorMsg: string;
}

export interface FlashingCellState {
    FlashingCells: IFlashingCell[]
}

export interface CalendarState {
    CurrentCalendar: string;
    AvailableCalendars: ICalendar[]
}

export interface ConditionalStyleState {
    ConditionalStyles: Array<IConditionalStyle>;
}

export interface QuickSearchState {
    QuickSearchBackColor: string
    QuickSearchForeColor: string
    QuickSearchText: string
    QuickSearchOperator: LeafExpressionOperator
    QuickSearchDisplayType: QuickSearchDisplayType
    QuickSearchStyle: IStyle
}

export interface AdvancedSearchState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}

export interface ColumnFilterState {
     ColumnFilters: IColumnFilter[];
}

export interface UserFilterState {
    UserFilters: IUserFilter[];

}

export interface ThemeState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}

export interface CellValidationState {
    CellValidations: ICellValidationRule[]
}

export interface LayoutState {
    CurrentLayout: string;
    AvailableLayouts: ILayout[]
}

export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string
}

export interface FormatColumnState {
    FormatColumns: IFormatColumn[]
}