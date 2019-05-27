import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.QuickSearchStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.QuickSearchStrategyName,
      ScreenPopups.QuickSearchPopup,
      StrategyConstants.QuickSearchGlyph
    );
  }
}
