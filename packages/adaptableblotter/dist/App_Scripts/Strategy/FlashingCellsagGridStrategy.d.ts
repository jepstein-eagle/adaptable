import { FlashingCellsStrategy } from './FlashingCellsStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { IFlashingCell } from '../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    private currentFlashing;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent): void;
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
    protected InitState(): void;
}
