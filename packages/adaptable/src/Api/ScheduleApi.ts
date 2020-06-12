import { BaseSchedule } from '../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../PredefinedConfig/ExportState';
import { Glue42Schedule } from '../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../PredefinedConfig/IPushPullState';

export interface ScheduleApi {
  getAllSchedule(): BaseSchedule[];

  getAllReminderSchedule(): ReminderSchedule[];

  getAllReportSchedule(): ReportSchedule[];

  getAllIPushPullSchedule(): IPushPullSchedule[];

  getAllGlue42Schedule(): Glue42Schedule[];

  /**
   * Opens the Schedule popup screen
   */
  showSchedulePopup(): void;
}
