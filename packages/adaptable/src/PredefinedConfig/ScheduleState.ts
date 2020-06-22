import { ConfigState } from './ConfigState';
import { ReminderSchedule } from './ReminderState';
import { Glue42Schedule } from './Glue42State';
import { IPushPullSchedule } from './IPushPullState';
import { OpenFinSchedule } from './OpenFinState';
import { ReportSchedule } from '../types';

/**
 * Schedules run by AdapTable
 *
 * The following functions contain Schedules:
 *
 * * Export
 * * Reminder
 * * ipushpull - if using the ipushpull plugin
 * * Glue42 - if using the Glue42 plugin
 * * OpenFin - if using the OpenFin plugin
 *
 */
export interface ScheduleState extends ConfigState {
  ReportSchedules?: ReportSchedule[];
  Reminders?: ReminderSchedule[];
  IPushPullSchedules?: IPushPullSchedule[];
  Glue42Schedules?: Glue42Schedule[];
  OpenFinSchedules?: OpenFinSchedule[];
}
