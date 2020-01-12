import { RunTimeState } from './RunTimeState';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { BaseSchedule } from './Common/Schedule';

export interface ReminderState extends RunTimeState {
  Reminders?: ReminderSchedule[];
}

export interface ReminderSchedule extends BaseSchedule {
  Alert: AdaptableAlert;
}
