import { ApiBase } from './ApiBase';
import { ScheduleApi } from '../ScheduleApi';

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { Glue42Api } from '../Glue42Api';
import { IPushPullApi } from '../IPushPullApi';

export class ScheduleApiImpl extends ApiBase implements ScheduleApi {
  public getAllSchedule(): BaseSchedule[] {
    let allSchedules: BaseSchedule[] = [];
    allSchedules.push(...this.getAllReminderSchedule());
    allSchedules.push(...this.getAllReportSchedule());
    allSchedules.push(...this.getAllIPushPullSchedule());
    allSchedules.push(...this.getAllGlue42Schedule());
    return allSchedules;
  }
  public getAllReminderSchedule(): ReminderSchedule[] {
    return this.adaptable.api.reminderApi.getAllReminder();
  }
  public getAllReportSchedule(): ReportSchedule[] {
    return this.adaptable.api.exportApi.getReportSchedules();
  }
  public getAllIPushPullSchedule(): IPushPullSchedule[] {
    const ippApi: IPushPullApi = this.adaptable.api.pluginsApi.getPluginApi('ipushpull');
    return ippApi ? ippApi.getIPushPullSchedules() : [];
  }
  public getAllGlue42Schedule(): Glue42Schedule[] {
    const glue42Api: Glue42Api = this.adaptable.api.pluginsApi.getPluginApi('glue42');
    return glue42Api ? glue42Api.getGlue42Schedules() : [];
  }

  public showSchedulePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ScheduleStrategyId,
      ScreenPopups.SchedulePopup
    );
  }
}
