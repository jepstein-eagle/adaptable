import { ApiBase } from "./ApiBase";
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';
import { IColumnCategory } from "../Utilities/Interface/BlotterObjects/IColumnCategory";
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {
    getColumnCategoryState(): ColumnCategoryState;
    getAllColumnCategory(): IColumnCategory[];
    getColumnCategoryById(columnCategoryId: string): IColumnCategory;
    addColumnCategory(columnCategory: IColumnCategory): void;
    createColumnCategory(columnCategoryId: string, columns: string[]): void;
    editColumnCategory(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void;
    removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void;
    deleteColumnCategory(columnCategoryId: string): void;
}
