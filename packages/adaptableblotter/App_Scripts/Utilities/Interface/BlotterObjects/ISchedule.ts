import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { ScheduleType, ExportDestination } from '../../Enums';
import { IAdaptableAlert } from '../IMessage';

export interface ISchedule extends IAdaptableBlotterObject {
  ScheduleItem: IScheduleItem;
  ScheduleTime: IScheduleTime;
  ScheduleType: ScheduleType;
}

export interface IScheduleTime {
  // needs work... has to be either a one off date or a recurrence rule
  OneOffDate?: Date,
  RecurringDate?: IScheduleRule,

}

export interface IScheduleRule {
  // not quite right but...
  DayOfWeek: number // weekday? monday?
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



