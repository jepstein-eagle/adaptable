import { ExportDestination } from "../../Enums";
import { IAdaptableAlert } from "../../Interface/IMessage";
export interface IScheduleService {
    RunScheduleReport(reportName: string, exportDestination: ExportDestination): void;
    RunScheduleAlert(alertToShow: IAdaptableAlert, showAlertAsPopup: boolean): void;
}
