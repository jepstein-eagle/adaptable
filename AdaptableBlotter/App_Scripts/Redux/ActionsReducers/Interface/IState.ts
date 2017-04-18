import { SmartEditOperation, LeafExpressionOperator, QuickSearchDisplayType } from '../../../Core/Enums'
import { InputAction } from '../../../Core/interface/IStrategy'
import { ISmartEditPreview } from '../../../Core/interface/ISmartEditStrategy'
import { ICustomSort } from '../../../Core/interface/ICustomSortStrategy'
import { IShortcut } from '../../../Core/interface/IShortcutStrategy'
import { IFlashingColumn } from '../../../Core/interface/IFlashingCellsStrategy'
import { IMenuItem } from '../../../Core/interface/IStrategy'
import { IColumn, IEntitlement } from '../../../Core/interface/IAdaptableBlotter'
import { IPlusMinusCondition } from '../../../Core/interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Core/interface/ICalendarStrategy';
import { IConditionalStyleCondition } from '../../../Core/interface/IConditionalStyleStrategy';
import { IAdvancedSearch } from '../../../Core/interface/IAdvancedSearchStrategy';
import { IColumnFilter } from '../../../Core/interface/IFilterStrategy';
import { IUserFilter } from '../../../Core/interface/IExpression';
import { ICellValidationRule } from '../../../Core/interface/ICellValidationStrategy';
import { ILayout } from '../../../Core/interface/ILayoutStrategy';
import { IDashboardStrategyControlConfiguration } from '../../../Core/interface/IDashboardStrategy';
import * as Redux from 'redux'


export interface PlusMinusState {
    DefaultNudge: number
    PlusMinusConditions: IPlusMinusCondition[]
}

export interface GridState {
    Columns: IColumn[];
}

export interface MenuState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu
}

export interface IContextMenu {
    IsVisible: boolean
    PositionX: number 
    PositionY: number
    ColumnId: string 
    Items: IMenuItem[]
}

export interface PopupState {
    ActionConfigurationPopup: IActionConfigurationPopup
    ErrorPopup: IErrorPopup
    WarningPopup: IWarningPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup
}

export interface IActionConfigurationPopup {
    ShowPopup: boolean;
    ComponentClassName: string;
    IsReadOnly: boolean
    Params: string
}

export interface IErrorPopup {
    ShowErrorPopup: boolean;
    ErrorMsg: string;
}

export interface IWarningPopup {
    ShowWarningPopup: boolean;
    WarningMsg: string;
}

export interface IConfirmationPopup {
    ShowConfirmationPopup: boolean;
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
}

export interface IPromptPopup {
    ShowPromptPopup: boolean;
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}

export interface SmartEditState {
    SmartEditValue: string
    SmartEditOperation: SmartEditOperation
    Preview: ISmartEditPreview
}

export interface CustomSortState {
    CustomSorts: Array<ICustomSort>;
}

export interface EntitlementsState {
    FunctionEntitlements: Array<IEntitlement>;
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
    AvailableCalendars: ICalendar[]
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
    QuickSearchBackColor: string
}

export interface AdvancedSearchState {
    AdvancedSearches: Array<IAdvancedSearch>;
    CurrentAdvancedSearchId: string
}

export interface FilterState {
    UserFilters: Array<IUserFilter>;
     ColumnFilters: Array<IColumnFilter>
}


export interface ThemeState {
    CurrentTheme: string;
    AvailableThemes: Array<string>
}

export interface CellValidationState {
    CellValidations: Array<ICellValidationRule>
}

export interface LayoutState {
    CurrentLayout: string;
    AvailableLayouts: ILayout[]
}

export interface DashboardState {
    DashboardStrategyControls: IDashboardStrategyControlConfiguration[]
}