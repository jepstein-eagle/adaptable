import { ILinkedColumnStrategy } from './Interface/ILinkedColumnStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
;
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { LinkedColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Core/Enums';

export class LinkedColumnStrategy extends AdaptableStrategyBase implements ILinkedColumnStrategy {
    public CurrentLinkedColumn: string
    protected LinkedColumnState: LinkedColumnState
   

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.LinkedColumnStrategyId, blotter)
       }
 
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.LinkedColumnStrategyName, ScreenPopups.LinkedColumnPopup, StrategyConstants.LinkedColumnGlyph);
    }

    protected InitState() {
        if (this.LinkedColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().LinkedColumn) {
            this.LinkedColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().LinkedColumn;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.LinkedColumn, this.LinkedColumnState)
            }
        }
    }
}