

/**
 * The class injected into the Adaptable Blotter at startup providing all the user, grid and config information required
 */
export interface IAdaptableBlotterOptions {

    /**
     * Unique column in the grid (required for cell identification purposes); the only MANDATORY property
     */
    primaryKey?: string,
    /**
     * How to identifier this Blotter - useful if Audit Log is turned on
     */
    blotterId?: string,
    /**
    * Current user of the Adaptable Blotter
    */
    userName?: string,
    /**
     * If enabled, every keystroke, data change, user action etc. is sent as JSON to the Audit Http Channel
     */
    enableAuditLog?: boolean,
    /**
     * If true, config is stored on a server location of your choice; otherwise it is stored locally
     */
    enableRemoteConfigServer?: boolean,
    /**
     * Configuration properties and objects set at design-time (only used if enableRemoteConfigServer is false)
     */
    predefinedConfig?: object,
    /**
     * How many items to show in column value listboxes when building queries (useful when datasource is very large)
     */
    maxColumnValueItemsDisplayed: number,
    /**
     * Name of the <div> where the modals should appear; if not set, modals will be displayed in the middle of the page
     */
    modalContainer?: string,
    /**
     * Which searching and filtering options, if any, should take place on the server; leave unset to perform everything on the client
     */
    serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort'
    /**
     * Whether the query builder will include just ColumnValues (or also Filters and Ranges).  Used primarily if running search on Server
     */
    columnValuesOnlyInQueries: boolean
    /**
     * The name of the container which contains the Adaptable Blotter - defaults to "adaptableBlotter"
     */
    abContainerName?: string

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
    }
}
