import { SmartEditOperation, LeafExpressionOperator, QuickSearchDisplayType } from '../../../Core/Enums'
import { ISmartEditPreview } from '../../../Core/interface/ISmartEditStrategy'
import { ICustomSort } from '../../../Core/interface/ICustomSortStrategy'
import { IShortcut } from '../../../Core/interface/IShortcutStrategy'
import { IFlashingColumn } from '../../../Core/interface/IFlashingCellsStrategy'
import { IMenuItem } from '../../../Core/interface/IStrategy'
import { IColumn } from '../../../Core/interface/IAdaptableBlotter'
import { IPlusMinusCondition } from '../../../Core/interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Core/interface/ICalendarStrategy';
import { IConditionalStyleCondition } from '../../../Core/interface/IConditionalStyleStrategy';
import { IAdvancedSearch } from '../../../Core/interface/IAdvancedSearchStrategy';
import { IAlert } from '../../../Core/interface/IAlertStrategy';
import { IColumnFilter } from '../../../Core/interface/IColumnFilterStrategy';
import { IUserFilter } from '../../../Core/interface/IExpression';
import { IEditingRestriction } from '../../../Core/interface/IEditingRestrictionStrategy';

export interface PlusMinusState {
    DefaultNudge: number
    PlusMinusConditions: IPlusMinusCondition[]
}

export interface GridState {
    Columns: IColumn[];
}

export interface MenuState {
    MenuItems: IMenuItem[];
}

export interface PopupState {
    ShowPopup: boolean;
    ShowErrorPopup: boolean;
    ShowWarningPopup: boolean;
    ComponentClassName: string;
    ErrorMsg: string;
    WarningMsg: string;
    Params?: any
}

export interface SmartEditState {
    SmartEditValue: number
    SmartEditOperation: SmartEditOperation
    Preview: ISmartEditPreview
}

export interface CustomSortState {
    CustomSorts: Array<ICustomSort>;
}

export interface ShortcutState {
    NumericShortcuts: Array<IShortcut>;
    DateShortcuts: Array<IShortcut>;
}

export interface ExportState {
    FileName: string;
    AllPages: boolean;
    Filterable: boolean
}

export interface FlashingCellState {
    FlashingColumns: Array<IFlashingColumn>
}

export interface CalendarState {
    CurrentCalendar: string;
}

export interface ConditionalStyleState {
    ConditionalStyleConditions: Array<IConditionalStyleCondition>;
}

// nothing at present but will add in due course...
export interface PrintPreviewState {

}

export interface QuickSearchState {
    QuickSearchText: string
    QuickSearchOperator: LeafExpressionOperator
    QuickSearchDisplayType: QuickSearchDisplayType
}

export interface AdvancedSearchState {
    AdvancedSearches: Array<IAdvancedSearch>;
    CurrentAdvancedSearchId: string
}


export interface AlertState {
    Alerts: Array<IAlert>;
}

export interface UserFilterState {
    UserFilters: Array<IUserFilter>;
}

export interface ColumnFilterState {
    ColumnFilters: Array<IColumnFilter>
}

export interface ThemeState {
    CurrentTheme: string;
    AvailableThemes: Array<string>
}

export interface EditingRestrictionState {
    EditingRestrictions: Array<IEditingRestriction>
}