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
        let reloadSchedule = {
            Hour: 0,
            Minute: 1,
            DaysOfWeek: [0, 1, 2, 3, 4, 5, 6]
        };
        let date = this.getDateFromSchedule(reloadSchedule);
        if (date != null) {
            var refreshGridJob = NodeSchedule.scheduleJob(date, () => {
                this.blotter.reloadGrid();
            });
        }
    }
    AddReminderSchedule(reminder) {
        let date = this.getDateFromSchedule(reminder.Schedule);
        if (date != null) {
            var alertJob = NodeSchedule.scheduleJob(date, () => {
                this.blotter.api.alertApi.ShowAlert(reminder.Alert);
            });
            this.alertJobs.push(alertJob);
        }
    }
    AddReportSchedule(report) {
        if (report.AutoExport) {
            let date = this.getDateFromSchedule(report.AutoExport.Schedule);
            if (date != null) {
                var exportJob = NodeSchedule.scheduleJob(date, () => {
                    this.blotter.api.exportApi.SendReport(report.Name, report.AutoExport.ExportDestination);
                });
                this.exportJobs.push(exportJob);
            }
        }
    }
    getDateFromSchedule(schedule) {
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
