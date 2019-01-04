import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy'
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy'
import { IFlashingCell } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';

export class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected FlashCell(dataChangedEvent: IDataChangedInfo, flashingCell: IFlashingCell, index: number): void {
        let theBlotter = this.blotter as AdaptableBlotter
        if (dataChangedEvent.OldValue == null) { return; }
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? flashingCell.DownColor : flashingCell.UpColor
        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, dataChangedEvent.ColumnId, { flashBackColor: cellStyle }, flashingCell.FlashingCellDuration)
    }
}