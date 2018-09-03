import { FlashingCellsStrategy } from './FlashingCellsStrategy';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { IFlashingCell } from '../Core/Api/Interface/AdaptableBlotterObjects';
export declare class FlashingCellsHypergridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter);
    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;
}
