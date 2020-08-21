import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class AdvancedSearchStrategy extends AdaptableStrategyBase
  implements IAdvancedSearchStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.AdvancedSearchStrategyId,
      StrategyConstants.AdvancedSearchStrategyFriendlyName,
      StrategyConstants.AdvancedSearchGlyph,
      ScreenPopups.AdvancedSearchPopup,
      adaptable
    );
  }
}
