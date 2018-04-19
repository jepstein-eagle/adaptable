import { IEvent } from "./IEvent";
import { EventDispatcher } from "../EventDispatcher";
import { IAdvancedSearch } from "../../Strategy/Interface/IAdvancedSearchStrategy";
import { IAdaptableBlotter } from "./IAdaptableBlotter";


export interface IBlotterApi {
    setDataSource(dataSource: any): void
    onAdvancedSearchedChanged(): IEvent<IAdaptableBlotter, IAdvancedSearch>;
}

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setDataSource(dataSource: any): void {      // no implementation     
    }
   
    
    public onAdvancedSearchedChanged(): IEvent<IAdaptableBlotter, IAdvancedSearch> {
        return this.blotter.AdvancedSearchedChanged;
    }

}