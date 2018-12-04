import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
import { ICalculatedColumn } from '../Api/Interface/IAdaptableBlotterObjects';
import { StateChangedTrigger } from '../Utilities/Enums';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Api/Interface/IColumn';

export class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    private CalculatedColumnState: CalculatedColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CalculatedColumnStrategyId, blotter)
    }

    protected InitState() {
        if (this.CalculatedColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn) {
            this.CalculatedColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.CalculatedColumn, this.CalculatedColumnState)
            }
        }
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyConstants.CalculatedColumnGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            if (this.CalculatedColumnState.CalculatedColumns.find(cc => cc.ColumnId == column.ColumnId)) {
                this.createContextMenuItemShowPopup(
                    "Edit " + StrategyConstants.CalculatedColumnStrategyName,
                    ScreenPopups.CalculatedColumnPopup,
                    StrategyConstants.CalculatedColumnGlyph,
                    "Edit|" + column.ColumnId)
            }
        }
    }
}