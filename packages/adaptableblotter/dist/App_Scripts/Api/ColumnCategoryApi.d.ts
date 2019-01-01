import { ApiBase } from "./ApiBase";
import { IColumnCategory } from './Interface/Interfaces';
export interface IColumnCategoryApi {
    GetAll(): IColumnCategory[];
    Add(columnCategory: IColumnCategory): void;
    Create(columnCategoryId: string, columns: string[]): void;
    Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    Delete(columnCategoryId: string): void;
    AddColumns(columnCategoryId: string, columns: string[]): void;
    RemoveColumns(columnCategoryId: string, columns: string[]): void;
}
export declare class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {
    GetAll(): IColumnCategory[];
    Add(columnCategory: IColumnCategory): void;
    Create(columnCategoryId: string, columns: string[]): void;
    Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    AddColumns(columnCategoryId: string, columns: string[]): void;
    RemoveColumns(columnCategoryId: string, columns: string[]): void;
    Delete(columnCategoryId: string): void;
}
