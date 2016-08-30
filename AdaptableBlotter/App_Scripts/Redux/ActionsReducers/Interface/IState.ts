import {SmartEditOperation} from '../../../Core/Enums'
import {ISmartEditPreview} from '../../../Core/interface/ISmartEditStrategy'
import {ICustomSort} from '../../../Core/interface/ICustomSortStrategy'

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