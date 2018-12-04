import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../../Utilities/Services/Interface/IAuditService';
import { IFlashingCell } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    private currentFlashing;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent): void;
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
    protected InitState(): void;
}
