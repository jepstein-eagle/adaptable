import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.CalendarStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalendarStrategyFriendlyName,
      ComponentName: ScreenPopups.CalendarsPopup,
      Icon: StrategyConstants.CalendarGlyph,
    });
  }
}
