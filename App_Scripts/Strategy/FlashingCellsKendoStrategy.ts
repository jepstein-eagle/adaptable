import { FlashingCellsStrategy } from './FlashingCellsStrategy'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import { AdaptableBlotter } from '../Vendors/Kendo/AdaptableBlotter';

export class FlashingCellsKendoStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        let theBlotter = this.blotter as AdaptableBlotter
        if (dataChangedEvent.OldValue == null) { return; }
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? this.FLASH_DOWN_STYLE : this.FLASH_UP_STYLE
        let columnIndex = this.blotter.getColumnIndex(dataChangedEvent.ColumnId);
        //Jo : we know that this function is wrong as it's not cumulative
        theBlotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, cellStyle + index, flashingColumn.FlashingCellDuration)
    }
}