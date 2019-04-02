import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import * as NodeSchedule from 'node-schedule';
import { ISchedule, IAlertScheduleItem, IReportScheduleItem } from "../Interface/BlotterObjects/ISchedule";
import { ScheduleType } from "../Enums";
import { DateTimeFormat } from "igniteui-react-core/ES2015/culture";

export class ScheduleService implements IScheduleService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public AddSchedule(schedule: ISchedule): void {
        let date: Date = null;
        if (schedule.ScheduleTime.OneOffDate != null) {
            date = schedule.ScheduleTime.OneOffDate;

        } else {
            date = new Date(2019, 3, 2, schedule.ScheduleTime.RecurringDate.Hour, schedule.ScheduleTime.RecurringDate.Minute, 0);
        }

       
        if (date != null) {
            switch(schedule.ScheduleType){
                case ScheduleType.Alert:
                this.scheduleAlert(date, schedule);
                break;
                
                case ScheduleType.Report:
                this.scheduleReport(date, schedule);
                break;
    
            }
        }


    }

    private scheduleAlert(date: Date, schedule: ISchedule){
        var l = NodeSchedule.scheduleJob(date, () => {
            let alertScheduleItem: IAlertScheduleItem = schedule.ScheduleItem as IAlertScheduleItem;
            this.blotter.api.alertApi.ShowAlert(alertScheduleItem.Alert);
        })
    }

    private scheduleReport(date: Date, schedule: ISchedule){
        var l = NodeSchedule.scheduleJob(date, () => {
            let reportcheduleItem: IReportScheduleItem = schedule.ScheduleItem as IReportScheduleItem;
             this.blotter.api.exportApi.SendReport(reportcheduleItem.Name, reportcheduleItem.ExportDestination);
        })
    }
}