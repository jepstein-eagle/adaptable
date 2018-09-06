import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
         }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyIds.CalendarGlyph);
    }
   
}