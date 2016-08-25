import {SmartEditOperation} from '../../../Core/Enums'
import {ISmartEditPreview} from '../../../Core/interface/ISmartEditStrategy'

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