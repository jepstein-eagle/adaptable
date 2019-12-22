import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalendarStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalendarStrategyName,
      ComponentName: ScreenPopups.CalendarsPopup,
      Icon: StrategyConstants.CalendarGlyph,
    });
  }
}
