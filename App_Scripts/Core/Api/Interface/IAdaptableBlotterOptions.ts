import { ServerSearchOption } from "./ServerSearch";

/**
 * This is the class injected into the Blotter at startup providing all the information required to get started
 */
export interface IAdaptableBlotterOptions {

    /**
     * @prop a unique column in the grid (required for cell identification purposes); the only MANDATORY property
     */
    primaryKey?: string,
    /**
     * @prop a way to identifier this Blotter - useful if Audit Log is turned on
     */
    blotterId?: string,
    /**
    * @prop the current user of the Adaptable Blotter
    */
    userName?: string,
    /**
     * @prop if Audit Log is enabled, every keystroke, ata change, user action etc. is sent as JSON to the Audit Http Channel
     */
    enableAuditLog?: boolean,
    /**
     * @prop when set to true, config is stored on a server location of your choice (rather than locally)
     */
    enableRemoteConfigServer?: boolean,
    /**
     * @prop configuration properties and objects set at design-time (only used if enableRemoteConfigServer is false)
     */
    predefinedConfig?: object,
    /**
     * @prop how many items to show in the column value listboxes when building queries (useful if you have a very large dataset)
     */
    maxColumnValueItemsDisplayed: number,
    /**
     * @prop the name of the <div> where the modals should appear; if left blank they display in the middle of the page
     */
    modalContainer?: string,
    /**
     * @prop which searching and filtering options, if any, should take place on ther server; leave unset to perform everything on the client
     */
    serverSearchOption?: ServerSearchOption
    /**
     * @prop required if using iPushPull to display / send live report data
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
