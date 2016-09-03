import {IAdaptableBlotter} from './Interface/IAdaptableBlotter';
import {IStragegy,IMenuItem} from './Interface/IStrategy';

export abstract class AdaptableStrategyBase implements IStragegy {
    constructor(public Id : string, protected blotter: IAdaptableBlotter)
    {

    }

    abstract getMenuItems() : IMenuItem[];
    public onAction(action:string){
        
    }
}

