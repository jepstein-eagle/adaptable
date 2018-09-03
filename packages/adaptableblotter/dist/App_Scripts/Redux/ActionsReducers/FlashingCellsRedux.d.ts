import { FlashingCellState } from './Interface/IState';
import * as Redux from 'redux';
import { IFlashingCell } from '../../Core/Api/Interface/AdaptableBlotterObjects';
export declare const FLASHING_CELL_SELECT = "FLASHING_CELL_SELECT";
export declare const FLASHING_CELL_CHANGE_DURATION = "FLASHING_CELL_CHANGE_DURATION";
export declare const FLASHING_CELL_SELECT_ALL = "FLASHING_CELL_SELECT_ALL";
export declare const FLASHING_CELL_CHANGE_UP_COLOR = "FLASHING_CELL_CHANGE_UP_COLOR";
export declare const FLASHING_CELL_CHANGE_DOWN_COLOR = "FLASHING_CELL_CHANGE_DOWN_COLOR";
export interface FlashingCellSelectAction extends Redux.Action {
    FlashingCell: IFlashingCell;
}
export interface FlashingCellSelectAllAction extends Redux.Action {
    NumericColumns: IFlashingCell[];
    shouldTurnOn: boolean;
}
export interface FlashingCellChangeDurationAction extends Redux.Action {
    FlashingCell: IFlashingCell;
    NewFlashDuration: number;
}
export interface FlashingCellChangeUpColorAction extends Redux.Action {
    FlashingCell: IFlashingCell;
    UpColor: string;
}
export interface FlashingCellChangeDownColorAction extends Redux.Action {
    FlashingCell: IFlashingCell;
    DownColor: string;
}
export declare const FlashingCellSelect: (FlashingCell: IFlashingCell) => FlashingCellSelectAction;
export declare const FlashingCellSelectAll: (shouldTurnOn: boolean, NumericColumns: IFlashingCell[]) => FlashingCellSelectAllAction;
export declare const FlashingCellChangeDuration: (FlashingCell: IFlashingCell, NewFlashDuration: number) => FlashingCellChangeDurationAction;
export declare const FlashingCellChangeUpColor: (FlashingCell: IFlashingCell, UpColor: string) => FlashingCellChangeUpColorAction;
export declare const FlashingCellChangeDownColor: (FlashingCell: IFlashingCell, DownColor: string) => FlashingCellChangeDownColorAction;
export declare const FlashingCellReducer: Redux.Reducer<FlashingCellState>;
