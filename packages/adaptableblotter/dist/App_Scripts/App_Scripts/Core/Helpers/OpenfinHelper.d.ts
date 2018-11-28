import { IEvent } from '../Interface/IEvent';
import { ExcelWorkbook } from '../Interface/OpenfinLiveExcel/ExcelWorkbook';
export declare module OpenfinHelper {
    function OnExcelDisconnected(): IEvent<any, any>;
    function OnWorkbookDisconnected(): IEvent<any, ExcelWorkbook>;
    function OnWorkbookSaved(): IEvent<any, {
        OldName: string;
        NewName: string;
    }>;
    function isRunningInOpenfin(): boolean;
    function isExcelOpenfinLoaded(): boolean;
    function pushData(workBookName: string, data: any[]): Promise<any>;
    function initOpenFinExcel(): Promise<string>;
}
