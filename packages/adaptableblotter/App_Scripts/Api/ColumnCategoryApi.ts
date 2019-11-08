import {
  ColumnCategoryState,
  ColumnCategory,
} from '../PredefinedConfig/RunTimeState/ColumnCategoryState';

export interface ColumnCategoryApi {
  getColumnCategoryState(): ColumnCategoryState;
  getAllColumnCategory(): ColumnCategory[];
  getColumnCategoryById(columnCategoryId: string): ColumnCategory;
  addColumnCategory(columnCategory: ColumnCategory): void;
  createColumnCategory(columnCategoryId: string, columns: string[]): void;
  editColumnCategory(columnCategory: ColumnCategory): void;
  deleteColumnCategory(columnCategoryId: string): void;
  addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void;
  removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void;

  /**
   * Opens the Column Category popup screen
   */
  showColumnCategoryPopup(): void;
}
