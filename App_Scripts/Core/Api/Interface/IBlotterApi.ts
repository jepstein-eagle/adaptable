import { EventDispatcher } from "../../EventDispatcher";
import { IEvent } from "../../Interface/IEvent";
import { IAdaptableBlotter } from "../../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ServerSearch";

/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
    /**
     * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
     * @param dataSource can be any datasource that is suitable for the underlying grid.  
     */
    setDataSource(dataSource: any): void;

    /**
     * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
     * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
     */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

    /**
     * Selects the layout
     * @param layoutName has to be an existing layout
     */
     setLayout(layoutName: string): void

     /**
      * Clears the currently selected layout
      */
     clearLayout():void
   
}
