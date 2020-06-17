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
import { OpenFinSchedule } from '../../PredefinedConfig/OpenFinState';
import { OpenFinApi } from '../OpenFinApi';

export class ScheduleApiImpl extends ApiBase implements ScheduleApi {
  public getAllSchedule(): BaseSchedule[] {
    let allSchedules: BaseSchedule[] = [];
    allSchedules.push(...this.getAllReminderSchedule());
    allSchedules.push(...this.getAllReportSchedule());
    allSchedules.push(...this.getAllIPushPullSchedule());
    allSchedules.push(...this.getAllGlue42Schedule());
    allSchedules.push(...this.getAllOpenFinSchedule());
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

  public getAllOpenFinSchedule(): OpenFinSchedule[] {
    const openFinApi: OpenFinApi = this.adaptable.api.pluginsApi.getPluginApi('openfin');
    return openFinApi ? openFinApi.getOpenFinSchedules() : [];
  }

  public showSchedulePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ScheduleStrategyId,
      ScreenPopups.SchedulePopup
    );
  }
}
