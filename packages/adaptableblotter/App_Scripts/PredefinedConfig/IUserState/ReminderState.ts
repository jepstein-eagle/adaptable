import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ISchedule } from '../Common/ISchedule';

export interface ReminderState extends IUserState {
  Reminders?: IReminder[];
}

export interface IReminder extends IAdaptableBlotterObject {
  Alert: IAdaptableAlert;
  Schedule: ISchedule;
}
