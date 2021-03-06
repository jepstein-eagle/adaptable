import { BaseSchedule } from '../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../PredefinedConfig/ExportState';
import { Glue42Schedule } from '../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../PredefinedConfig/IPushPullState';
import { OpenFinSchedule } from '../PredefinedConfig/OpenFinState';

/**
 * Provides full and comprehensive run-time access to the Schedule function and associated state.
 *
 * AdapTable offers the ability to run particular actions at scheduled times and dates - either as a one-off or repeated activity.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - {@link ScheduleState|Schedule State}
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
 * * ipushpull (f using the ipushpull Plugin)
 * * Glue42 (f using the Glue42 Plugin)
 * * OpenFin (f using the OpenFin Plugin)
 *
 */
export interface ScheduleApi {
  /**
   * Retrieves the Schedule section from Adaptable State
   */
  getAllSchedule(): BaseSchedule[];

  /**
   * Retrieves all Reminder-based Schedules from the Schedule section from Adaptable State
   */
  getAllReminderSchedule(): ReminderSchedule[];

  /**
   * Retrieves all Report-based Schedules (i.e. used in Export function) from the Schedule section from Adaptable State
   */
  getAllReportSchedule(): ReportSchedule[];

  /**
   * Retrieves all ipushpull-based Schedules from the Schedule section from Adaptable State
   */
  getAllIPushPullSchedule(): IPushPullSchedule[];

  /**
   * Retrieves all Glue42-based Schedules from the Schedule section from Adaptable State
   */
  getAllGlue42Schedule(): Glue42Schedule[];

  /**
   * Retrieves all OpenFin-based Schedules from the Schedule section from Adaptable State
   */
  getAllOpenFinSchedule(): OpenFinSchedule[];

  /**
   * Opens the Schedule popup screen
   */
  showSchedulePopup(): void;
}
