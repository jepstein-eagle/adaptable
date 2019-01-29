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
     * not sure...
     */
    filterActionOnUserDataChange?: IFilterActionOnDataChange;
    filterActionOnExternalDataChange?: IFilterActionOnDataChange;
}
export interface IFilterActionOnDataChange {
    RunFilter: 'Always' | 'Never' | 'Throttle';
    ThrottleDelay: number;
}
