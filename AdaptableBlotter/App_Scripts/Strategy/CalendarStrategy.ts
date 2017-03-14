import { ICalendarStrategy, ICalendar, ICalendarEntry } from '../Core/Interface/ICalendarStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../Core/Enums';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Calendars", this.Id, 'CalendarsConfig', MenuType.Configuration, "calendar");
    }

   
}