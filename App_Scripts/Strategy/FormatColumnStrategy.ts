import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyConstants from '../Core/StrategyConstants'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFormatColumnStrategy } from '../Core/Interface/IFormatColumnStrategy'
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'


export abstract class FormatColumnStrategy extends AdaptableStrategyBase implements IFormatColumnStrategy {
    protected FormatColumnState: FormatColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FormatColumnStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyConstants.FormatColumnStrategyFriendlyName, ScreenPopups.FormatColumnConfigPopup, StrategyConstants.FormatColumnGlyph);
    }
    
    protected addColumnMenuItems(columnId: string): void {
      let formatExists: boolean = this.FormatColumnState.FormatColumns.findIndex(x => x.ColumnId == columnId) > -1
        let label = formatExists? "Edit " : "Create "
        let popupParam = formatExists ? "Edit|" : "New|"
       
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                label + "Column Format",
                ScreenPopups.FormatColumnConfigPopup,
                 StrategyConstants.FormatColumnGlyph,
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