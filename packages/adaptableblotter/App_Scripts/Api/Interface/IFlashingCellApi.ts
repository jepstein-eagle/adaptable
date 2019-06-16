import {
  FlashingCellState,
  FlashingCell,
} from '../../PredefinedConfig/RunTimeState/FlashingCellState';

export interface IFlashingCellApi {
  getFlashingCellState(): FlashingCellState;
  getAllFlashingCell(): FlashingCell[];
}
