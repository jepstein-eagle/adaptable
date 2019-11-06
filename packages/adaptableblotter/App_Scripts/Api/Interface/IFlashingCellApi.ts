import {
  FlashingCellState,
  FlashingCell,
} from '../../PredefinedConfig/RunTimeState/FlashingCellState';

/**
 * Provides full and comprehensive run-time access to the Flashing Cell function and associated state.
 */
export interface IFlashingCellApi {
  /**
   * Retrieves the Flashing Cell section from the Adaptable Blotter State
   */
  getFlashingCellState(): FlashingCellState;

  /**
   * Gets all Flashing Cell objects in the State
   */
  getAllFlashingCell(): FlashingCell[];

  /**
   * Opens the Flashing Cell popup screen
   */
  showFlashingCellPopup(): void;
}
