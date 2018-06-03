import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectedCellsStrategy } from "../Strategy/Interface/ISelectedCellsStrategy";

export class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SelectedCellsStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.SelectedCellsStrategyName, ScreenPopups.SelectedCellsPopup, StrategyGlyphs.SelectedCellsGlyph);
    }

    protected addedCellsMenuItem(edCellsId: string): void {

        //    this.createContextMenuItemReduxAction(
        //        StrategyNames.SelectedCellsStrategyName,
        //        StrategyGlyphs.SelectedCellsGlyph,
        //        GridRedux.GridSelectedCells(edCellsId)
        //    )

    }
}