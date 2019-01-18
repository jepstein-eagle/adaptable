import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
;
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string
    protected LayoutState: LayoutState
   

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.LayoutStrategyId, blotter)
       }
 
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyConstants.LayoutGlyph);
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