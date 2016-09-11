


export interface ICalendarService {
    GetNextWorkingDay(days: number): Date;
    GetLastWorkingDay(days: number): Date;
    GetDynamicDate(dynamicDateName: string):Date;
}