"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeSchedule = require("node-schedule");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const DateExtensions_1 = require("../Extensions/DateExtensions");
class ScheduleService {
    constructor(blotter) {
        this.blotter = blotter;
        this.alertJobs = [];
        this.exportJobs = [];
    }
    AddAlertSchedule(reminder) {
        let date = this.getDate(reminder.Schedule);
        if (date != null) {
            var alertJob = NodeSchedule.scheduleJob(date, () => {
                this.blotter.api.alertApi.ShowAlert(reminder.Alert);
            });
            this.alertJobs.push(alertJob);
        }
    }
    AddReportSchedule(report) {
        if (report.AutoExport) {
            let date = this.getDate(report.AutoExport.Schedule);
            if (date != null) {
                var exportJob = NodeSchedule.scheduleJob(date, () => {
                    this.blotter.api.exportApi.SendReport(report.Name, report.AutoExport.ExportDestination);
                });
                this.exportJobs.push(exportJob);
            }
        }
    }
    getDate(schedule) {
        let date = null;
        if (schedule.OneOffDate != null) {
            date = new Date(schedule.OneOffDate);
            date.setHours(schedule.Hour);
            date.setMinutes(schedule.Minute);
            date.setSeconds(0);
        }
        else {
            date = new Date();
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(schedule.DaysOfWeek, date.getDay())) {
                date.setHours(schedule.Hour);
                date.setMinutes(schedule.Minute);
                date.setSeconds(0);
            }
        }
        // add check for whether date in the past
        if (date != null && DateExtensions_1.DateExtensions.IsDateInFuture(date)) {
            return date;
        }
        return null;
    }
    ClearAllAlertJobs() {
        this.alertJobs.forEach(j => {
            if (j != null) {
                j.cancel();
            }
        });
        this.alertJobs = [];
    }
    ClearAllExportJobs() {
        this.exportJobs.forEach(j => {
            if (j != null) {
                j.cancel();
            }
        });
        this.exportJobs = [];
    }
}
exports.ScheduleService = ScheduleService;
