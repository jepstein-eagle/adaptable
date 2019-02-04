import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';
import { IFlashingCell } from "../Utilities/Interface/BlotterObjects/IFlashingCell";
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo): void;
    protected abstract shouldHandleDataSourceChanged(): boolean;
    protected abstract FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void;
}
