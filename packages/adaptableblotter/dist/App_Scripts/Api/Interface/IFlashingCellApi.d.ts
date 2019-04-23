import { IFlashingCell } from "../../Utilities/Interface/BlotterObjects/IFlashingCell";
import { FlashingCellState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IFlashingCellApi {
    GetState(): FlashingCellState;
    GetAll(): IFlashingCell[];
}
