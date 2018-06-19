import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { DefaultAdaptableBlotterOptions } from "../../Core/DefaultAdaptableBlotterOptions";

export interface IAdaptableBlotterOptionsKendo extends IAdaptableBlotterOptions {
    kendoGrid:  kendo.ui.Grid
}

export const DefaultAdaptableBlotterOptionsKendo: IAdaptableBlotterOptionsKendo = { 
    enableAuditLog: DefaultAdaptableBlotterOptions.enableAuditLog,
    enableRemoteConfigServer: DefaultAdaptableBlotterOptions.enableRemoteConfigServer,
    userName: DefaultAdaptableBlotterOptions.userName,
    blotterId: DefaultAdaptableBlotterOptions.blotterId,
    predefinedConfig: DefaultAdaptableBlotterOptions.predefinedConfig,
    maxColumnValueItemsDisplayed: DefaultAdaptableBlotterOptions.maxColumnValueItemsDisplayed,
    serverSearchOption: DefaultAdaptableBlotterOptions.serverSearchOption,
    columnValuesOnlyInQueries: DefaultAdaptableBlotterOptions.columnValuesOnlyInQueries,
    abContainerName: DefaultAdaptableBlotterOptions.abContainerName,
    // kendo options
    kendoGrid: null

}