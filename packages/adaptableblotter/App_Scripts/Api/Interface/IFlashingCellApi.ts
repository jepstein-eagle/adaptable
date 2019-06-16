import {
  FlashingCellState,
  IFlashingCell,
} from '../../PredefinedConfig/IUserState/FlashingCellState';

export interface IFlashingCellApi {
  getFlashingCellState(): FlashingCellState;
  getAllFlashingCell(): IFlashingCell[];
}
