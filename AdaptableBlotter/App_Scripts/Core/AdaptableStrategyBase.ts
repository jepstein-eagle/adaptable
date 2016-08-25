export abstract class AdaptableStrategyBase implements IStragegy {
    constructor(public Id : string, protected blotter: IAdaptableBlotter)
    {

    }

    abstract getMenuItems() : IMenuItem[];
}

