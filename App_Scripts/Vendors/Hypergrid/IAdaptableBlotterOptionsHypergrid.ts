import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { DefaultAdaptableBlotterOptions } from "../../Core/DefaultAdaptableBlotterOptions";

export interface IAdaptableBlotterOptionsHypergrid extends IAdaptableBlotterOptions {
    hypergrid: any
}

export const DefaultAdaptableBlotterOptionsHypergrid: IAdaptableBlotterOptionsHypergrid = { 
    enableAuditLog: DefaultAdaptableBlotterOptions.enableAuditLog,
    enableRemoteConfigServer: DefaultAdaptableBlotterOptions.enableRemoteConfigServer,
    userName: DefaultAdaptableBlotterOptions.userName,
    blotterId: DefaultAdaptableBlotterOptions.blotterId,
    predefinedConfig: DefaultAdaptableBlotterOptions.predefinedConfig,
    maxColumnValueItemsDisplayed: DefaultAdaptableBlotterOptions.maxColumnValueItemsDisplayed,
    serverSearchOption: DefaultAdaptableBlotterOptions.serverSearchOption,
    columnValuesOnlyInQueries: DefaultAdaptableBlotterOptions.columnValuesOnlyInQueries,
    abContainerName: DefaultAdaptableBlotterOptions.abContainerName,
    // hypergrid options
    hypergrid: null

}