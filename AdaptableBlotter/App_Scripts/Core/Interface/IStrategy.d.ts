interface IStragegy{
    Id : string
    getMenuItems() : IMenuItem[]
}

interface IMenuItem{
    Label : string;
    StrategyId : string;
    Action : string;
}