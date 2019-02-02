"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
class SystemStatusApi extends ApiBase_1.ApiBase {
    // System Status api Methods
    Set(statusMessage, statusColour) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: statusColour };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    SetRed(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Red };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    SetAmber(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Amber };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    SetGreen(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Green };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    SetBlue(statusMessage) {
        let systemStatus = { StatusMessage: statusMessage, StatusColour: Enums_1.StatusColour.Blue };
        this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
    }
    Clear() {
        this.dispatchAction(SystemRedux.SystemClearHealthStatus());
    }
}
exports.SystemStatusApi = SystemStatusApi;
