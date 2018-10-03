import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
import { ICalculatedColumn } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { StateChangedTrigger } from '../Core/Enums';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';

export class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    private CalculatedColumnState: CalculatedColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalculatedColumnStrategyId, blotter)
    }

    protected InitState() {
        if (this.CalculatedColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.CalculatedColumn, this.CalculatedColumnState)
            }
        }
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyIds.CalculatedColumnGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            if (this.CalculatedColumnState.CalculatedColumns.find(cc => cc.ColumnId == columnId)) {
                this.createContextMenuItemShowPopup(
                    "Edit " + StrategyIds.CalculatedColumnStrategyName,
                    ScreenPopups.CalculatedColumnPopup,
                    StrategyIds.CalculatedColumnGlyph,
                    "Edit|" + columnId)
            }
        }
    }
}