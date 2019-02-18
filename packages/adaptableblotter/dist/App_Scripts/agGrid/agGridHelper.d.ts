import { ICellRendererFunc, ColDef, GridOptions } from "ag-grid-community";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 */
export declare module agGridHelper {
    function createCellRendererFunc(pcr: IPercentBar): ICellRendererFunc;
    function cleanValue(value: string): string;
    function getRenderedValue(percentBars: IPercentBar[], colDef: ColDef, valueToRender: any): any;
    function safeSetColDefs(colDefs: ColDef[], gridOptions: GridOptions): void;
}
