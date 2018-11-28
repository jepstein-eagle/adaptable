import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Core/Interface/IColumn';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
import { IFlashingCell } from '../Api/Interface/IAdaptableBlotterObjects';
export declare abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    protected InitState(): void;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent): void;
    protected abstract FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
}
