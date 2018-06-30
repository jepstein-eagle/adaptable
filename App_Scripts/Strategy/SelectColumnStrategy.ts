import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectColumnStrategy } from "../Strategy/Interface/ISelectColumnStrategy";

export class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SelectColumnStrategyId, blotter)
    }

    protected addColumnMenuItem(columnId: string): void {
        if (this.blotter.isSelectable()) {

            this.createContextMenuItemReduxAction(
                StrategyNames.SelectColumnStrategyName,
                StrategyGlyphs.SelectColumnGlyph,
                GridRedux.GridSelectColumn(columnId)
            )
        }
    }
}