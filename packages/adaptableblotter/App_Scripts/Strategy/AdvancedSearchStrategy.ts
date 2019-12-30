import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class AdvancedSearchStrategy extends AdaptableStrategyBase
  implements IAdvancedSearchStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.AdvancedSearchStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.AdvancedSearchStrategyFriendlyName,
      ComponentName: ScreenPopups.AdvancedSearchPopup,
      Icon: StrategyConstants.AdvancedSearchGlyph,
    });
  }
}
