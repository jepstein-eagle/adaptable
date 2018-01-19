import { SmartEditOperation, LeafExpressionOperator, QuickSearchDisplayType, ExportDestination } from '../../../Core/Enums'
import { InputAction, IContextMenu, IActionConfigurationPopup, IWarningPopup, IConfirmationPopup, IErrorPopup, IPromptPopup } from '../../../Core/Interface/IStrategy'
import { ISmartEditPreview } from '../../../Core/Interface/ISmartEditStrategy'
import { ICustomSort } from '../../../Core/Interface/ICustomSortStrategy'
import { ICalculatedColumn } from '../../../Core/Interface/ICalculatedColumnStrategy'
import { IShortcut } from '../../../Core/Interface/IShortcutStrategy'
import { IRange, ILiveRange, IPPDomain } from '../../../Core/Interface/IExportStrategy'
import { IFlashingColumn } from '../../../Core/Interface/IFlashingCellsStrategy'
import { IMenuItem } from '../../../Core/Interface/IStrategy'
import { IColumn, IEntitlement, IConfigEntity } from '../../../Core/Interface/IAdaptableBlotter'
import { IPlusMinusCondition } from '../../../Core/Interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Core/Interface/ICalendarStrategy';
import { IConditionalStyleCondition } from '../../../Core/Interface/IConditionalStyleStrategy';
import { IFormatColumn } from '../../../Core/Interface/IFormatColumnStrategy';
import { IStyle } from '../../../Core/Interface/IStyle';
import { IAdvancedSearch } from '../../../Core/Interface/IAdvancedSearchStrategy';
import { IColumnFilter } from '../../../Core/Interface/IFilterStrategy';
import { IUserFilter } from '../../../Core/Interface/IExpression';
import { ICellValidationRule } from '../../../Core/Interface/ICellValidationStrategy';
import { ILayout } from '../../../Core/Interface/ILayoutStrategy';
import { IDashboardStrategyControlConfiguration } from '../../../Core/Interface/IDashboardStrategy';
import * as Redux from 'redux'
import { ISharedEntity } from '../../../Core/Interface/ITeamSharingStrategy';


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

export interface PopupState {
    ActionConfigurationPopup: IActionConfigurationPopup
    ErrorPopup: IErrorPopup
    WarningPopup: IWarningPopup
    InfoPopup: IInfoPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup
}

<<<<<<< HEAD
=======
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

export interface IInfoPopup {
    ShowInfoPopup: boolean;
    InfoMsg: string;
}

export interface IConfirmationPopup {
    ShowConfirmationPopup: boolean;
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean,
    ConfirmationComment:string;
}

export interface IPromptPopup {
    ShowPromptPopup: boolean;
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}

>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
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
    Shortcuts: Array<IShortcut>;
}

export interface RangeState {
    CurrentRange: string;
    CurrentLiveRanges: ILiveRange[];
    Ranges: Array<IRange>;
    ErrorMsg: string;
}

export interface ExportState {
    IPPDomainsPages: IPPDomain[]
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

export interface UIControlConfigState {
    PredefinedColorChoices: string[];
}

<<<<<<< HEAD
export interface FormatColumnState {
    FormatColumns: Array<IFormatColumn>;
=======
export interface TeamSharingState {
    Activated : boolean
    SharedEntities: ISharedEntity[]
>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
}