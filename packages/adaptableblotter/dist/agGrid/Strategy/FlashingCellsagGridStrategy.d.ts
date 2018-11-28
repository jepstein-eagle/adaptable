import { FlashingCellsStrategy } from '../../App_Scripts/Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../App_Scripts/Strategy/Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../../App_Scripts/Core/Services/Interface/IAuditService';
import { IFlashingCell } from '../../App_Scripts/Api/Interface/IAdaptableBlotterObjects';
export declare class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    private currentFlashing;
    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent): void;
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
    protected InitState(): void;
}
