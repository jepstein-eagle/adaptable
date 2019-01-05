import { ApiBase } from "./ApiBase";
import { IColumnFilter } from './Interface/IAdaptableBlotterObjects';
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
export declare class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
    Set(columnFilters: IColumnFilter[]): void;
    SetFromUserFilter(userFilter: string): void;
    Clear(columnFilter: IColumnFilter): void;
    ClearByColumns(columns: string[]): void;
    ClearByColumn(column: string): void;
    ClearAll(): void;
    GetCurrent(): IColumnFilter[];
}
