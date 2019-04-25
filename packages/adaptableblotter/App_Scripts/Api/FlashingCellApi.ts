import { ApiBase } from "./ApiBase";
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import { IFlashingCell } from '../Utilities/Interface/BlotterObjects/IFlashingCell';
import { FlashingCellState } from "../Redux/ActionsReducers/Interface/IState";

export class FlashingCellApi extends ApiBase implements IFlashingCellApi {

 
  public GetState(): FlashingCellState {
    return this.getBlotterState().FlashingCell;
}

public GetAll(): IFlashingCell[] {
    return this.getBlotterState().FlashingCell.FlashingCells;
  }


}