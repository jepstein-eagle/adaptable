import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy'
import { PercentBarState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

export class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
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
        if (this.PercentBarState != this.GetPercentBarState()) {

            if (this.blotter.isInitialised) {

                // if we have made any changes then first delete them all
                this.PercentBarState.PercentBars.forEach(pb => {
                    this.blotter.removePercentBar(pb);
                })

                this.GetPercentBarState().PercentBars.forEach(pb => {
                    this.blotter.editPercentBar(pb);
                })
                this.blotter.redraw();
            }
            this.PercentBarState = this.GetPercentBarState();
            this.publishStateChanged(StateChangedTrigger.PercentBar, this.PercentBarState)
        }
    }

    protected GetPercentBarState(): PercentBarState {
        return this.blotter.api.percentBarApi.GetState();
    }

}