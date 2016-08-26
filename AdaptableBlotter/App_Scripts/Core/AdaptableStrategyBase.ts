import {IAdaptableBlotter} from './Interface/IAdaptableBlotter'

export abstract class AdaptableStrategyBase implements IStragegy {
    constructor(public Id : string, protected blotter: IAdaptableBlotter)
    {

    }

    abstract getMenuItems() : IMenuItem[];
    public onAction(action:string){
        
    }
}

