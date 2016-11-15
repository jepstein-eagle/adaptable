import {IAdaptableBlotter} from './Interface/IAdaptableBlotter';
import {IStrategy, IMenuItem} from './Interface/IStrategy';
import {ICalendarService} from '../Core/Services/Interface/ICalendarService'
import {CalendarService} from '../Core/Services/CalendarService'


export abstract class AdaptableStrategyBase implements IStrategy {
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    abstract getMenuItems(): IMenuItem[];
    public onAction(action: string) {

    }
}

