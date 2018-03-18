import { MathOperation, LeafExpressionOperator, QuickSearchDisplayType } from '../../../Core/Enums'
import { IScreenPopup, IWarningPopup, IConfirmationPopup, IErrorPopup, IPromptPopup, IInfoPopup } from '../../../Core/Interface/IMessage'
import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy'
import { ICalculatedColumn } from '../../../Strategy/Interface/ICalculatedColumnStrategy'
import { IShortcut } from '../../../Strategy/Interface/IShortcutStrategy'
import { IReport, ILiveReport, IPPDomain } from '../../../Strategy/Interface/IExportStrategy'
import { IFlashingColumn } from '../../../Strategy/Interface/IFlashingCellsStrategy'
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu'
import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { ICalendar } from '../../../Strategy/Interface/ICalendarStrategy';
import { IConditionalStyleCondition } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import { IStyle } from '../../../Core/Interface/IStyle';
import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import { IColumnFilter } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement } from '../../../Core/Interface/Interfaces';


export interface PlusMinusState {
  //  DefaultNudge: number
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
    ActionConfigurationPopup: IScreenPopup
    ErrorPopup: IErrorPopup
    WarningPopup: IWarningPopup
    InfoPopup: IInfoPopup
    ConfirmationPopup: IConfirmationPopup
    PromptPopup: IPromptPopup
}

export interface SmartEditState {
    SmartEditValue: string
    SmartEditOperation: MathOperation
    PreviewInfo: IPreviewInfo
}

export interface BulkUpdateState {
    BulkUpdateValue: string
    PreviewInfo: IPreviewInfo
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

export interface ExportState {
    IPPDomainsPages: IPPDomain[]
    CurrentReport: string;
    CurrentLiveReports: ILiveReport[];
    Reports: Array<IReport>;
    ErrorMsg: string;
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
    QuickSearchDefaultBackColor: string
    QuickSearchDefaultForeColor: string
    QuickSearchText: string
    QuickSearchOperator: LeafExpressionOperator
    QuickSearchDisplayType: QuickSearchDisplayType
    QuickSearchStyle: IStyle
}

export interface AdvancedSearchState {
    AdvancedSearches: Array<IAdvancedSearch>;
    CurrentAdvancedSearch: string
}

export interface ColumnFilterState {
     ColumnFilters: Array<IColumnFilter>
}

export interface UserFilterState {
    UserFilters: Array<IUserFilter>;
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
    DashboardFunctionToolbars: string[]
    DashboardFunctionButtons: string[]
    DashboardZoom: number,
    IsDashboardMinimised: boolean
}

export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    EditedCalculatedColumnInvalidErrorMsg: string
}

export interface UIControlConfigState {
    PredefinedColorChoices: string[];
}

export interface TeamSharingState {
    Activated : boolean
    SharedEntities: ISharedEntity[]
}

export interface FormatColumnState {
    FormatColumns: Array<IFormatColumn>
}