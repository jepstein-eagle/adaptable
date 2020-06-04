import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';
import { Schedule, BaseSchedule } from './Common/Schedule';
import { ReminderSchedule } from './ReminderState';
import { IPushPullSchedule } from './IPushPullSchedule';
import { Glue42Schedule } from './Glue42State';

/**
 *
 */
export interface ScheduleState extends ConfigState {
  ReportSchedules?: ReportSchedule[];
  Reminders?: ReminderSchedule[];
  IPushPullSchedules?: IPushPullSchedule[];
  Glue42Schedules?: Glue42Schedule[];
}

/**
 * Defines a Scheduled Report.  Includes 2 properties:
 *
 * - Schedule: **When** the Report will run
 *
 * - ExportDestination: **Where** the Report data will be exported.
 */
export interface ReportSchedule extends BaseSchedule {
  ReportName: string;
  ExportDestination: 'Excel' | 'CSV' | 'Clipboard' | 'JSON';
}
