import {
  FlashingCellState,
  FlashingCell,
} from '../../PredefinedConfig/IUserState/FlashingCellState';

export interface IFlashingCellApi {
  getFlashingCellState(): FlashingCellState;
  getAllFlashingCell(): FlashingCell[];
}
