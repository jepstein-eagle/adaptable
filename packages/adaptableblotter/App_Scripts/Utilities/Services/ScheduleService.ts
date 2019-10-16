import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { DateExtensions } from '../Extensions/DateExtensions';
import { ReminderState, Reminder } from '../../PredefinedConfig/RunTimeState/ReminderState';
import { ExportState, Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { Schedule } from '../../PredefinedConfig/Common/Schedule';
import { IReminderStrategy } from '../../Strategy/Interface/IReminderStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';

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
 * TODO - we need to implement a way to make sure that if the user doesn't reload the browser for 5 days and has a reminder for each of those days,
 * we need to make sure all of those occurences are triggered
 */

/**
 * This class is used for managing scheduling of Reports and Reminders
 * It listens to any changes in the Reminder or the Export state and tells the respective stragies to refresh
 * It also createsa daily job to run at midnight that will refresh the Blotter - this is so that date-based schedules can jump to the new day
 */
export class ScheduleService implements IScheduleService {
  private reminderJobs: ScheduleJob[];

  private exportJobs: ScheduleJob[];

  private reminderState: ReminderState;

  private exportState: ExportState;

  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() =>
      this.listenToScheduleStoreChanges()
    );
    this.reminderJobs = [];
    this.exportJobs = [];

    this.AddMidnightRefreshSchedule();
  }

  protected listenToScheduleStoreChanges(): void {
    if (this.blotter.isInitialised) {
      if (this.reminderState != this.getReminderState()) {
        this.reminderState = this.getReminderState();
        const reminderStrategy = this.blotter.strategies.get(
          StrategyConstants.ReminderStrategyId
        ) as IReminderStrategy;
        reminderStrategy.scheduleReminders();
      }

      if (this.exportState != this.getExportState()) {
        this.exportState = this.getExportState();
        const exportStrategy = this.blotter.strategies.get(
          StrategyConstants.ExportStrategyId
        ) as IExportStrategy;
        exportStrategy.scheduleReports();
      }
    }
  }

  public AddReminderSchedule(reminder: Reminder): void {
    const date: Date = this.getDateFromSchedule(reminder.Schedule);
    if (date != null) {
      var alertJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
        this.blotter.api.alertApi.displayAlert(reminder.Alert);
      });
      this.reminderJobs.push(alertJob);
    }
  }

  public AddReportSchedule(report: Report): void {
    if (report.AutoExport) {
      const date: Date = this.getDateFromSchedule(report.AutoExport.Schedule);
      if (date != null) {
        var exportJob: ScheduleJob = NodeSchedule.scheduleJob(date, () => {
          this.blotter.api.exportApi.sendReport(report.Name, report.AutoExport.ExportDestination);
        });
        this.exportJobs.push(exportJob);
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
        this.blotter.reloadGrid();
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

  private getReminderState(): ReminderState {
    return this.blotter.api.reminderApi.getReminderState();
  }

  private getExportState(): ExportState {
    return this.blotter.api.exportApi.getExportState();
  }
}
