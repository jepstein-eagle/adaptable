import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISearchChangedArgs } from "./ISearchChangedArgs";
import { IEvent } from "../Interface/IEvent";
import { IBlotterApi } from "./IBlotterApi";

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setDataSource(dataSource: any): void {      // no implementation     
    }
    
    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedArgs> {
        return this.blotter.SearchedChanged;
    }

}