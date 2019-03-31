import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { ScheduleType, ExportDestination } from '../../Enums';
import { IAdaptableAlert } from '../IMessage';
export interface ISchedule extends IAdaptableBlotterObject {
    ScheduleItem: IScheduleItem;
    ScheduleTime: IScheduleTime;
    ScheduleType: ScheduleType;
}
export interface IScheduleTime {
    OneOffDate?: Date;
    RecurringDate?: IScheduleRule;
}
export interface IScheduleRule {
    DayOfWeek: number;
    Hour: number;
    Minute: number;
}
export interface IScheduleItem {
}
export interface IReportScheduleItem extends IScheduleItem {
    Name: string;
    ExportDestination: ExportDestination;
}
export interface IAlertScheduleItem extends IScheduleItem {
    Alert: IAdaptableAlert;
}
