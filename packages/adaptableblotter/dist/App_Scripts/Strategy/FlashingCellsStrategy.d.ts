import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Api/Interface/IColumn';
import { IFlashingCell } from '../Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../Api/Interface/IDataChangedInfo';
export declare abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedInfo): void;
    protected abstract FlashCell(dataChangedEvent: IDataChangedInfo, flashingCell: IFlashingCell, index: number): void;
}
