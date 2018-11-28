import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ICalendarService } from './Interface/ICalendarService';
export declare class CalendarService implements ICalendarService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    GetDynamicDate(dynamicDateName: string): Date;
    GetNextWorkingDay(days?: number): Date;
    GetPreviousWorkingDay(days?: number): Date;
    private isNotWorkingDay;
}
