import { EventDispatcher } from "../EventDispatcher";
import { IAdvancedSearch } from "../../Strategy/Interface/IAdvancedSearchStrategy";
import { IEvent } from "../Interface/IEvent";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ISearchChangedEventArgs";


// this is very early days but the idea will be - over time - that this is how people will access the AB externally
// and we will use the IAdaptableBlotter interface internally
export interface IBlotterApi {
    setDataSource(dataSource: any): void
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
}
