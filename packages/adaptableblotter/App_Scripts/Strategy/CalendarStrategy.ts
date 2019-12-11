import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/AdaptableBlotterMenuItem';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalendarStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalendarStrategyName,
      ComponentName: ScreenPopups.CalendarsPopup,
      Icon: StrategyConstants.CalendarGlyph,
    });
  }
}
