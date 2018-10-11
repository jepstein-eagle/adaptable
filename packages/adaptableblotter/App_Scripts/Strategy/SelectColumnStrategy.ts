import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";

export class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SelectColumnStrategyId, blotter)
    }

    public addContextMenuItem(columnId: string): void {
        if (this.blotter.isSelectable()) {
            if (this.canCreateContextMenuItem(columnId, this.blotter)) {
       
                this.createContextMenuItemReduxAction(
                    StrategyIds.SelectColumnStrategyName,
                    StrategyIds.SelectColumnGlyph,
                    GridRedux.GridSelectColumn(columnId)
                )
            }
        }
    }
}