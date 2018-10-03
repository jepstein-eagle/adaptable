import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
;
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Core/Enums';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string
    protected LayoutState: LayoutState
   

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
       }
 
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyIds.LayoutGlyph);
    }

    protected InitState() {
        if (this.LayoutState != this.blotter.AdaptableBlotterStore.TheStore.getState().Layout) {
            this.LayoutState = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Layout, this.LayoutState)
            }
        }
    }
}