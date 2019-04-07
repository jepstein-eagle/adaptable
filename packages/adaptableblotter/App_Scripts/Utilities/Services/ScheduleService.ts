import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import * as NodeSchedule from 'node-schedule';
import { ISchedule } from "../Interface/BlotterObjects/ISchedule";
import { ArrayExtensions } from "../Extensions/ArrayExtensions";
import { DateExtensions } from "../Extensions/DateExtensions";
import { IReport } from "../Interface/BlotterObjects/IReport";
import { IReminder } from "../Interface/BlotterObjects/IReminder";

export class ScheduleService implements IScheduleService {

    private alertJobs: NodeSchedule.Job[]
    private exportJobs: NodeSchedule.Job[]

    constructor(private blotter: IAdaptableBlotter) {
        this.alertJobs = [];
        this.exportJobs = [];
    }

    public AddAlertSchedule(reminder: IReminder): void {
        let date: Date = this.getDate(reminder.Schedule);
        if (date != null) {
            var alertJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
                this.blotter.api.alertApi.ShowAlert(reminder.Alert);
            })
            this.alertJobs.push(alertJob);
        }
    }

    public AddReportSchedule(report: IReport): void {
        if (report.AutoExport) {
            let date: Date = this.getDate(report.AutoExport.Schedule);
            if (date != null) {
                var exportJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
                    this.blotter.api.exportApi.SendReport(report.Name, report.AutoExport.ExportDestination);
                })
                this.exportJobs.push(exportJob);
            }
        }
    }

    private getDate(schedule: ISchedule): Date {
        let date: Date = null;
        if (schedule.OneOffDate != null) {
            date = new Date(schedule.OneOffDate);
            date.setHours(schedule.Hour);
            date.setMinutes(schedule.Minute)
            date.setSeconds(0);
        } else {
            date = new Date();
            if (ArrayExtensions.ContainsItem(schedule.DaysOfWeek, date.getDay())) {
                date.setHours(schedule.Hour);
                date.setMinutes(schedule.Minute)
                date.setSeconds(0);
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
        })
        this.alertJobs = []
    }

    public ClearAllExportJobs(): void {
        this.exportJobs.forEach(j => {
            if (j != null) {
                j.cancel();
            }
        })
        this.exportJobs = []
    }

}