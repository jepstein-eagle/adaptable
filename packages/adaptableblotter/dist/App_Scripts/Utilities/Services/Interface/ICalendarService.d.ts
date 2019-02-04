export interface ICalendarService {
    GetNextWorkingDay(days?: number): Date;
    GetPreviousWorkingDay(days?: number): Date;
    GetDynamicDate(dynamicDateName: string): Date;
}
