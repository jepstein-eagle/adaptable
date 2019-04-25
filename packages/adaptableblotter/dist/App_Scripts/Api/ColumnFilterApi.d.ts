import { ApiBase } from "./ApiBase";
import { IColumnFilter } from "../Utilities/Interface/BlotterObjects/IColumnFilter";
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
    GetState(): ColumnFilterState;
    Set(columnFilters: IColumnFilter[]): void;
    SetFromUserFilter(userFilter: string): void;
    Clear(columnFilter: IColumnFilter): void;
    ClearByColumns(columns: string[]): void;
    ClearByColumn(column: string): void;
    ClearAll(): void;
    GetAll(): IColumnFilter[];
}
