interface IStragegy{
    Id : string
    getMenuItems() : IMenuItem[]
}

interface IMenuItem{
    Label : string;
    StrategyId : string;
    Action : string;
}

interface IUIError {
    ErrorMsg: string;
}

interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Error?: IUIError
}
