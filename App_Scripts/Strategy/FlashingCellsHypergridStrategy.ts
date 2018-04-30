import { FlashingCellsStrategy } from './FlashingCellsStrategy'
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'
import { IFlashingCellsStrategy } from '../Strategy/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IFlashingCell } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class FlashingCellsHypergridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void {
        let theBlotter = this.blotter as AdaptableBlotter
        if (dataChangedEvent.OldValue == null) { return; }
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? flashingCell.DownColor : flashingCell.UpColor
        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, dataChangedEvent.ColumnId, { flashBackColor: cellStyle }, flashingCell.FlashingCellDuration)
    }
}