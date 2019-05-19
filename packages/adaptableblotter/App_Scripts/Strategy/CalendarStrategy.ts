import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalendarStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.CalendarStrategyName,
      ScreenPopups.CalendarsPopup,
      StrategyConstants.CalendarGlyph
    );
  }
}
