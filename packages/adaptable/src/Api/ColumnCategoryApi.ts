import { ColumnCategoryState, ColumnCategory } from '../PredefinedConfig/ColumnCategoryState';

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
  getColumnCategoryFromColumnCategories(
    columnId: string,
    ColumnCategoryns: ColumnCategory[]
  ): string;
  /**
   * Opens the Column Category popup screen
   */
  showColumnCategoryPopup(): void;
}
