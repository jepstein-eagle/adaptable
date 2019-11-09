import { BulkUpdateState } from '../PredefinedConfig/BulkUpdateState';

/**
 * Provides full and comprehensive run-time access to the Bulk Update function and associated state.
 */
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
