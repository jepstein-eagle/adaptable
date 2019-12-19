import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';

export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ApplicationStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ApplicationStrategyName,
      ComponentName: ScreenPopups.ApplicationPopup,
      Icon: StrategyConstants.ApplicationGlyph,
    });
  }
}
