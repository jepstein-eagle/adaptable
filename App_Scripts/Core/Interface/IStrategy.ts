import { MenuType } from '../Enums';
import { IColumn } from '../Interface/IAdaptableBlotter'
import { IEntitlement } from '../Interface/IAdaptableBlotter'
import * as Redux from 'redux';

export interface IStrategy {
    Id: string
    getMenuItems(): IMenuItem[]
    getStrategyEntitlement(): IEntitlement
}

export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    IsEnabled: boolean;
    MenuType: MenuType;
    GlyphIcon: string
}

export interface IUIError {
    ErrorMsg: string;
}

export interface IUIWarning {
    WarningMsg: string;
}

export interface IUIConfirmation {
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
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
