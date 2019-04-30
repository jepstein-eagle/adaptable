import { IFlashingCell } from "../../Utilities/Interface/BlotterObjects/IFlashingCell";
import { FlashingCellState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IFlashingCellApi {
  getFlashingCellState(): FlashingCellState;
  getAllFlashingCell(): IFlashingCell[]
 
}

