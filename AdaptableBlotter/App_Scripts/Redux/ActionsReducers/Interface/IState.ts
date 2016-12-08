import {SmartEditOperation, LeafExpressionOperator} from '../../../Core/Enums'
import {ISmartEditPreview} from '../../../Core/interface/ISmartEditStrategy'
import {ICustomSort} from '../../../Core/interface/ICustomSortStrategy'
import {IShortcut} from '../../../Core/interface/IShortcutStrategy'
import {IFlashingColumn} from '../../../Core/interface/IFlashingCellsStrategy'
import {IMenuItem} from '../../../Core/interface/IStrategy'
import {IColumn} from '../../../Core/interface/IAdaptableBlotter'
import { IPlusMinusCondition } from '../../../Core/interface/IPlusMinusStrategy';
import {ICalendar} from '../../../Core/interface/ICalendarStrategy';
import {IConditionalStyleCondition} from '../../../Core/interface/IConditionalStyleStrategy';


export interface PlusMinusState {
    DefaultNudge: number
    ColumnsDefaultNudge: IPlusMinusCondition[]
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
    ComponentClassName: string;
    ErrorMsg: string;
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
    NumericShortcuts : Array<IShortcut>;
    DateShortcuts : Array<IShortcut>; 
}

export interface ExcelExportState {
    FileName: string;
    AllPages: boolean;
}

export interface FlashingCellState {
    FlashingColumns: Array<IFlashingColumn>
}

export interface CalendarState{
  CurrentCalendar : string ;
}

export interface ConditionalStyleState{
  ConditionalStyleConditions : Array<IConditionalStyleCondition> ;
}

// nothing at present but will add in due course...
export interface PrintPreviewState {
    
}

export interface QuickSearchState{
    QuickSearchText: string
    QuickSearchOperator: LeafExpressionOperator 
    IsCaseSensitive: Boolean
}

export interface AdvancedSearchState{
    AdvancedSearchName: string
    
}