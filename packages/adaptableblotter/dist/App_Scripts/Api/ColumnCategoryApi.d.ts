import { ApiBase } from "./ApiBase";
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';
import { IColumnCategory } from "../Utilities/Interface/BlotterObjects/IColumnCategory";
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {
    GetState(): ColumnCategoryState;
    GetAll(): IColumnCategory[];
    Add(columnCategory: IColumnCategory): void;
    Create(columnCategoryId: string, columns: string[]): void;
    Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    AddColumns(columnCategoryId: string, columns: string[]): void;
    RemoveColumns(columnCategoryId: string, columns: string[]): void;
    Delete(columnCategoryId: string): void;
}
