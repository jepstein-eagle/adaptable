import { SmartEditOperation, LeafExpressionOperator, QuickSearchDisplayType } from '../../../Core/Enums'
import { InputAction } from '../../../Core/Interface/IStrategy'
import { ISmartEditPreview } from '../../../Core/Interface/ISmartEditStrategy'
import { ICustomSort } from '../../../Core/Interface/ICustomSortStrategy'
import { ICalculatedColumn } from '../../../Core/Interface/ICalculatedColumnStrategy'
import { IShortcut } from '../../../Core/Interface/IShortcutStrategy'
import { IRange } from '../../../Core/Interface/IExportStrategy'
import { IFlashingColumn } from '../../../Core/Interface/IFlashingCellsStrategy'
import { IMenuItem } from '../../../Core/Interface/IStrategy'
import { IColumn, IEntitlement } from '../../../Core/Interface/IAdaptableBlotter'
import { IPlusMinusCondition } from '../../../Core/Interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Core/Interface/ICalendarStrategy';
import { IConditionalStyleCondition, IStyle } from '../../../Core/Interface/IConditionalStyleStrategy';
import { IAdvancedSearch } from '../../../Core/Interface/IAdvancedSearchStrategy';
import { IColumnFilter } from '../../../Core/Interface/IFilterStrategy';
import { IUserFilter } from '../../../Core/Interface/IExpression';
import { ICellValidationRule } from '../../../Core/Interface/ICellValidationStrategy';
import { ILayout } from '../../../Core/Interface/ILayoutStrategy';
import { IDashboardStrategyControlConfiguration } from '../../../Core/Interface/IDashboardStrategy';
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
    BuildContextMenu: boolean
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

export interface RangeState {
    CurrentRangeId: string;
    Ranges: Array<IRange>;
}

export interface ExportState {
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

export interface QuickSearchState {
    QuickSearchDefaultBackColour: string
    QuickSearchDefaultForeColour: string
    QuickSearchText: string
    QuickSearchOperator: LeafExpressionOperator
    QuickSearchDisplayType: QuickSearchDisplayType
    QuickSearchStyle: IStyle
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
    DashboardStrategyControls: IDashboardStrategyControlConfiguration[],
    DashboardZoom: number
}

export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    EditedCalculatedColumnInvalidErrorMsg: string
}