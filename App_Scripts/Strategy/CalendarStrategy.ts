import { ICalendarStrategy, ICalendar, ICalendarEntry } from '../Core/Interface/ICalendarStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CalendarStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Calendars", 'CalendarsConfig', "calendar");
    }
   
}