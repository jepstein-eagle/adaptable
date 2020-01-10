import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { DateExtensions } from '../Extensions/DateExtensions';
import { ReminderState, Reminder } from '../../PredefinedConfig/ReminderState';
import { ExportState, Report } from '../../PredefinedConfig/ExportState';
import { Schedule } from '../../PredefinedConfig/Common/Schedule';
import { IReminderStrategy } from '../../Strategy/Interface/IReminderStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { IPushPullReport, IPushPullState } from '../../PredefinedConfig/IPushPullState';
import { IPushPullStrategy } from '../../Strategy/Interface/IPushPullStrategy';

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
        this.updateReminderStrategy();
        this.updateExportStrategy();
        this.updateIPushPullStrategy();
      }, 1000);
    });

    this.adaptable.AdaptableStore.onAny((eventName: string) => {
      if (this.adaptable.isInitialised) {
        if (
          eventName == ReminderRedux.REMINDER_ADD ||
          eventName == ReminderRedux.REMINDER_EDIT ||
          eventName == ReminderRedux.REMINDER_DELETE
        ) {
          this.updateReminderStrategy();
        } else if (
          eventName == ExportRedux.REPORT_ADD ||
          eventName == ExportRedux.REPORT_EDIT ||
          eventName == ExportRedux.REPORT_DELETE
        ) {
          this.updateExportStrategy();
        } else if (
          eventName == IPushPullRedux.IPUSHPULL_REPORT_ADD ||
          eventName == IPushPullRedux.IPUSHPULL_REPORT_EDIT ||
          eventName == IPushPullRedux.IPUSHPULL_REPORT_DELETE
        ) {
          this.updateIPushPullStrategy();
        }
      }
    });
  }

  private updateReminderStrategy() {
    const reminderStrategy = this.adaptable.strategies.get(
      StrategyConstants.ReminderStrategyId
    ) as IReminderStrategy;
    reminderStrategy.scheduleReminders();
  }

  private updateExportStrategy() {
    const exportStrategy = this.adaptable.strategies.get(
      StrategyConstants.ExportStrategyId
    ) as IExportStrategy;
    exportStrategy.scheduleReports();
  }

  private updateIPushPullStrategy() {
    const iPushPullStrategy = this.adaptable.strategies.get(
      StrategyConstants.IPushPullStrategyId
    ) as IPushPullStrategy;
    iPushPullStrategy.scheduleIPushPullReports();
  }

  public AddReminderSchedule(reminder: Reminder): void {
    const date: Date = this.getDateFromSchedule(reminder.Schedule);
    if (date != null) {
      var alertJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        this.adaptable.api.alertApi.displayAlert(reminder.Alert);
      });
      this.reminderJobs.push(alertJob);
    }
  }

  public AddReportSchedule(report: Report): void {
    if (report.AutoExport) {
      const date: Date = this.getDateFromSchedule(report.AutoExport.Schedule);
      if (date != null) {
        var exportJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
          this.adaptable.api.exportApi.sendReport(report.Name, report.AutoExport!
            .ExportDestination as ExportDestination);
        });
        this.exportJobs.push(exportJob);
      }
    }
  }

  public AddIPushPullReportSchedule(iPushPullReport: IPushPullReport): void {
    if (iPushPullReport.Report.AutoExport) {
      const date: Date = this.getDateFromSchedule(iPushPullReport.Report.AutoExport.Schedule);
      if (date != null) {
        var iPushPullJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
          this.adaptable.api.iPushPullApi.exportToIPushPull(iPushPullReport.Report.Name);
        });
        this.iPushPullJobs.push(iPushPullJob);
      }
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
      var refreshGridJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        this.adaptable.reloadGrid();
      });
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
