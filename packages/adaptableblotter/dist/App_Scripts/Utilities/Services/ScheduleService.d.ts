import { IScheduleService } from "./Interface/IScheduleService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { ExportDestination } from "../Enums";
import { IAdaptableAlert } from "../Interface/IMessage";
export declare class ScheduleService implements IScheduleService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    RunScheduleReport(reportName: string, exportDestination: ExportDestination): void;
    RunScheduleAlert(alertToShow: IAdaptableAlert, showAlertAsPopup: boolean): void;
}
