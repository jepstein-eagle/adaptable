import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy'
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Core/Enums';
import { IColumn } from '../Core/Interface/IColumn';

export abstract class FormatColumnStrategy extends AdaptableStrategyBase implements IFormatColumnStrategy {
    protected FormatColumnState: FormatColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FormatColumnStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyConstants.FormatColumnGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            let formatExists: boolean = ArrayExtensions.ContainsItem(this.FormatColumnState.FormatColumns.map(f => f.ColumnId), column.ColumnId)
            let label = formatExists ? "Edit " : "Create "
            let popupParam = formatExists ? "Edit|" : "New|"

            this.createContextMenuItemShowPopup(
                label + StrategyConstants.FormatColumnStrategyName,
                ScreenPopups.FormatColumnPopup,
                StrategyConstants.FormatColumnGlyph,
                popupParam + column)
        }
    }

    protected InitState() {
        if (this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;

            this.InitStyles();

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.FormatColumn, this.FormatColumnState)
            }
        }
    }

    protected abstract InitStyles(): void;
}