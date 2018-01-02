import { FlashingCellsStrategy } from './FlashingCellsStrategy'
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'

export class FlashingCellsHypergridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }


    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        let theBlotter = this.blotter as AdaptableBlotter
        if (dataChangedEvent.OldValue == null) { return; }
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? flashingColumn.DownBackColor : flashingColumn.UpBackColor
        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, dataChangedEvent.ColumnId, { flashBackColor: cellStyle }, flashingColumn.FlashingCellDuration)
    }
}