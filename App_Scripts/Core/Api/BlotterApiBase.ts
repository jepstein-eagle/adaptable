import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ISearchChangedEventArgs";
import { IEvent } from "../Interface/IEvent";
import { IBlotterApi } from "./IBlotterApi";

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setDataSource(dataSource: any): void {      // no implementation     
    }
    
    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
        return this.blotter.SearchedChanged;
    }

}