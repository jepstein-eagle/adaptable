import {
  FlashingCellState,
  FlashingCell,
} from '../../PredefinedConfig/RunTimeState/FlashingCellState';

/**
 * Provides full and comprehensive run-time access to the Flashing Cell function and associated state.
 */
export interface IFlashingCellApi {
  /**
   * Retrieves the Flashing Cell State
   */
  getFlashingCellState(): FlashingCellState;

  /**
   * Gets all Flashing Cells in the State
   */
  getAllFlashingCell(): FlashingCell[];
}
