import { GridOptions } from "ag-grid";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { DefaultAdaptableBlotterOptions } from "../../Core/DefaultAdaptableBlotterOptions";

export interface IAdaptableBlotterOptionsAgGrid extends IAdaptableBlotterOptions {
    /**
     * Whether to include vendor state (e.g. column widths, grouping info) when creating a layout
     */
    includeVendorStateInLayouts: boolean;
    /**
     * Name of the div containing the ag-Grid.  Defaults to "grid"
     */
    agGridContainerName: string

    /**
     * The main GridOptions object which is passed into the ag-Grid
     */
    gridOptions: GridOptions
}

export const DefaultAdaptableBlotterOptionsAgGrid: IAdaptableBlotterOptionsAgGrid = { 
    enableAuditLog: DefaultAdaptableBlotterOptions.enableAuditLog,
    enableRemoteConfigServer: DefaultAdaptableBlotterOptions.enableRemoteConfigServer,
    userName: DefaultAdaptableBlotterOptions.userName,
    blotterId: DefaultAdaptableBlotterOptions.blotterId,
    predefinedConfig: DefaultAdaptableBlotterOptions.predefinedConfig,
    maxColumnValueItemsDisplayed: DefaultAdaptableBlotterOptions.maxColumnValueItemsDisplayed,
    serverSearchOption: DefaultAdaptableBlotterOptions.serverSearchOption,
    columnValuesOnlyInQueries: DefaultAdaptableBlotterOptions.columnValuesOnlyInQueries,
    abContainerName: DefaultAdaptableBlotterOptions.abContainerName,
    // ag-Grid options
    agGridContainerName: "grid",
    includeVendorStateInLayouts: false,
    gridOptions: null

}