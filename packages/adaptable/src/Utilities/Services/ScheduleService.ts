import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import * as ScheduleRedux from '../../Redux/ActionsReducers/ScheduleRedux';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { Schedule } from '../../PredefinedConfig/Common/Schedule';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import DateExtensions from '../Extensions/DateExtensions';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { LogAdaptableError } from '../Helpers/LoggingHelper';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { Glue42Api } from '../../Api/Glue42Api';
import { OpenFinApi } from '../../Api/OpenFinApi';
import { OpenFinSchedule } from '../../PredefinedConfig/OpenFinState';

interface ScheduleJob {
  cancel: () => any;
}

const dateTimeouts: { [key: number]: number } = {};

const NodeSchedule = {
  scheduleJob: (date: Date, fn: () => any): ScheduleJob => {
    const timestamp: number = +date;

    const now = Date.now();
    const timeUntilDate = timestamp - now;

    if (timeUntilDate > 0) {
      const timeoutId = +setTimeout(() => {
        fn();
      }, timeUntilDate);

      dateTimeouts[timestamp] = timeoutId;
    }

    return {
      cancel: () => {
        const theTimeout = dateTimeouts[timestamp];

        if (theTimeout != undefined) {
          clearTimeout(theTimeout);
        }
      },
    } as ScheduleJob;
  },
};

/**
 * This class is used for managing scheduling of Reports and Reminders
 * It listens to any changes in the Reminder or the Export state and tells the respective stragies to refresh
 * It also createsa daily job to run at midnight that will refresh Adaptable - this is so that date-based schedules can jump to the new day
 *
 * TODO - we need to implement a way to make sure that if the user doesn't reload the browser for 5 days and has a reminder for each of those days,
 * we need to make sure all of those occurences are triggered
 */
export class ScheduleService implements IScheduleService {
  private reminderJobs: ScheduleJob[];
  private exportJobs: ScheduleJob[];
  private iPushPullJobs: ScheduleJob[];
  private glue42Jobs: ScheduleJob[];
  private openFinJobs: ScheduleJob[];

  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
    this.reminderJobs = [];
    this.exportJobs = [];
    this.iPushPullJobs = [];
    this.glue42Jobs = [];
    this.openFinJobs = [];

    this.AddMidnightRefreshSchedule();

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      setTimeout(() => {
        this.updateReminderJobs();
        this.updateReportJobs();
        this.updateIPushPullJobs();
        this.updateGlue42Jobs();
        this.updateOpenFinJobs();
      }, 2000);
    });

    this.adaptable.adaptableStore.onAny((eventName: string) => {
      if (this.adaptable.isInitialised) {
        if (
          eventName == ScheduleRedux.REMINDER_SCHEDULE_ADD ||
          eventName == ScheduleRedux.REMINDER_SCHEDULE_EDIT ||
          eventName == ScheduleRedux.REMINDER_SCHEDULE_DELETE
        ) {
          this.updateReminderJobs();
        } else if (
          eventName == ScheduleRedux.REPORT_SCHEDULE_ADD ||
          eventName == ScheduleRedux.REPORT_SCHEDULE_EDIT ||
          eventName == ScheduleRedux.REPORT_SCHEDULE_DELETE
        ) {
          this.updateReportJobs();
        } else if (
          eventName == ScheduleRedux.IPUSHPULL_SCHEDULE_ADD ||
          eventName == ScheduleRedux.IPUSHPULL_SCHEDULE_EDIT ||
          eventName == ScheduleRedux.IPUSHPULL_SCHEDULE_DELETE
        ) {
          this.updateIPushPullJobs();
        } else if (
          eventName == ScheduleRedux.GLUE42_SCHEDULE_ADD ||
          eventName == ScheduleRedux.GLUE42_SCHEDULE_EDIT ||
          eventName == ScheduleRedux.GLUE42_SCHEDULE_DELETE
        ) {
          this.updateGlue42Jobs();
        } else if (
          eventName == ScheduleRedux.OPENFIN_SCHEDULE_ADD ||
          eventName == ScheduleRedux.OPENFIN_SCHEDULE_EDIT ||
          eventName == ScheduleRedux.OPENFIN_SCHEDULE_DELETE
        ) {
          this.updateOpenFinJobs();
        }
      }
    });
  }

  private updateReminderJobs() {
    this.clearAllReminderJobs();
    this.adaptable.api.scheduleApi
      .getAllReminderSchedule()
      .forEach((reminderSchedule: ReminderSchedule) => {
        this.AddReminderSchedule(reminderSchedule);
      });
  }

  private updateReportJobs() {
    this.clearAllExportJobs();
    this.adaptable.api.scheduleApi
      .getAllReportSchedule()
      .forEach((reportSchedule: ReportSchedule) => {
        this.AddReportSchedule(reportSchedule);
      });
  }

  public updateIPushPullJobs() {
    this.clearAllIPushPullJobs();
    this.adaptable.api.scheduleApi
      .getAllIPushPullSchedule()
      .forEach((iPushPullSchedule: IPushPullSchedule) => {
        this.AddIPushPullSchedule(iPushPullSchedule);
      });
  }

  private updateGlue42Jobs() {
    this.clearAllGlue42Jobs();
    this.adaptable.api.scheduleApi
      .getAllGlue42Schedule()
      .forEach((glue42Schedule: Glue42Schedule) => {
        this.AddGlue42Schedule(glue42Schedule);
      });
  }

  private updateOpenFinJobs() {
    this.clearAllOpenFinJobs();
    this.adaptable.api.scheduleApi
      .getAllOpenFinSchedule()
      .forEach((OpenFinSchedule: OpenFinSchedule) => {
        this.AddOpenFinSchedule(OpenFinSchedule);
      });
  }

  public AddReminderSchedule(reminderSchedule: ReminderSchedule): void {
    const date: Date = this.getDateFromSchedule(reminderSchedule.Schedule);
    if (date != null) {
      var alertJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        this.adaptable.api.alertApi.displayAlert(reminderSchedule.Alert);
      });
      this.reminderJobs.push(alertJob);
    }
  }

  public AddReportSchedule(reportSchedule: ReportSchedule): void {
    const date: Date = this.getDateFromSchedule(reportSchedule.Schedule);
    if (date != null) {
      var exportJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        this.adaptable.api.exportApi.sendReport(
          reportSchedule.ReportName,
          reportSchedule.ExportDestination as ExportDestination
        );
      });
      this.exportJobs.push(exportJob);
    }
  }

  public AddIPushPullSchedule(iPushPullSchedule: IPushPullSchedule): void {
    const date: Date = this.getDateFromSchedule(iPushPullSchedule.Schedule);
    if (date != null) {
      const ippApi = this.adaptable.api.pluginsApi.getPluginApi('ipushpull');
      var iPushPullJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        // we need to go through Redux as the flow is always Redux => Adaptable Store => api
        if (iPushPullSchedule.Transmission == 'Snapshot') {
          ippApi.sendSnapshot(iPushPullSchedule.IPushPullReport);
        } else if (iPushPullSchedule.Transmission == 'Live Data') {
          ippApi.startLiveData(iPushPullSchedule.IPushPullReport);
        }
        this.iPushPullJobs.push(iPushPullJob);
      });
    }
  }

  public AddGlue42Schedule(glue42Schedule: Glue42Schedule): void {
    const date: Date = this.getDateFromSchedule(glue42Schedule.Schedule);
    if (date != null) {
      const glue42Api: Glue42Api = this.adaptable.api.pluginsApi.getPluginApi('glue42');
      var glue42Job: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        glue42Api.sendSnapshotToDo(glue42Schedule.Glue42Report);

        this.glue42Jobs.push(glue42Job);
      });
    }
  }

  public AddOpenFinSchedule(openFinSchedule: OpenFinSchedule): void {
    const date: Date = this.getDateFromSchedule(openFinSchedule.Schedule);
    if (date != null) {
      const openFinApi: OpenFinApi = this.adaptable.api.pluginsApi.getPluginApi('openfin');
      var OpenFinJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        openFinApi.startLiveData(openFinSchedule.OpenFinReport);

        this.openFinJobs.push(OpenFinJob);
      });
    }
  }

  private AddMidnightRefreshSchedule(): void {
    const reloadSchedule: Schedule = {
      Hour: 0,
      Minute: 1,
      DaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    };

    const date: Date = this.getDateFromSchedule(reloadSchedule);
    if (date != null) {
    }
  }

  private getDateFromSchedule(schedule: Schedule): Date {
    let date: Date = null;
    if (schedule.OneOffDate != null) {
      date = new Date(schedule.OneOffDate);
      date.setHours(schedule.Hour);
      date.setMinutes(schedule.Minute);
      date.setSeconds(0);
    } else {
      date = new Date();
      if (ArrayExtensions.ContainsItem(schedule.DaysOfWeek, date.getDay())) {
        date.setHours(schedule.Hour);
        date.setMinutes(schedule.Minute);
        date.setSeconds(0);
      } else {
        return null; // because it will rerun at midnight so we can get rid
      }
    }

    // add check for whether date in the past
    if (date != null && DateExtensions.IsDateInFuture(date)) {
      return date;
    }
    return null;
  }

  private clearAllReminderJobs(): void {
    this.reminderJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.reminderJobs = [];
  }

  private clearAllExportJobs(): void {
    this.exportJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.exportJobs = [];
  }

  private clearAllIPushPullJobs(): void {
    this.iPushPullJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.iPushPullJobs = [];
  }

  private clearAllGlue42Jobs(): void {
    this.glue42Jobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.glue42Jobs = [];
  }

  private clearAllOpenFinJobs(): void {
    this.openFinJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.openFinJobs = [];
  }
}
