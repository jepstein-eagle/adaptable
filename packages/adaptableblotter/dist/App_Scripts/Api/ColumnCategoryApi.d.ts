import { ApiBase } from "./ApiBase";
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';
import { IColumnCategory } from '../Utilities/Interface/IAdaptableBlotterObjects';
export declare class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {
    GetAll(): IColumnCategory[];
    Add(columnCategory: IColumnCategory): void;
    Create(columnCategoryId: string, columns: string[]): void;
    Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    AddColumns(columnCategoryId: string, columns: string[]): void;
    RemoveColumns(columnCategoryId: string, columns: string[]): void;
    Delete(columnCategoryId: string): void;
}
