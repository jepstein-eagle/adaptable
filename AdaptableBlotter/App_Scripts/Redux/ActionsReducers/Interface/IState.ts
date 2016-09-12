import {SmartEditOperation} from '../../../Core/Enums'
import {ISmartEditPreview} from '../../../Core/interface/ISmartEditStrategy'
import {ICustomSort} from '../../../Core/interface/ICustomSortStrategy'
import {IShortcut} from '../../../Core/interface/IShortcutStrategy'
import {IMenuItem} from '../../../Core/interface/IStrategy'
import {IColumn} from '../../../Core/interface/IAdaptableBlotter'

export interface PlusMinusState {
    DefaultNudge: number
    ColumnsDefaultNudge: {ColumnId: string, DefaultNudge:number}[]
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
    Shortcuts: Array<IShortcut>;
}