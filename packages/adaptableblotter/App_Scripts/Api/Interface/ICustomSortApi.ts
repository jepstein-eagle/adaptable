import { CustomSortState, CustomSort } from '../../PredefinedConfig/RunTimeState/CustomSortState';

export interface ICustomSortApi {
  getCustomSortState(): CustomSortState;
  getAllCustomSort(): CustomSort[];
  getCustomSortByColumn(column: string): CustomSort;
  addCustomSort(customSort: CustomSort): void;
  createCustomSort(column: string, values: string[]): void;
  editCustomSort(column: string, values: string[]): void;
  deleteCustomSort(column: string): void;

  /**
   * Opens the Custom Sort popup screen
   */
  showCustomSortPopup(): void;
}
