import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFormatColumnStrategy } from '../Strategy/Interface/IFormatColumnStrategy'
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'


export abstract class FormatColumnStrategy extends AdaptableStrategyBase implements IFormatColumnStrategy {
    protected FormatColumnState: FormatColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FormatColumnStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyGlyphs.FormatColumnGlyph);
    }
    
    protected addColumnMenuItems(columnId: string): void {
      let formatExists: boolean = this.FormatColumnState.FormatColumns.findIndex(x => x.ColumnId == columnId) > -1
        let label = formatExists? "Edit " : "Create "
        let popupParam = formatExists ? "Edit|" : "New|"
       
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                label + StrategyNames.FormatColumnStrategyName,
                ScreenPopups.FormatColumnPopup,
                 StrategyGlyphs.FormatColumnGlyph,
                popupParam + columnId)))
    }

    protected InitState() {
        if (this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;

            this.InitStyles();
        }
    }

    protected abstract InitStyles(): void;
}