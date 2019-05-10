import { ApiBase } from './ApiBase';
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import { IFlashingCell } from '../Utilities/Interface/BlotterObjects/IFlashingCell';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';

export class FlashingCellApi extends ApiBase implements IFlashingCellApi {
  public getFlashingCellState(): FlashingCellState {
    return this.getBlotterState().FlashingCell;
  }

  public getAllFlashingCell(): IFlashingCell[] {
    return this.getFlashingCellState().FlashingCells;
  }
}
