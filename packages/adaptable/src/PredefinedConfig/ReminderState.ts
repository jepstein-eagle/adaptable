import { ConfigState } from './ConfigState';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import { BaseSchedule } from './Common/Schedule';

export interface ReminderState extends ConfigState {}

export interface ReminderSchedule extends BaseSchedule {
  Alert: AdaptableAlert;
}
