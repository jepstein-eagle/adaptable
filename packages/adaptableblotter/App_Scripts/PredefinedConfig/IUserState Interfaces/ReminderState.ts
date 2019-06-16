import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ISchedule } from '../Common Objects/ISchedule';

export interface ReminderState extends IUserState {
  Reminders?: IReminder[];
}

export interface IReminder extends IAdaptableBlotterObject {
  Alert: IAdaptableAlert;
  Schedule: ISchedule;
}
