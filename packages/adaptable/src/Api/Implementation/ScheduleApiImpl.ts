import { ApiBase } from './ApiBase';
import { ScheduleApi } from '../ScheduleApi';

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';

export class ScheduleApiImpl extends ApiBase implements ScheduleApi {
  public getAllSchedule(): BaseSchedule[] {
    let allSchedules: BaseSchedule[] = [];
    allSchedules.push(...this.getAllReminderSchedule());
    allSchedules.push(...this.getAllReportSchedule());
    allSchedules.push(...this.getAllIPushPullSchedule());
    return allSchedules;
  }
  public getAllReminderSchedule(): ReminderSchedule[] {
    return this.adaptable.api.reminderApi.getAllReminder();
  }
  public getAllReportSchedule(): ReportSchedule[] {
    return this.adaptable.api.exportApi.getReportSchedules();
  }
  public getAllIPushPullSchedule(): IPushPullSchedule[] {
    return this.adaptable.api.iPushPullApi.getIPushPullSchedules();
  }

  public showSchedulePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ScheduleStrategyId,
      ScreenPopups.SchedulePopup
    );
  }
}
