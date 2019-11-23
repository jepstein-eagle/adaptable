import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { Schedule } from './Common/Schedule';

export interface ReminderState extends RunTimeState {
  Reminders?: Reminder[];
}

export interface Reminder extends AdaptableBlotterObject {
  Alert: AdaptableAlert;
  Schedule: Schedule;
}

/*
	
A collection of IReminder objects (see below for more details).

Each Percent Bar object contains an Alert and a Schedule.
*/
