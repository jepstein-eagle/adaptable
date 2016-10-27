import {ICalendarStrategy, ICalendar, ICalendarEntry} from '../../Core/Interface/ICalendarStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    public  CurrentCalendar: string
    
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Calendars", this.Id, 'CalendarsConfig', "calendar");
        this.InitCurrentCalendar();
    }    

     InitCurrentCalendar() {
        if (this.CurrentCalendar != this.blotter.AdaptableBlotterStore.TheStore.getState().Calendars.CurrentCalendar) {
            this.CurrentCalendar = this.blotter.AdaptableBlotterStore.TheStore.getState().Calendars.CurrentCalendar;
        }
     }

  getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
   
}