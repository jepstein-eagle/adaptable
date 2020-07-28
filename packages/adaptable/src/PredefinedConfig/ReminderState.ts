import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { BaseSchedule } from './Common/Schedule';

/**
 * Defines a Reminder Schedule.  Used in the Schedule Function (where the State will be stored).
 *
 * Includes just 1 property: an object of type `AdaptableAlert` which will be triggered when the Schedule runs.
 */
export interface ReminderSchedule extends BaseSchedule {
  Alert: AdaptableAlert;
}
