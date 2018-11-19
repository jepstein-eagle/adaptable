import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { ICellRendererStrategy } from './Interface/ICellRendererStrategy'
import { CellRendererState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Core/Enums';
import { IColumn } from '../Core/Interface/IColumn';

export  class CellRendererStrategy extends AdaptableStrategyBase implements ICellRendererStrategy {
    protected CellRendererState: CellRendererState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CellRendererStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CellRendererStrategyName, ScreenPopups.CellRendererPopup, StrategyConstants.CellRendererGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter, "numeric")) {
            let cellRendererExists: boolean = ArrayExtensions.ContainsItem(this.CellRendererState.PercentCellRenderers.map(f => f.ColumnId), column.ColumnId)
            let label = cellRendererExists ? "Edit " : "Create "
            let popupParam = cellRendererExists ? "Edit|" : "New|"

            this.createContextMenuItemShowPopup(
                label + StrategyConstants.CellRendererStrategyName,
                ScreenPopups.CellRendererPopup,
                StrategyConstants.CellRendererGlyph,
                popupParam + column.ColumnId)
        }
    }

    protected InitState() {
        if (this.CellRendererState != this.blotter.AdaptableBlotterStore.TheStore.getState().CellRenderer) {
            this.CellRendererState = this.blotter.AdaptableBlotterStore.TheStore.getState().CellRenderer;

             if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.CellRenderer, this.CellRendererState)
            }
        }
    }

}