//TODO : need to move the interface
import {IAdaptableBlotter} from '../Kendo/AdaptableBlotter'

export abstract class AdaptableStrategyBase implements IStragegy {
    constructor(public Id : string, protected blotter: IAdaptableBlotter)
    {

    }

    abstract getMenuItems() : IMenuItem[];
}

