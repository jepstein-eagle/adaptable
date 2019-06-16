import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ISchedule } from '../Common/ISchedule';

export interface ReminderState extends IUserState {
  Reminders?: Reminder[];
}

export interface Reminder extends IAdaptableBlotterObject {
  Alert: IAdaptableAlert;
  Schedule: ISchedule;
}
