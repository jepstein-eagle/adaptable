"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScheduleService {
    constructor(blotter) {
        this.blotter = blotter;
        // todo
    }
    RunScheduleReport(reportName, exportDestination) {
        this.blotter.api.exportApi.SendReport(reportName, exportDestination);
    }
    RunScheduleAlert(alertToShow, showAlertAsPopup) {
        this.blotter.api.alertApi.ShowAlert(alertToShow, showAlertAsPopup);
    }
}
exports.ScheduleService = ScheduleService;
