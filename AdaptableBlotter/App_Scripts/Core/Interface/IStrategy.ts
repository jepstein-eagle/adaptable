import { MenuType } from '../Enums';
import { IColumn } from '../Interface/IAdaptableBlotter'


export interface IStrategy {
    Id: string
    getMenuItems(): IMenuItem[]
    onAction(action: string): void
    addColumnMenuItem(column: IColumn, menuItems: string[]): void
    // not sure if this is best or not = feels a bit old fashioned and should use lambdas / actions...
    onColumnMenuItemClicked(column: IColumn, menuItem: string): void
}

export interface IMenuItem {
    Label: string;
    StrategyId: string;
    Action: string;
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

export interface IUIPrompt {
    PromptTitle: string;
    PromptMsg: string;
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
