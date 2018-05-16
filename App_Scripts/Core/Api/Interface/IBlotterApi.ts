import { EventDispatcher } from "../../EventDispatcher";
import { IEvent } from "../../Interface/IEvent";
import { IAdaptableBlotter } from "../../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ServerSearch";
import { IAdvancedSearch } from "./AdaptableBlotterObjects";
import { IEntitlement } from "../../Interface/Interfaces";

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
    layoutSet(layoutName: string): void

    /**
     * Clears the currently selected layout
     */
    layoutClear(): void
    /**
     * Runs QuickSearch on the supplied text
     * @param quickSearchText text to run QuickSearch on
     */
    quickSearchRun(quickSearchText: string): void

    /**
     * Clears Quick Search
     */
    quickSearchClear(): void

    /**
    * Selects the dataSource
    * @param dataSource has to be an existing dataSource
    */
    dataSourceSet(dataSource: string): void

    /**
     * Clears the currently selected dataSource
     */
    dataSourceClear(): void


    /**
    * Selects the dataSource
    * @param advancedSearch has to be an existing advanced search
    */
    advancedSearchSet(advancedSearch: string): void

    /**
     * Clears the currently selected advanced search
     */
    advancedSearchClear(): void

    advancedSearchAdd(advancedSearch: IAdvancedSearch): void

    advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void

    advancedSearchDelete(advancedSearchName: string): void

    advancedSearchSelectCurrent(): IAdvancedSearch

    advancedSearchSelectByName(advancedSearchName: string): IAdvancedSearch


    entitlementSelectAll(): IEntitlement[]
    entitlementSelectByFunction(functionName: string): IEntitlement
    entitlementSelectAccessLevelForFunction(functionName: string): string
    entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Default"): void
    entitlementDelete(functionName: string): void

    /**
    * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
    * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
    */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

}




