import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy'

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnChooserStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyConstants.ColumnChooserGlyph);
    }

}
