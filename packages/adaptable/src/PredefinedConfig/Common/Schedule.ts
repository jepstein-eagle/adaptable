import { AdaptableObject } from './AdaptableObject';

import { DayOfWeek } from './Enums';

export interface Schedule extends AdaptableObject {
  // A schedule can be either a one off date or just a recurring day (essentially a recurrence rule)
  Hour: number;
  Minute: number;
  OneOffDate?: string;
  DaysOfWeek?: DayOfWeek[];
}

export interface BaseSchedule extends AdaptableObject {
  Schedule: Schedule;
  ScheduleType: 'Report' | 'iPushPull' | 'Reminder';
}
