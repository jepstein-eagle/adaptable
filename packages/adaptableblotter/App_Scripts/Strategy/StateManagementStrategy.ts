import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';
import { IStateManagementStrategy } from './Interface/IStateManagementStrategy';

export class StateManagementStrategy extends AdaptableStrategyBase
  implements IStateManagementStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.StateManagementStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.StateManagementStrategyName,
      ComponentName: ScreenPopups.StateManagementPopup,
      Icon: StrategyConstants.StateManagementGlyph,
    });
  }
}
