import { BaseSchedule } from '../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../PredefinedConfig/IPushPullState';

export interface ScheduleApi {
  getAllSchedule(): BaseSchedule[];

  getAllReminderSchedule(): ReminderSchedule[];

  getAllReportSchedule(): ReportSchedule[];

  getAllIPushPullSchedule(): IPushPullSchedule[];

  /**
   * Opens the Schedule popup screen
   */
  showSchedulePopup(): void;
}
