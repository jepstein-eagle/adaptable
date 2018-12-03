import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter'
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy'
import { PercentBarState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../api/Interface/IColumn';

export  class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
    protected PercentBarState: PercentBarState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.PercentBarStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.PercentBarStrategyName, ScreenPopups.PercentBarPopup, StrategyConstants.PercentBarGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter, "numeric")) {
            let percentBarExists: boolean = ArrayExtensions.ContainsItem(this.PercentBarState.PercentBars.map(f => f.ColumnId), column.ColumnId)
            let label = percentBarExists ? "Edit " : "Create "
            let popupParam = percentBarExists ? "Edit|" : "New|"

            this.createContextMenuItemShowPopup(
                label + StrategyConstants.PercentBarStrategyName,
                ScreenPopups.PercentBarPopup,
                StrategyConstants.PercentBarGlyph,
                popupParam + column.ColumnId)
        }
    }

    protected InitState() {
        if (this.PercentBarState != this.blotter.AdaptableBlotterStore.TheStore.getState().PercentBar) {
            this.PercentBarState = this.blotter.AdaptableBlotterStore.TheStore.getState().PercentBar;

             if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.PercentBar, this.PercentBarState)
            }
        }
    }

}