import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import * as NodeSchedule from 'node-schedule';
import { ISchedule, IAlertScheduleItem, IReportScheduleItem } from "../Interface/BlotterObjects/ISchedule";
import { ScheduleType } from "../Enums";

export class ScheduleService implements IScheduleService {

    constructor(private blotter: IAdaptableBlotter) {

    }

    public AddSchedule(schedule: ISchedule): void {
        let date: Date = null;
        if (schedule.ScheduleTime.OneOffDate != null) {
            date = schedule.ScheduleTime.OneOffDate;

        } else {
            date = new Date(2019, 2, 28, schedule.ScheduleTime.RecurringDate.Hour, schedule.ScheduleTime.RecurringDate.Minute, 0);

        }

        if (date != null) {
            var l = NodeSchedule.scheduleJob(date, () => {
                let alertScheduleItem: IAlertScheduleItem = schedule.ScheduleItem as IAlertScheduleItem;
                this.blotter.api.alertApi.ShowAlert(alertScheduleItem.Alert);
            })
        }


        /*
           var test = new NodeSchedule.RecurrenceRule();
           test.dayOfWeek = [0, 3, 4];
           test.hour = 20;
           test.minute = 45;
           var l = NodeSchedule.scheduleJob(test, () => {
               let alertScheduleItem: IAlertScheduleItem = schedule.ScheduleItem as IAlertScheduleItem;
              this.blotter.api.alertApi.ShowAlert(alertScheduleItem.Alert);
           })
        
   
           var d = NodeSchedule.scheduleJob(date, () => {
               switch (schedule.ScheduleType) {
                   case ScheduleType.Alert:
                       let alertScheduleItem: IAlertScheduleItem = schedule.ScheduleItem as IAlertScheduleItem;
                     //  this.blotter.api.alertApi.ShowAlert(alertScheduleItem.Alert);
                       break;
                   case ScheduleType.Report:
                       let reportcheduleItem: IReportScheduleItem = schedule.ScheduleItem as IReportScheduleItem;
                      /// this.blotter.api.exportApi.SendReport(reportcheduleItem.Name, reportcheduleItem.ExportDestination);
                       break;
               }
           })
       }
   */
    }
}