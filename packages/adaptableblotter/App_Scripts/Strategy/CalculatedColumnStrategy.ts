import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICalculatedColumnStrategy } from "./Interface/ICalculatedColumnStrategy";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { StateChangedTrigger } from '../Utilities/Enums';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';

export class CalculatedColumnStrategy extends AdaptableStrategyBase implements ICalculatedColumnStrategy {
    private CalculatedColumnState: CalculatedColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CalculatedColumnStrategyId, blotter)
    }

    protected InitState() {
        if (this.CalculatedColumnState != this.blotter.api.calculatedColumnApi.GetState()) {
            this.CalculatedColumnState = this.blotter.api.calculatedColumnApi.GetState();
       
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