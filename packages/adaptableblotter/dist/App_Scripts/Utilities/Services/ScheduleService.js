"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeSchedule = require("node-schedule");
const Enums_1 = require("../Enums");
class ScheduleService {
    constructor(blotter) {
        this.blotter = blotter;
        this.jobs = [];
    }
    AddSchedule(schedule) {
        let date = null;
        if (schedule.ScheduleTime.OneOffDate != null) {
            date = schedule.ScheduleTime.OneOffDate;
        }
        else {
            date = new Date(2019, 3, 2, schedule.ScheduleTime.RecurringDate.Hour, schedule.ScheduleTime.RecurringDate.Minute, 0);
        }
        if (date != null) {
            switch (schedule.ScheduleType) {
                case Enums_1.ScheduleType.Alert:
                    this.scheduleAlert(date, schedule);
                    break;
                case Enums_1.ScheduleType.Report:
                    this.scheduleReport(date, schedule);
                    break;
            }
        }
    }
    ClearAllJobs() {
        console.log("before");
        console.log(this.jobs);
        this.jobs.forEach(j => {
            if (j != null) {
                console.log("cancelling");
                console.log(j);
                j.cancel();
            }
        });
        this.jobs = [];
        console.log("after");
        console.log(this.jobs);
    }
    scheduleAlert(date, schedule) {
        var job = NodeSchedule.scheduleJob(date, () => {
            let alertScheduleItem = schedule.ScheduleItem;
            this.blotter.api.alertApi.ShowAlert(alertScheduleItem.Alert);
        });
        this.jobs.push(job);
        console.log('after adding alert job');
        console.log(this.jobs);
    }
    scheduleReport(date, schedule) {
        var job = NodeSchedule.scheduleJob(date, () => {
            let reportcheduleItem = schedule.ScheduleItem;
            this.blotter.api.exportApi.SendReport(reportcheduleItem.Name, reportcheduleItem.ExportDestination);
        });
        this.jobs.push(job);
        console.log('after adding report job');
        console.log(this.jobs);
    }
}
exports.ScheduleService = ScheduleService;
