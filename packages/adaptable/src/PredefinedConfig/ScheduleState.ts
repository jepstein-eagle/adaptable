import { ConfigState } from './ConfigState';
import { ReminderSchedule } from './ReminderState';
import { Glue42Schedule } from './Glue42State';
import { IPushPullSchedule } from './IPushPullState';
import { OpenFinSchedule } from './OpenFinState';
import { ReportSchedule } from '../types';

/**
 * The Predefined Configuration for the Schedule function
 *
 * AdapTable offers the ability to run particular actions at scheduled times and dates - either as a one-off or repeated activity.
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
  /**
   * Any Schedules connected to Reports (created in the Export function)
   */
  ReportSchedules?: ReportSchedule[];

  /**
   * Any Schedules connected to Reminders - Alerts that fire at set times
   */
  Reminders?: ReminderSchedule[];

  /**
   * Any Schedules connected to ipushpull Reports
   *
   * Only available if the ipushpull plugin has been loaded
   */
  IPushPullSchedules?: IPushPullSchedule[];

  /**
   * Any Schedules connected to Glue42 exports
   *
   * Only available if the Glue42 plugin has been loaded
   */

  Glue42Schedules?: Glue42Schedule[];

  /**
   * Any Schedules connected to OpenFin data exports
   *
   * Only available if the OpenFin plugin has been loaded
   */

  OpenFinSchedules?: OpenFinSchedule[];
}
