import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IEvent } from "../Interface/IEvent";
import { ISearchChangedEventArgs } from "./Interface/ISearchChangedEventArgs";
import { IBlotterApi } from "./Interface/IBlotterApi";

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setDataSource(dataSource: any): void {      // no implementation     
    }
    
    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
        return this.blotter.SearchedChanged;
    }

}