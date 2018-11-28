import { ExcelWorkbook } from '../Services/OpenfinLiveExcel/ExcelWorkbook';
import { IEvent } from '../../Core/Interface/IEvent';
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
