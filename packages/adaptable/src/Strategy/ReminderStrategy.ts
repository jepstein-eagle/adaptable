import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ReminderStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ReminderStrategyFriendlyName,
      ComponentName: ScreenPopups.ReminderPopup,
      Icon: StrategyConstants.ReminderGlyph,
    });
  }
}
