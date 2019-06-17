import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { Schedule } from '../Common/Schedule';

export interface ReminderState extends RunTimeState {
  Reminders?: Reminder[];
}

export interface Reminder extends AdaptableBlotterObject {
  Alert: IAdaptableAlert;
  Schedule: Schedule;
}
