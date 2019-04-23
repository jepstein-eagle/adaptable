import { ICellRendererFunc, ColDef, GridOptions, SideBarDef, ToolPanelDef } from "ag-grid-community";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { IAdaptableBlotterOptions } from "../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions";
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */
export declare module agGridHelper {
    function getLightThemeName(): string;
    function getDarkThemeName(): string;
    function TrySetUpNodeIds(gridOptions: GridOptions, blotterOptions: IAdaptableBlotterOptions): boolean;
    function createCellRendererFunc(pcr: IPercentBar, blotterId: string): ICellRendererFunc;
    function getCleanValue(value: string): string;
    function getRenderedValue(percentBars: IPercentBar[], colDef: ColDef, valueToRender: any): any;
    function safeSetColDefs(colDefs: ColDef[], gridOptions: GridOptions): void;
    function createAdaptableBlotterSideBarDefs(showFilterPanel: boolean, showColumnsPanel: boolean): SideBarDef;
    function createAdaptableBlotterToolPanel(): ToolPanelDef;
}
