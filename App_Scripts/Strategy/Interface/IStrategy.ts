import { IEntitlement } from '../../Core/Interface/IAdaptableBlotter'
import * as Redux from 'redux';

export interface IStrategy {
    Id: string
    getMenuItems(): IMenuItem[]
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
}

export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsEnabled: boolean;
    GlyphIcon: string
}

export interface IContextMenu {
    BuildContextMenu: boolean
    IsVisible: boolean
    PositionX: number
    PositionY: number
    ColumnId: string
    Items: IMenuItem[]
}

export interface IUIError {
    ErrorMsg: string;
}

export interface IUIWarning {
    WarningMsg: string;
}

export interface IUIInfo {
    InfoMsg: string;
}

export interface IUIConfirmation {
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean;
}


export interface InputAction extends Redux.Action {
    InputText: string
}


export interface IUIPrompt {
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}

export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Error?: IUIError
}


export interface ICellInfo {
    Id: any,
    ColumnId: string,
    Value: any
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