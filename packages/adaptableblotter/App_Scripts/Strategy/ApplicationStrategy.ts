import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ApplicationStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ApplicationStrategyFriendlyName,
      ComponentName: ScreenPopups.ApplicationPopup,
      Icon: StrategyConstants.ApplicationGlyph,
    });
  }
}
