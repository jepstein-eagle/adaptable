import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { CalendarState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    protected CalendarState: CalendarState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
}
