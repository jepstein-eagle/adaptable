import { FlashingCellsStrategy } from '../../App_Scripts/Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../App_Scripts/Strategy/Interface/IFlashingCellsStrategy';
import { IFlashingCell } from '../../App_Scripts/Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedEvent } from '../../App_Scripts/Utilities/Services/Interface/IAuditService';
export declare class FlashingCellsHypergridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
}
