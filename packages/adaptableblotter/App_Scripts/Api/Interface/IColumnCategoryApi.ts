import {
  ColumnCategoryState,
  IColumnCategory,
} from '../../PredefinedConfig/IUserState/ColumnCategoryState';

export interface IColumnCategoryApi {
  getColumnCategoryState(): ColumnCategoryState;
  getAllColumnCategory(): IColumnCategory[];
  getColumnCategoryById(columnCategoryId: string): IColumnCategory;
  addColumnCategory(columnCategory: IColumnCategory): void;
  createColumnCategory(columnCategoryId: string, columns: string[]): void;
  editColumnCategory(columnCategory: IColumnCategory): void;
  deleteColumnCategory(columnCategoryId: string): void;
  addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void;
  removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void;
}
