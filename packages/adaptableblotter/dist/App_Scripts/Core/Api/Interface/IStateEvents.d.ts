import { IAdvancedSearch, ICustomSort, IColumnFilter, IGridSort } from "./IAdaptableBlotterObjects";
import { IUserState } from "../../../Redux/ActionsReducers/Interface/IState";
export interface IColumnStateChangedEventArgs {
    currentLayout: string;
}
export interface IFDC3Schema {
    object: string;
    definition: string;
    version: string;
}
export interface IStateChangedEventArgs extends IFDC3Schema {
    data: IStateEventData[];
}
/**
 * EventArgs sent as part of the onSearchedChanged Event
 */
export interface ISearchChangedEventArgs extends IFDC3Schema {
    data: ISearchEventData[];
}
export interface IEventData {
    name: string;
    type: string;
}
export interface IStateEventData extends IEventData {
    id: IStateChangedInfo;
}
export interface ISearchEventData extends IEventData {
    id: ISearchChangedInfo;
}
export interface IStateChangedInfo {
    stateChangedTrigger: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'SelectedCells' | 'Shortcut' | 'SmartEdit' | 'Theme' | 'UserFilter';
    userState: IUserState;
}
export interface ISearchChangedInfo {
    /**
     * Which action in the grid caused the Search state to chagne
     */
    searchChangedTrigger: 'DataSource' | 'AdvancedSearch' | 'QuickSearch' | 'ColumnFilter' | 'UserFilter' | 'DataChange' | 'Sort';
    /**
     * All current active search and filters in the Grid
     */
    blotterSearchState: IBlotterSearchState;
    /**
     * The current sort state in the Grid
     */
    blotterSortState: IBlotterSortState;
    /**
     * Date the search should use - defaults to now
     * Uuseful if getting historical data
     */
    searchAsAtDate: Date;
}
/**
 * The current Search and Filter in the Blotter
 */
export interface IBlotterSearchState {
    /**
     * Current Static Search (if any selected)
     */
    dataSource: string;
    /**
     * Current Advanced Search (if any selected)
     */
    advancedSearch: IAdvancedSearch;
    /**
     * Current live Quick Search text. (Value can be null)
     */
    quickSearch: string;
    /**
     * Details of any column filters currently applied
     */
    columnFilters: IColumnFilter[];
}
/**
 * Overview of the current sorting state in the grid
 */
export interface IBlotterSortState {
    /**
     * Which columns (if any) have sorting applied and,if so, which direction
     */
    gridSorts: IGridSort[];
    /**
     * Whether any columns have non-standard sorts applied to them.  Note: this data is always sent even if no custom sorts are currently applied.
     */
    customSorts: ICustomSort[];
}
