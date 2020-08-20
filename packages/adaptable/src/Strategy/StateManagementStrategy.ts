import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableHelper } from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IStateManagementStrategy } from './Interface/IStateManagementStrategy';
import { AccessLevel } from '../PredefinedConfig/EntitlementState';

export class StateManagementStrategy extends AdaptableStrategyBase
  implements IStateManagementStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.StateManagementStrategyId,
      StrategyConstants.StateManagementStrategyFriendlyName,
      StrategyConstants.StateManagementGlyph,
      ScreenPopups.StateManagementPopup,
      adaptable
    );
  }

  public getMinimumAccessLevelForMenu(): AccessLevel {
    return 'Full';
  }
}
