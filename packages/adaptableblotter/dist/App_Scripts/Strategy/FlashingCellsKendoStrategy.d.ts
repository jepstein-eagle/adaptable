import { FlashingCellsStrategy } from './FlashingCellsStrategy';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../Vendors/Kendo/AdaptableBlotter';
import { IFlashingCell } from '../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class FlashingCellsKendoStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
}
