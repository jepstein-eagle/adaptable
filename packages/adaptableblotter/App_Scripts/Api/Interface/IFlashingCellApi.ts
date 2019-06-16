import {
  FlashingCellState,
  IFlashingCell,
} from '../../PredefinedConfig/IUserState Interfaces/FlashingCellState';

export interface IFlashingCellApi {
  getFlashingCellState(): FlashingCellState;
  getAllFlashingCell(): IFlashingCell[];
}
