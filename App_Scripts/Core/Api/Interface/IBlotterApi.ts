import { EventDispatcher } from "../../EventDispatcher";
import { IEvent } from "../../Interface/IEvent";
import { IAdaptableBlotter } from "../../Interface/IAdaptableBlotter";
import { ISearchChangedEventArgs } from "./ServerSearch";
import { IAdvancedSearch, ILayout, IStyle, IColumnFilter, IUserFilter, ICustomSort, IUserTheme, IShortcut, ICalculatedColumn, ICellValidationRule, IFormatColumn } from "./AdaptableBlotterObjects";
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

    layoutGetCurrent(): ILayout
    layoutIncludeVendorState(): void
    layoutExcludeVendorState(): void

    /**
     * Runs QuickSearch on the supplied text
     * @param quickSearchText text to run QuickSearch on
     */
    quickSearchRun(quickSearchText: string): void

    /**
     * Clears Quick Search
     */
    quickSearchClear(): void

    quickSearchGetValue(): string
    quickSearchSetOperator(operator: 'Contains' | 'StartsWith'): void
    quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void
    quickSearchSetStyle(style: IStyle): void

    /**
    * Selects the dataSource
    * @param dataSource has to be an existing dataSource
    */
    dataSourceSet(dataSource: string): void

    /**
     * Clears the currently selected dataSource
     */
    dataSourceClear(): void

    // Advanced Search api methods
    advancedSearchSet(advancedSearchName: string): void
    advancedSearchClear(): void
    advancedSearchAdd(advancedSearch: IAdvancedSearch): void
    advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void
    advancedSearchDelete(advancedSearchName: string): void
    advancedSearchSelectCurrent(): IAdvancedSearch
    advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch
    advancedSearchGetAll(): IAdvancedSearch[]

    // Dashboard api methods
    dashboardSetAvailableToolbars(availableToolbars: string[]): void
    dashboardSetVisibleToolbars(visibleToolbars: string[]): void
    dashboardShowToolbar(visibleToolbar: string): void
    dashboardHideToolbar(visibleToolbar: string): void
    dashboardSetVisibleButtons(functionButtons: string[]): void
    dashboardSetZoom(zoom: Number): void
    dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void

    // Calendar State
    calendarSetCurrent(calendar: string): void
    calendarGetCurrent(): string

    // Theme State
    themeSelectCurrent(theme: string): void
    themeGetCurrent(): string
    themeSetSystemThemes(systemThemes: string[]): void
    themeSetUserThemes(userThemes: string[]): void
    themeSystemThemeGetAll(): string[]
    themeUserThemeGetAll(): IUserTheme[]

    // SmartEdit api methods
    shortcutGetAll(): IShortcut[]
    shortcutAdd(shortcut: IShortcut): void
    shortcutDelete(shortcut: IShortcut): void

    // SmartEdit api methods
    smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void
    smartEditGetMathOperation(): string
    smartEditSetValue(smartEditValue: number): void
    smartEditGetValue(): number

    // user interface api methods
    uiSetColorPalette(colorPalette: string[]): void
    uiAddColorsToPalette(colorPalette: string[]): void
    uiAddStyleClassNames(styleClassNames: string[]): void

    // filter api methods
    filterSetColumnFilters(columnFilters: IColumnFilter[]): void
    filterSetUserFilters(userFilters: IUserFilter[]): void
    filterSetSystemFilters(systemFilters: string[]): void

    // Entitlement Methods
    entitlementGetAll(): IEntitlement[]
    entitlementGetByFunction(functionName: string): IEntitlement
    entitlementGetAccessLevelForFunction(functionName: string): string
    entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Default"): void
    entitlementDelete(functionName: string): void

    // Custom Sort Methods
    customSortGetAll(): ICustomSort[]
    customSortGetByColumn(columnn: string): ICustomSort
    customSortAdd(column: string, values: string[]): void
    customSortEdit(column: string, values: string[]): void
    customSortDelete(column: string): void

    // Calculated Column State
    calculatedColumnGetAll(): ICalculatedColumn[]
    calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void
    calculatedColumnEditExpression(column: string, columnExpression: string): void
    calculatedColumnDelete(column: string): void


    // CellValidation State
    cellValidationGetAll(): ICellValidationRule[]
    cellValidationAdd(cellValidationRule: ICellValidationRule): void
    cellValidationDelete(cellValidationRule: ICellValidationRule): void

    // FormatColumn State
     formatColumnGetAll(): IFormatColumn[] 
     formatColumnnAdd(column: string, style: IStyle): void 
     formatColumnnUpdate(column: string, style: IStyle): void 
     formatColumnDelete(formatColumn: IFormatColumn): void 
     

    /**
     * Clears the  configuration for the current user, reverting everyting to system defaults.
     * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
     *  */
    clearConfig(): void


    /**
    * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
    * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
    */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
}



