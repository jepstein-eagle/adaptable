import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { ISchedule } from './ISchedule';
import { IAdaptableAlert } from '../IMessage';

export interface IReminder extends IAdaptableBlotterObject {
  Alert: IAdaptableAlert;
  Schedule: ISchedule;
}
