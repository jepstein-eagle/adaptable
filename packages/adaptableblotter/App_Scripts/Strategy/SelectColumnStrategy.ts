import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";

export class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SelectColumnStrategyId, blotter)
    }

    public addContextMenuItem(columnId: string): void {
        if (this.blotter.isSelectable()) {
            if (this.canCreateContextMenuItem(columnId)) {

                this.createContextMenuItemReduxAction(
                    StrategyIds.SelectColumnStrategyName,
                    StrategyIds.SelectColumnGlyph,
                    GridRedux.GridSelectColumn(columnId)
                )
            }
        }
    }
}