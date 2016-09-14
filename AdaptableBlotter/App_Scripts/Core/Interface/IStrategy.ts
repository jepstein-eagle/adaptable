export interface IStrategy{
    Id : string
    getMenuItems() : IMenuItem[]
    onAction(action: string) : void
}

export interface IMenuItem{
    Label : string;
    StrategyId : string;
    Action : string;
    IsEnabled : boolean;
}

export interface IUIError {
    ErrorMsg: string;
}

export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Error?: IUIError
}
