import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IFlashingCell } from '../Core/Api/Interface/IAdaptableBlotterObjects';
export declare abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    protected InitState(): void;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent): void;
    protected abstract FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
}
