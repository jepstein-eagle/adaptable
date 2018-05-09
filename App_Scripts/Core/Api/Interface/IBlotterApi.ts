import { EventDispatcher } from "../../EventDispatcher";
import { IEvent } from "../../Interface/IEvent";
import { IAdaptableBlotter } from "../../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ServerSearch";
import { IAdvancedSearch } from "./AdaptableBlotterObjects";

/**
 * The main interface between users (devs) and the Blotter while the system is up and running
 */
export interface IBlotterApi {
    /**
     * Repopulates the grid; typically used after listening to a SearchChanged event, so appropriately filtered data on the server can be sent to the Blotter.
     * @param data can be any data from any datasource that is suitable for the underlying grid.  
     */
    setGridData(data: any): void;


    /**
     * Selects the layout
     * @param layoutName has to be an existing layout
     */
    selectLayout(layoutName: string): void

    /**
     * Clears the currently selected layout
     */
    clearLayout(): void
    /**
     * Runs QuickSearch on the supplied text
     * @param quickSearchText text to run QuickSearch on
     */
    runQuickSearch(quickSearchText: string): void

    /**
     * Clears Quick Search
     */
    clearQuickSearch(): void

    /**
    * Selects the dataSource
    * @param dataSource has to be an existing dataSource
    */
    selectDataSource(dataSource: string): void

    /**
     * Clears the currently selected dataSource
     */
    clearDataSource(): void


    /**
    * Selects the dataSource
    * @param advancedSearch has to be an existing advanced search
    */
    selectAdvancedSearch(advancedSearch: string): void

    /**
     * Clears the currently selected advanced search
     */
    clearAdvancedSearch(): void

    addAdvancedSearch(advancedSearch: IAdvancedSearch): void

    editAdvancedSearch(advancedSearchName: string, advancedSearch: IAdvancedSearch): void

    deleteAdvancedSearch(advancedSearchName: string): void

    getCurentAdvancedSearch(): IAdvancedSearch

    getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch





    /**
    * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
    * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
    */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

}




