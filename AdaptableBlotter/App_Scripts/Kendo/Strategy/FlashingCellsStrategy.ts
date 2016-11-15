import { MenuItemShowPopup } from '../../Core/MenuItem'
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../../View/AdaptableViewFactory'
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumnCellStyleMapping } from '../../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../../Redux/ActionsReducers/Interface/IState';
import { FlashingCellDuration } from '../../Core/Enums'
import { MenuType } from '../../Core/Enums';

/* First basic draft of FlashingCells Strategy. 
    A few assumptions at play here
    1.  We will only flash numeric columns (for now)
    2.  The user cannot choose the flash colours or duraations; for now its just green and red, which are then hardcoded as styles in index.html.  All the user can choose is which numeric columns will flash    
 */

const FLASH_UP_STYLE: string = "FlashUp"
const FLASH_DOWN_STYLE: string = "FlashDown"

export class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    private menuItemConfig: IMenuItem;
    private FlashingCellState: FlashingCellState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FlashingCellsStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Flashing Cells", this.Id, 'FlashingCellsConfig', MenuType.Configuration, "flash");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitFlashingCells())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    private InitFlashingCells() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
        }
    }

    private handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        // TODO:  Need to fix this : make sure that we only flash if its the right column...
        let flashingColumn: IFlashingColumn = this.FlashingCellState.FlashingColumns.find(f => f.ColumnName == DataChangedEvent.ColumnName);
        if (flashingColumn != null && flashingColumn.IsLive) {

            this.FlashCell(DataChangedEvent, flashingColumn);
        }
    }

    public FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn): void {
        if (dataChangedEvent.OldValue == null) return;
        //  alert("going to flash column: " + DataChangedEvent.ColumnName + " on row PK: " + DataChangedEvent.IdentifierValue)
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? FLASH_DOWN_STYLE : FLASH_UP_STYLE
        let columnIndex = this.blotter.getColumnIndex(dataChangedEvent.ColumnName);
        let columnMapping: IColumnCellStyleMapping = { ColumnIndex: columnIndex, CellStyle: cellStyle, Expression: null }

        this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, columnMapping, this.getFlashDuration(flashingColumn.FlashingCellDuration))
    }

    private getFlashDuration(flashingCellDuration: FlashingCellDuration): number {
        switch (flashingCellDuration) {
            case FlashingCellDuration.OneQuarterSecond:
                return 250;
            case FlashingCellDuration.HalfSecond:
                return 500;
            case FlashingCellDuration.ThreeQuarterSecond:
                return 750;
            case FlashingCellDuration.Second:
                return 1000;
        }
    }


    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}