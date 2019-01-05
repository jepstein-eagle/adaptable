import { IColumnCategory } from './IAdaptableBlotterObjects';
export interface IColumnCategoryApi {
    GetAll(): IColumnCategory[];
    Add(columnCategory: IColumnCategory): void;
    Create(columnCategoryId: string, columns: string[]): void;
    Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    Delete(columnCategoryId: string): void;
    AddColumns(columnCategoryId: string, columns: string[]): void;
    RemoveColumns(columnCategoryId: string, columns: string[]): void;
}
