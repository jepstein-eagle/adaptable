import { ApiBase } from "./ApiBase";
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import { IFlashingCell } from '../Utilities/Interface/BlotterObjects/IFlashingCell';
import { FlashingCellState } from "../Redux/ActionsReducers/Interface/IState";
export declare class FlashingCellApi extends ApiBase implements IFlashingCellApi {
    getFlashingCellState(): FlashingCellState;
    getAllFlashingCell(): IFlashingCell[];
}
