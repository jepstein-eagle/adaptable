import { EventDispatcher } from "../EventDispatcher";
import { IEvent } from "../Interface/IEvent";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ISearchChangedEventArgs";



/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
    /**
     * Method to repopulate the grid.  Typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
     * @param dataSource - can be any datasource that is suitable for the underlying grid.  
     */
    setDataSource(dataSource: any): void;

    /**
     * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
     */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
}
