import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
