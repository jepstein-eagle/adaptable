export abstract class AdaptableStrategyBase implements IStragegy {
    constructor(public Id : string)
    {

    }

    abstract getMenuItems() : IMenuItem[];
}