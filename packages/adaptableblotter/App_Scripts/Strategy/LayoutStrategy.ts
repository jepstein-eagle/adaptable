import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
;
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
       }
 
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyIds.LayoutGlyph);
    }

}