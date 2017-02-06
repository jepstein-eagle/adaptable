import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn, IFlashingCellDuration } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuType, ColumnType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'

/* First basic draft of FlashingCells Strategy. 
    A few assumptions at play here
    1.  We will only flash numeric columns (for now)
    2.  The user cannot choose the flash colours; for now its just green and red, which are then hardcoded as styles in index.html.  
    All the user can choose is which numeric columns will flash and the duration 
 */
export class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    private menuItemConfig: IMenuItem;
    private FlashingCellState: FlashingCellState
    protected FLASH_UP_STYLE: string = "Ab-FlashUp"
    protected FLASH_DOWN_STYLE: string = "Ab-FlashDown"

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FlashingCellsStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Flashing Cell", this.Id, 'FlashingCellsConfig', MenuType.Configuration, "flash");
        this.InitState()
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        // TODO: test extension works
    }

    private InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
        }
    }

    private handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        let flashingColumn: IFlashingColumn = this.FlashingCellState.FlashingColumns.find(f => f.ColumnName == DataChangedEvent.ColumnId);
        let flashingColumnIndex = this.FlashingCellState.FlashingColumns.indexOf(flashingColumn)
        if (flashingColumn != null && flashingColumn.IsLive) {
            this.FlashCell(DataChangedEvent, flashingColumn, flashingColumnIndex);
        }
    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        if (dataChangedEvent.OldValue == null) return;
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? this.FLASH_DOWN_STYLE : this.FLASH_UP_STYLE
        let columnIndex = this.blotter.getColumnIndex(dataChangedEvent.ColumnId);
        //Jo : we know that this function is wrong as it's not cumulative
        this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, cellStyle + index, flashingColumn.FlashingCellDuration.Duration)
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    public GetFlashingCellDurations(): IFlashingCellDuration[] {
        return [
            { Name: "1/4 Second", Duration: 250 },
            { Name: "1/2 Second", Duration: 500 },
            { Name: "3/4 Second", Duration: 250 },
            { Name: "1 Second", Duration: 1000 },
        ]
    }

    public CreateDefaultFlashingColumn(column: IColumn): IFlashingColumn {
        return { IsLive: false, ColumnName: column.ColumnId, FlashingCellDuration: this.GetFlashingCellDurations().find(f => f.Name == "1/2 Second"), UpBackColor: '#008000', DownBackColor: '#FF0000' };
    }
}