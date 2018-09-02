import { MenuItemDoReduxAction } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { IColumn } from '../Core/Interface/IColumn';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyGlyphs.ColumnChooserGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId)) {
            this.createContextMenuItemReduxAction(
                "Hide Column",
                StrategyGlyphs.ColumnChooserGlyph,
                GridRedux.GridHideColumn(columnId))
        }
    }
}
