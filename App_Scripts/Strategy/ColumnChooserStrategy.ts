import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IMenu';;
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from '../Strategy/Interface/IColumnChooserStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { StrategySummaryRow } from '../View/Components/StrategySummaryRow';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup,  StrategyGlyphs.ColumnChooserGlyph);
    }
    
    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(new MenuReduxActionItem(
                "Hide Column",
                this.Id,
                GridRedux.HideColumn(columnId),
                StrategyGlyphs.ColumnChooserGlyph)))
    }

}