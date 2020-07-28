import { CustomSortState, CustomSort } from '../PredefinedConfig/CustomSortState';

/**
 *  Provides full and comprehensive run-time access to the Custom Sort function
 *
 * Use Custom Sort when you want to sort a column in non default ways (i.e. not alphabetically or not in natural ascending / descending order).
 *
 * Custom Sorts will be applied both when you sort the Column in table view and in pivot view.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Custom Sort Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/custom-sort-function.md)
 *
 * [Custom Sort Demo](https://demo.adaptabletools.com/gridmanagement/aggridcustomsortdemo/)
 *
 * {@link CustomSortState|Custom Sort State}
 *
 * --------------
 */
export interface CustomSortApi {
  /**
   * Retrieves the Custom Sort section from Adaptable State
   */
  getCustomSortState(): CustomSortState;

  /**
   * Retrieves all the Custom Sorts in the Adaptable State
   */
  getAllCustomSort(): CustomSort[];

  /**
   * Retrieves the Custom Sort in Adaptable State for a given Column
   *
   * @param column the Column to retrieve the Custom Sort for
   */
  getCustomSortByColumn(column: string): CustomSort;

  /**
   * Adds the inputted Custom Sort to the Custom Sort collection in Adaptable State
   *
   * @param customSort Custom Sort to add
   */
  addCustomSort(customSort: CustomSort): void;

  /**
   * Creates a new Custom Sort using the given values for the inputted Column
   *
   * @param column the Column to apply the Custom Sort to
   * @param values the Custom Sort values to apply
   */
  createCustomSort(column: string, values: string[]): void;

  /**
   * Updates an Existing Custom Sort with a new set of Sorted Values
   *
   * @param column the Column to edit the Custom Sort on
   * @param values the Custom Sort values to use (replaces what was previously used)
   */
  editCustomSort(column: string, values: string[]): void;

  /**
   * Removes the Custom Sort for the inputted Column
   *
   * @param column the column on which to delete the Custom Sort
   */
  deleteCustomSort(column: string): void;

  /**
   * Opens the Custom Sort popup screen
   */
  showCustomSortPopup(): void;
}
