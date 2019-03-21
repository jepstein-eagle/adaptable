import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ExportDestination } from "../Enums";
import { IAdaptableAlert } from "../Interface/IMessage";

export class ScheduleService implements IScheduleService {

   
    constructor(private blotter: IAdaptableBlotter) {
        // todo
    }

    RunScheduleReport(reportName: string, exportDestination:  ExportDestination):void{
        this.blotter.api.exportApi.SendReport(reportName, exportDestination);
    }

    RunScheduleAlert(alertToShow: IAdaptableAlert, showAlertAsPopup: boolean): void{
        this.blotter.api.alertApi.ShowAlert(alertToShow, showAlertAsPopup);
     }

}