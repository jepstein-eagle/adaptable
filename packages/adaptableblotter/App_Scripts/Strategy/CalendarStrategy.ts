import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    protected CalendarState: CalendarState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CalendarStrategyId, blotter)
         }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyConstants.CalendarGlyph);
    }
   
    protected InitState() {
        if (this.CalendarState != this.blotter.api.calendarApi.getCalendarState()) {
            this.CalendarState = this.blotter.api.calendarApi.getCalendarState();
          
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Calendar, this.CalendarState)
            }
       
        }
    }
}