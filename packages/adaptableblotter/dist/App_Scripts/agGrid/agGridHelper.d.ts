import { ICellRendererFunc, ColDef, GridOptions, SideBarDef, ToolPanelDef } from "ag-grid-community";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { IStrategy } from "../Strategy/Interface/IStrategy";
import { IAdaptableBlotter } from "../Utilities/Interface/IAdaptableBlotter";
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */
export declare class agGridHelper {
    private blotter;
    private gridOptions;
    constructor(blotter: IAdaptableBlotter, gridOptions: GridOptions);
    getLightThemeName(): string;
    getDarkThemeName(): string;
    setUpStrategies(): Map<string, IStrategy>;
    TrySetUpNodeIds(isValidPrimaryKey: boolean): boolean;
    createCellRendererFunc(pcr: IPercentBar, blotterId: string): ICellRendererFunc;
    getCleanValue(value: string): string;
    getRenderedValue(percentBars: IPercentBar[], colDef: ColDef, valueToRender: any): any;
    safeSetColDefs(colDefs: ColDef[]): void;
    createAdaptableBlotterSideBarDefs(showFilterPanel: boolean, showColumnsPanel: boolean): SideBarDef;
    createAdaptableBlotterToolPanel(): ToolPanelDef;
}
