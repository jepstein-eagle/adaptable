import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IColumn } from "../Interface/IColumn";
export interface IGlue42ExportError {
    row: number;
    column: number;
    description: string;
    foregroundColor: string;
    backgroundColor: string;
}
export interface IGlue42ColumnInfo {
    header: string;
    fieldName: string;
}
export declare module Glue42Helper {
    function init(): Promise<void>;
    function isRunningGlue42(): boolean;
    function exportData(data: any[], gridColumns: IColumn[], blotter: IAdaptableBlotter): Promise<void>;
    function createColumns(data: any[]): IGlue42ColumnInfo[];
    function createData(data: any[], headers: any[]): any;
}
