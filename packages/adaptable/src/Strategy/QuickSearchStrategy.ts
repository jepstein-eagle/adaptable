import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.QuickSearchStrategyId,
      StrategyConstants.QuickSearchStrategyFriendlyName,
      StrategyConstants.QuickSearchGlyph,
      ScreenPopups.QuickSearchPopup,
      adaptable
    );
  }
}
