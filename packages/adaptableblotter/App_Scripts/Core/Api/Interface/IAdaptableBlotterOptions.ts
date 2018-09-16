import { DistinctCriteriaPairValue } from "../../Enums";

/**
 * The class injected into the Adaptable Blotter at startup 
 * providing all the user, grid and config information required
 */
export interface IAdaptableBlotterOptions {
    /**
     * Unique column in the grid (required for cell identification purposes)
     * One of the three MANDATORY properties
     */
    primaryKey: string;
    /**
    * The underlying vendor grid or grid object
    * One of the three MANDATORY properties (except for Hypergrid Angular wrapper)
    */
    vendorGrid?: any;
    /**
     * How to identifier this Blotter
     * Useful if Audit Log is turned on or you are using multiple Blotters
     */
    blotterId?: string;
    /**
    * Current user of the Adaptable Blotter
    */
    userName?: string;
    /**
     * If enabled, every keystroke, data change, user action etc. is logged
     * This is then sent as JSON to the Audit Http Channel
     */
    enableAuditLog?: boolean;
    /**
     * If true, config is stored at server location of your choice
     * Otherwise it is stored in the local cache
     */
    enableRemoteConfigServer?: boolean;
    /**
     * Configuration properties and objects set at design-time
     * Only used if enableRemoteConfigServer is false
     */
    predefinedConfig?: any;
    /**
     * How many items to dispay in column value listboxes when building queries
     * Useful when datasource is very large
     */
    maxColumnValueItemsDisplayed?: number;
    /**
     * Name of the <div> where the modals should appear
     * If not set, modals will be displayed in the middle of the page
     */
    modalContainer?: string;
    /**
     * Which searching and filtering options, if any, should take place on the server
     * Leave unset (default is 'None') to perform everything on the client
     */
    serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';
    /**
     * Whether the query builder will include just ColumnValues
     * Or should also include Filters and Ranges (the default) 
     * Used primarily if running search on Server
     */
    columnValuesOnlyInQueries?: boolean;
    /**
     * Name of the <div> which contains the Adaptable Blotter
     * Defaults to "adaptableBlotter"
     */
    adaptableBlotterContainer?: string;
    /**
    * Name of the <div> which contains the underlying vendor grid
    * Defaults to "grid"
    */
    vendorContainer?: string;
    /**
     * Whether layouts should include vendor-related state
     * Defaults to false - only currently available in ag-Grid
     */
    includeVendorStateInLayouts?: boolean;
    /**
     * Whether layouts should save as soon as column order or sorts change
     * Defaults to false - user needs to click save to persist changes
     */
    autoSaveLayouts?: boolean;
    /**
     * When running queries on text columns to ignore case
     * Defaults to true - case is ignored by default 
     * (e.g. [StartsWith 'c'] will return true for the value 'Canada')
     */
    ignoreCaseInQueries?: boolean;
    /**
    * Required if using iPushPull to display / send live report data
    */
    iPushPullConfig?: {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    };
    /**
     * Promise providing list of column values
     * Called each time a query is built or filter is opened
     */
    getColumnValues?: (column: string) => Promise<IServerColumnValues>;
}

export interface IServerColumnValues {
    DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';
    ColumnValues: string[];
}
