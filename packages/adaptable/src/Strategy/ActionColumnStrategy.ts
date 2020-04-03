import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IActionColumnStrategy } from './Interface/IActionColumnStrategy';

export class ActionColumnStrategy extends AdaptableStrategyBase implements IActionColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ActionColumnStrategyId, adaptable);
  }
}
