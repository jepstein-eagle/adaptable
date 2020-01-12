import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import { Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { Schedule } from '../../PredefinedConfig/Common/Schedule';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { IPushPullReport, IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import DateExtensions from '../Extensions/DateExtensions';

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

  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
    this.reminderJobs = [];
    this.exportJobs = [];
    this.iPushPullJobs = [];

    this.AddMidnightRefreshSchedule();

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      setTimeout(() => {
        this.updateReminderJobs();
        this.updateReportJobs();
        this.updateIPushPullJobs();
      }, 1000);
    });

    this.adaptable._on('GridReloaded', () => {
      // this.scheduleIPushPullReports();
    });

    this.adaptable.AdaptableStore.onAny((eventName: string) => {
      if (this.adaptable.isInitialised) {
        if (
          eventName == ReminderRedux.REMINDER_SCHEDULE_ADD ||
          eventName == ReminderRedux.REMINDER_SCHEDULE_EDIT ||
          eventName == ReminderRedux.REMINDER_SCHEDULE_DELETE
        ) {
          this.updateReminderJobs();
        } else if (
          eventName == ExportRedux.REPORT_SCHEDULE_ADD ||
          eventName == ExportRedux.REPORT_SCHEDULE_EDIT ||
          eventName == ExportRedux.REPORT_SCHEDULE_DELETE
        ) {
          this.updateReportJobs();
        } else if (
          eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_ADD ||
          eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_EDIT ||
          eventName == IPushPullRedux.IPUSHPULL_SCHEDULE_DELETE
        ) {
          this.updateIPushPullJobs();
        }
      }
    });
  }

  private updateReminderJobs() {
    this.ClearAllReminderJobs();
    this.adaptable.api.scheduleApi
      .getAllReminderSchedule()
      .forEach((reminderSchedule: ReminderSchedule) => {
        this.AddReminderSchedule(reminderSchedule);
      });
  }

  private updateReportJobs() {
    this.ClearAllExportJobs();
    this.adaptable.api.scheduleApi
      .getAllReportSchedule()
      .forEach((reportSchedule: ReportSchedule) => {
        this.AddReportSchedule(reportSchedule);
      });
  }

  private updateIPushPullJobs() {
    this.adaptable.ScheduleService.ClearAllIPushPullJobs();
    this.adaptable.api.scheduleApi
      .getAllIPushPullSchedule()
      .forEach((iPushPullSchedule: IPushPullSchedule) => {
        this.AddIPushPullSchedule(iPushPullSchedule);
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
      var exportJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        // we need to go through Redux as the flow is always Redux => Adaptable Store => api
        if (iPushPullSchedule.DataTransmission == 'Snapshot') {
          this.adaptable.api.internalApi.dispatchReduxAction(
            IPushPullRedux.IPushPullSendSnapshot(iPushPullSchedule.IPushPullReport)
          );
        } else if (iPushPullSchedule.DataTransmission == 'Live Data') {
          this.adaptable.api.internalApi.dispatchReduxAction(
            IPushPullRedux.IPushPullStartLiveData(iPushPullSchedule.IPushPullReport)
          );
        }
        this.exportJobs.push(exportJob);
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

  public ClearAllReminderJobs(): void {
    this.reminderJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.reminderJobs = [];
  }

  public ClearAllExportJobs(): void {
    this.exportJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.exportJobs = [];
  }

  public ClearAllIPushPullJobs(): void {
    this.iPushPullJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.iPushPullJobs = [];
  }
}
