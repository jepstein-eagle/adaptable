import { ConfigState } from './ConfigState';
import { ReminderSchedule } from './ReminderState';
import { Glue42Schedule } from './Glue42State';
import { IPushPullSchedule } from './IPushPullState';
import { OpenFinSchedule } from './OpenFinState';
import { ReportSchedule } from '../types';

/**
 * The Predefined Configuration for the Schedule function
 *
 * AdapTable offers the ability to run particular actinos at scheduled times and dates - either as a one-off or repeated activity.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Schedule Demo](https://demo.adaptabletools.com/alertsmessages/aggridschedulesdemo)
 *
 * - [Schedule Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/schedule-function.md)
 *
 * --------------
 *
 * The following AdapTable Functions contain Schedules:
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
