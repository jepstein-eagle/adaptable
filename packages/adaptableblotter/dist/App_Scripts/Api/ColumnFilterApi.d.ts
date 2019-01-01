import { ApiBase } from "./ApiBase";
import { IColumnFilter } from './Interface/IAdaptableBlotterObjects';
export interface IColumnFilterApi {
    Set(columnFilters: IColumnFilter[]): void;
    SetUserFilter(userFilter: string): void;
    Clear(columnFilter: IColumnFilter): void;
    ClearByColumn(column: string): void;
    ClearByColumns(columns: string[]): void;
    ClearAll(): void;
    GetCurrent(): IColumnFilter[];
}
export declare class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
    Set(columnFilters: IColumnFilter[]): void;
    SetUserFilter(userFilter: string): void;
    Clear(columnFilter: IColumnFilter): void;
    ClearByColumns(columns: string[]): void;
    ClearByColumn(column: string): void;
    ClearAll(): void;
    GetCurrent(): IColumnFilter[];
}
