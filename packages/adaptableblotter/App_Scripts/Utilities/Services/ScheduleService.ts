import { IScheduleService } from './Interface/IScheduleService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import * as NodeSchedule from 'node-schedule';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { DateExtensions } from '../Extensions/DateExtensions';
import { ReminderState, Reminder } from '../../PredefinedConfig/RunTimeState/ReminderState';
import { ExportState, Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { Schedule } from '../../PredefinedConfig/Common/Schedule';
import { IReminderStrategy } from '../../Strategy/Interface/IReminderStrategy';
import { IExportStrategy } from '../../Strategy/Interface/IExportStrategy';

/**
 * This class is used for managing scheduling of Reports and Reminders
 * It uses node-schedule (via a strongly typed NodeSchedule) and creates standard jobs
 * It also createsa daily job to run at midnight that will refresh the Blotter - this is so that date-based schedules can jump to the new day
 */
export class ScheduleService implements IScheduleService {
  private alertJobs: NodeSchedule.Job[];
  private exportJobs: NodeSchedule.Job[];

  private reminderState: ReminderState;
  private exportState: ExportState;

  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    this.blotter.adaptableBlotterStore.TheStore.subscribe(() =>
      this.listenToScheduleStoreChanges()
    );
    this.alertJobs = [];
    this.exportJobs = [];

    // create the midnight reload job
    let reloadSchedule: Schedule = {
      Hour: 0,
      Minute: 1,
      DaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    };

    let date: Date = this.getDateFromSchedule(reloadSchedule);
    if (date != null) {
      var refreshGridJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
        this.blotter.reloadGrid();
      });
    }
  }

  protected listenToScheduleStoreChanges(): void {
    if (this.blotter.isInitialised) {
      if (this.reminderState != this.getReminderState()) {
        this.reminderState = this.getReminderState();
        let reminderStrategy = <IReminderStrategy>(
          this.blotter.strategies.get(StrategyConstants.ReminderStrategyId)
        );
        reminderStrategy.scheduleReminders();
      }

      if (this.exportState != this.getExportState()) {
        this.exportState = this.getExportState();
        let exportStrategy = <IExportStrategy>(
          this.blotter.strategies.get(StrategyConstants.ExportStrategyId)
        );
        exportStrategy.scheduleReports();
      }
    }
  }

  public AddReminderSchedule(reminder: Reminder): void {
    let date: Date = this.getDateFromSchedule(reminder.Schedule);
    if (date != null) {
      var alertJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
        this.blotter.api.alertApi.showAlert(reminder.Alert);
      });
      this.alertJobs.push(alertJob);
    }
  }

  public AddReportSchedule(report: Report): void {
    if (report.AutoExport) {
      let date: Date = this.getDateFromSchedule(report.AutoExport.Schedule);
      if (date != null) {
        var exportJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
          this.blotter.api.exportApi.sendReport(report.Name, report.AutoExport.ExportDestination);
        });
        this.exportJobs.push(exportJob);
      }
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

  public ClearAllAlertJobs(): void {
    this.alertJobs.forEach(j => {
      if (j != null) {
        j.cancel();
      }
    });
    this.alertJobs = [];
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
