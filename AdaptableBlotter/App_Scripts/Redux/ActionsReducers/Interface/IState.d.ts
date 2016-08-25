interface MenuState {
    MenuItems: IMenuItem[];
}

interface PopupState {
    ShowPopup: boolean;
    ShowErrorPopup: boolean;
    ComponentClassName: string;
    ErrorMsg: string;
}

interface SmartEditState {
    SmartEditValue: number
    SmartEditOperation: SmartEditOperation
    Preview: ISmartEditPreview
}