import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy'
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

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
                popupParam + column.ColumnId)
        }
    }

    protected InitState() {
        if (this.FormatColumnState != this.blotter.api.formatColumnApi.GetState()) {
            this.FormatColumnState = this.blotter.api.formatColumnApi.GetState();

            this.InitStyles();

            if (this.blotter.IsInitialised) {
                this.publishStateChanged(StateChangedTrigger.FormatColumn, this.FormatColumnState)
            }
        }
    }

    protected abstract InitStyles(): void;
}