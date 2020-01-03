import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableHelper } from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IStateManagementStrategy } from './Interface/IStateManagementStrategy';

export class StateManagementStrategy extends AdaptableStrategyBase
  implements IStateManagementStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.StateManagementStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.StateManagementStrategyFriendlyName,
      ComponentName: ScreenPopups.StateManagementPopup,
      Icon: StrategyConstants.StateManagementGlyph,
    });
  }
}
