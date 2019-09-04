import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CalendarStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CalendarStrategyName,
      ComponentName: ScreenPopups.CalendarsPopup,
      GlyphIcon: StrategyConstants.CalendarGlyph,
    });
  }
}
