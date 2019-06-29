import { ApiBase } from './ApiBase';
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import {
  FlashingCellState,
  FlashingCell,
} from '../PredefinedConfig/RunTimeState/FlashingCellState';

export class FlashingCellApi extends ApiBase implements IFlashingCellApi {
  public getFlashingCellState(): FlashingCellState {
    return this.getBlotterState().FlashingCell;
  }

  public getAllFlashingCell(): FlashingCell[] {
    return this.getFlashingCellState().FlashingCells;
  }
}
