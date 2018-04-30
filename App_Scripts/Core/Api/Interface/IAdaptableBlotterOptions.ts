import { ServerSearchOption } from "../../Enums";

/**
 * This is the class injected into the Blotter at startup providing all the information required to get started
 */
export interface IAdaptableBlotterOptions {
    /**
     * @prop -- whether audit log is enabled
     */
    enableAuditLog?: boolean,
    enableRemoteConfigServer?: boolean,
    userName?: string,
    primaryKey?: string,
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
