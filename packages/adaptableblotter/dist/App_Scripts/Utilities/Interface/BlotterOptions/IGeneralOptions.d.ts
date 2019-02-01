export interface IGeneralOptions {
    /**
    * Which searching and filtering options, if any, should take place on the server
    * Leave unset (default is 'None') to perform everything on the client
    */
    serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';
    /**
    * Use the default theme that we provide for the vendor grid
    * There is one each for 'Light Theme' and 'Dark Theme'
    * See Help for more details
    */
    useDefaultVendorGridThemes?: boolean;
    /**
    * Whether to show a warning if the primary key column identified in this Options does not exist
    * Recommended to set to true (default) as a wrongly applied primary key can affect many functions
    */
    showMissingPrimaryKeyWarning?: boolean;
    /**
    * Whether to prevent a duplicate value being entered into the Primary Key column.
    * Recommended to set to true (default) to ensure that each cell can in the grid can be uniquely identified and referred to.
    */
    preventDuplicatePrimaryKeyValues?: boolean;
}
