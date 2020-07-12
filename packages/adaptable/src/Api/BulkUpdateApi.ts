import { BulkUpdateState } from '../PredefinedConfig/BulkUpdateState';

/**
 * Provides full and comprehensive run-time access to the Bulk Update function
 *
 * Bulk Update allows users - with a single action - to update a group of selected cells in the same column.   All the cells will contain the same value (either existing in the column already or now).
 *
 * Bulk Update works on any column type.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Bulk Update Demo](https://demo.adaptabletools.com/edit/aggridbulkupdatedemo/)
 *
 * {@link BulkUpdateState|Bulk Update State}
 *
 * [Bulk Update Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/bulk-update-function.md)
 *
 **/
export interface BulkUpdateApi {
  /**
   * Returns the whole contents of the Bulk Update State
   */
  getBulkUpdateState(): BulkUpdateState;

  /**
   * Returns the current Bulk Update value
   */
  getBulkUpdateValue(): string;

  /**
   * Opens the Bulk Update popup screen
   */
  showBulkUpdatePopup(): void;
}
