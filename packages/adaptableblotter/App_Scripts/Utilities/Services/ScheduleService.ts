import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import * as NodeSchedule from 'node-schedule';
import { ISchedule, IRecurringDate } from "../Interface/BlotterObjects/ISchedule";
import { ArrayExtensions } from "../Extensions/ArrayExtensions";
import { DateExtensions } from "../Extensions/DateExtensions";
import { IAutoExport } from "../Interface/BlotterObjects/IReport";
import { IReminder } from "../Interface/BlotterObjects/IReminder";

export class ScheduleService implements IScheduleService {

    private alertJobs: NodeSchedule.Job[]
    private exportJobs: NodeSchedule.Job[]

    constructor(private blotter: IAdaptableBlotter) {
        this.alertJobs = [];
        this.exportJobs = [];
    }

    public AddAlertSchedule( reminder: IReminder): void {
        let date: Date = this.getDate(reminder.Schedule);
        if (date != null) {
            var alertJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
                this.blotter.api.alertApi.ShowAlert(reminder.Alert);
            })
            this.alertJobs.push(alertJob);
            console.log('after adding alert job')
            console.log(this.alertJobs)
        }
    }

    public AddReportSchedule(autoExport: IAutoExport): void {
        let date: Date = this.getDate(autoExport.Schedule);
        if (date != null) {
            var exportJob: NodeSchedule.Job = NodeSchedule.scheduleJob(date, () => {
                this.blotter.api.exportApi.SendReport(autoExport.Name, autoExport.ExportDestination);

            })
            this.exportJobs.push(exportJob);
            console.log('after adding alert job')
            console.log(this.exportJobs)
        }
    }

    private getDate(schedule: ISchedule): Date {

        let date: Date = null;
        if (schedule.OneOffDate != null) {
            date = schedule.OneOffDate;
        } else {
            let scheduleRule: IRecurringDate = schedule.RecurringDate;
            if (scheduleRule != null) { // unlikely but possible
                let currentDate = new Date();
                // check that the day of the week is correct ?
                if (ArrayExtensions.ContainsItem(scheduleRule.DaysOfWeek, currentDate.getDay())) {
                    let currentDate = new Date();
                    date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), schedule.RecurringDate.Hour, schedule.RecurringDate.Minute, 0);
                }
            }
        }

        // add check for whether date in the past
        if (date != null && DateExtensions.IsDateInFuture(date)) {
            return date;

        }
        return null;
    }




    public ClearAllAlertJobs(): void {
        console.log("before cancel alert jobs")
        console.log(this.alertJobs)
        this.alertJobs.forEach(j => {
            if (j != null) {
                console.log("cancelling alert jobs")
                console.log(j)
                j.cancel();
            }
        })
        this.alertJobs = []
        console.log("after cancel alert jobs")
        console.log(this.alertJobs)
    }

    public ClearAllExportJobs(): void {
        console.log("before cancel export jobs")
        console.log(this.exportJobs)
        this.exportJobs.forEach(j => {
            if (j != null) {
                console.log("cancelling export jobs")
                console.log(j)
                j.cancel();
            }
        })
        this.exportJobs = []
        console.log("after cancel export jobs")
        console.log(this.exportJobs)
    }




}