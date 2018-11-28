import { FlashingCellsStrategy } from '../../App_Scripts/Strategy/FlashingCellsStrategy'
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IFlashingCellsStrategy } from '../../App_Scripts/Strategy/Interface/IFlashingCellsStrategy'
import { IFlashingCell } from '../../App_Scripts/Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedEvent } from '../../App_Scripts/Utilities/Services/Interface/IAuditService';

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