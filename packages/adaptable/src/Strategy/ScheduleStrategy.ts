import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IScheduleStrategy } from './Interface/IScheduleStrategy';

export class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ScheduleStrategyId,
      StrategyConstants.ScheduleStrategyFriendlyName,
      StrategyConstants.ScheduleGlyph,
      ScreenPopups.SchedulePopup,
      adaptable
    );
  }
}
