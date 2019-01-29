export interface IFilterOptions {
    /**
    * Whether to make the font in the Column header for filtered columns to be bold and italicised
    * This will make it easier for users to see at a glance which columns are currently filtered
    */
    indicateFilteredColumns?: boolean;
    /**
     * Use the Adaptable Blotter filter form in column menu
     * If false, the one supplied by the vendor grid will be used
     * Only applicable in grids where the vendor offers a filter form
     */
    useAdaptableBlotterFilterForm?: boolean;
    /**
    * Use the Adaptable Blotter quick filter row
    * If false, the one supplied by the vendor grid will be used
    * Only applicable in grids where the vendor offers a filter row
    */
    useAdaptableBlotterFloatingFilter?: boolean;
    /**
     * Whether to re-filter the grid when the user edits data
     * The choice is 'Always' (the default), 'Never' or 'Throttle'
     * If 'Throttle' is chosen a 'ThrottleDelay' needs to be provided
     */
    filterActionOnUserDataChange?: IFilterActionOnDataChange;
    /**
   * Whether to re-filter the grid when data changes in the background (ie. not result of user action)
   * The choice is 'Always', 'Never' (the default) or 'Throttle'
   * If 'Throttle' is chosen a 'ThrottleDelay' needs to be provided
   */
    filterActionOnExternalDataChange?: IFilterActionOnDataChange;
}

/**
 * Manages if / when to filter 
 */
export interface IFilterActionOnDataChange {
    RunFilter: 'Always' | 'Never' | 'Throttle';
    ThrottleDelay: number;
}