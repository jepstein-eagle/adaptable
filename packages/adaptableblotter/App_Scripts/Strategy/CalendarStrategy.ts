import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Core/Enums';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    protected CalendarState: CalendarState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
         }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyIds.CalendarGlyph);
    }
   
    protected InitState() {
        if (this.CalendarState != this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar) {
            this.CalendarState = this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar;
          
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Calendar, this.CalendarState)
            }
       
        }
    }
}