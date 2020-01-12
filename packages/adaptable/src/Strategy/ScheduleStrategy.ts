import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IScheduleStrategy } from './Interface/IScheduleStrategy';

export class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ScheduleStrategyId, adaptable);

    this.adaptable._on('GridReloaded', () => {});
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ScheduleStrategyFriendlyName,
      ComponentName: ScreenPopups.SchedulePopup,
      Icon: StrategyConstants.ScheduleGlyph,
    });
  }
}
