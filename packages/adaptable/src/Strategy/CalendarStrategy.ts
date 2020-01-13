import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CalendarStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalendarStrategyFriendlyName,
      ComponentName: ScreenPopups.CalendarsPopup,
      Icon: StrategyConstants.CalendarGlyph,
    });
  }
}
