import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy'
import { FreeTextColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Core/Enums';
import { IColumn } from '../Core/Interface/IColumn';

export  class FreeTextColumnStrategy extends AdaptableStrategyBase implements IFreeTextColumnStrategy {
    protected FreeTextColumnState: FreeTextColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FreeTextColumnStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FreeTextColumnStrategyName, ScreenPopups.FreeTextColumnPopup, StrategyConstants.FreeTextColumnGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            let FreeTextExists: boolean = ArrayExtensions.ContainsItem(this.FreeTextColumnState.FreeTextColumns.map(f => f.ColumnId), column.ColumnId)
            let label = FreeTextExists ? "Edit " : "Create "
            let popupParam = FreeTextExists ? "Edit|" : "New|"

            this.createContextMenuItemShowPopup(
                label + StrategyConstants.FreeTextColumnStrategyName,
                ScreenPopups.FreeTextColumnPopup,
                StrategyConstants.FreeTextColumnGlyph,
                popupParam + column.ColumnId)
        }
    }

    protected InitState() {
        if (this.FreeTextColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn) {
            this.FreeTextColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.FreeTextColumn, this.FreeTextColumnState)
            }
        }
    }

}