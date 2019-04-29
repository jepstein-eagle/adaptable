import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy'
import { FreeTextColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

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
            if (this.FreeTextColumnState.FreeTextColumns.find(cc => cc.ColumnId == column.ColumnId)) {
                this.createContextMenuItemShowPopup(
                    "Edit " + StrategyConstants.FreeTextColumnStrategyName,
                    ScreenPopups.FreeTextColumnPopup,
                    StrategyConstants.FreeTextColumnGlyph,
                    "Edit|" + column.ColumnId)
            }
        }
    }

      protected InitState() {
        if (this.FreeTextColumnState != this.blotter.api.freeTextColumnApi.GetState()) {
            this.FreeTextColumnState = this.blotter.api.freeTextColumnApi.GetState();

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.FreeTextColumn, this.FreeTextColumnState)
            }
        }
    }

}