import { ServerSearchOption } from "../../Enums";

/**
 * This is the class injected into the Blotter at startup providing all the information required to get started
 */
export interface IAdaptableBlotterOptions {
    
    /**
     * @prop a unique column in the grid (required for cell identification purposes).  This is the only MANDATORY property
     */
    primaryKey?: string,
    /**
     * @prop whether audit log is enabled; is so then every keystroke, data change, user action etc. is sent as JSON to the Audit Http Channel
     */
    enableAuditLog?: boolean,
    enableRemoteConfigServer?: boolean,
    userName?: string,
    blotterId?: string,
    predefinedConfig?: object,
    maxColumnValueItemsDisplayed: number,
    modalContainer?: string,
    serverSearchOption?: ServerSearchOption
    iPushPullConfig?: {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }
}
