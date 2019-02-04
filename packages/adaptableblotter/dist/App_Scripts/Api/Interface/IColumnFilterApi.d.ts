import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
export interface IColumnFilterApi {
    Set(columnFilters: IColumnFilter[]): void;
    SetFromUserFilter(userFilter: string): void;
    Clear(columnFilter: IColumnFilter): void;
    ClearByColumn(column: string): void;
    ClearByColumns(columns: string[]): void;
    ClearAll(): void;
    GetCurrent(): IColumnFilter[];
}
