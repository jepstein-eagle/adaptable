
export interface IAdaptableBlotterOptions {
    enableAuditLog?: boolean,
    enableRemoteConfigServer?: boolean,
    userName?: string,
    primaryKey?: string,
    blotterId?: string,
 predefinedConfig?: object,
    maxColumnValueItemsDisplayed: number,
    modalContainer?:  string,
    iPushPullConfig?: {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }
}
