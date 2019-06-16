import { ApiBase } from './ApiBase';
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import { FlashingCellState, IFlashingCell } from '../PredefinedConfig/IUserState/FlashingCellState';

export class FlashingCellApi extends ApiBase implements IFlashingCellApi {
  public getFlashingCellState(): FlashingCellState {
    return this.getBlotterState().FlashingCell;
  }

  public getAllFlashingCell(): IFlashingCell[] {
    return this.getFlashingCellState().FlashingCells;
  }
}
