"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
class AuditLogService {
    constructor(blotter, blotterOptions) {
        this.blotter = blotter;
        this.canSendLog = true;
        this.numberOfMissedPing = 0;
        this.auditLogQueue = [];
        this.blotterOptions = blotterOptions;
        this.setUpFlags(blotterOptions);
        if (this.IsAuditEnabled) {
            this.ping();
            setInterval(() => this.ping(), blotterOptions.auditOptions.pingInterval * 1000);
            setInterval(() => this.flushAuditQueue(), blotterOptions.auditOptions.auditLogsSendInterval * 1000);
        }
    }
    setUpFlags(blotterOptions) {
        // Internal State
        if (blotterOptions.auditOptions != null && blotterOptions.auditOptions.auditInternalStateChanges != null) {
            this.IsAuditInternalStateChangesEnabled = blotterOptions.auditOptions.auditInternalStateChanges;
        }
        else {
            this.IsAuditInternalStateChangesEnabled = false;
        }
        // User State
        if (blotterOptions.auditOptions != null && blotterOptions.auditOptions.auditUserStateChanges != null) {
            this.IsAuditUserStateChangesEnabled = blotterOptions.auditOptions.auditUserStateChanges;
        }
        else {
            this.IsAuditUserStateChangesEnabled = false;
        }
        // Function Events
        if (blotterOptions.auditOptions != null && blotterOptions.auditOptions.auditFunctionEvents != null) {
            this.IsAuditFunctionEventsEnabled = blotterOptions.auditOptions.auditFunctionEvents;
        }
        else {
            this.IsAuditFunctionEventsEnabled = false;
        }
        // Cell Edit
        if (blotterOptions.auditOptions != null && blotterOptions.auditOptions.auditCellEdits != null) {
            this.IsAuditCellEditsEnabled = blotterOptions.auditOptions.auditCellEdits;
        }
        else {
            this.IsAuditCellEditsEnabled = false;
        }
        // Log State
        this.IsAuditStateChangesEnabled = this.IsAuditInternalStateChangesEnabled || this.IsAuditUserStateChangesEnabled;
        // General Audit Flag
        this.IsAuditEnabled = this.IsAuditStateChangesEnabled || this.IsAuditFunctionEventsEnabled || this.IsAuditCellEditsEnabled;
    }
    AddEditCellAuditLogBatch(dataChangedEvents) {
        dataChangedEvents.forEach(dce => { this.AddEditCellAuditLog(dce); });
    }
    AddEditCellAuditLog(dataChangedEvent) {
        if (this.IsAuditCellEditsEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: Enums_1.AuditLogTrigger.CellEdit,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                adaptableblotter_editcell: {
                    primarykey: String(dataChangedEvent.IdentifierValue),
                    primarykey_column_id: this.blotterOptions.primaryKey,
                    column_id: dataChangedEvent.ColumnId,
                    previous_value: String(dataChangedEvent.OldValue),
                    new_value: String(dataChangedEvent.NewValue)
                }
            });
        }
    }
    AddStateChangeAuditLog(stateChanges, actionType) {
        if (this.IsAuditStateChangesEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: Enums_1.AuditLogTrigger.StateChange,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                //we want to lose the type since you cannot have same field name with different types in logstash. So log it as a string...
                //it makes sense anyway
                adaptableblotter_state_change: this.convertToText(stateChanges),
                adaptableblotter_state_change_action: actionType
            });
        }
    }
    AddAdaptableBlotterFunctionLog(functionName, action, info, data) {
        if (this.IsAuditFunctionEventsEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: Enums_1.AuditLogTrigger.AdaptableBlotterFunction,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                adaptableblotter_function: {
                    name: functionName,
                    action: action,
                    info: info,
                    //not sure if it's best to leave undefined or null.... I think null is better
                    //same as adaptableblotter_state_change we log the obj as a string
                    data: data ? this.convertToText(data) : null
                }
            });
        }
    }
    ping() {
        let pingMessage = {
            adaptableblotter_auditlog_trigger: Enums_1.AuditLogTrigger.Ping,
            adaptableblotter_client_timestamp: new Date(),
            adaptableblotter_username: this.blotterOptions.userName,
            adaptableblotter_id: this.blotterOptions.blotterId,
            adaptableblotter_number_of_missed_ping: this.numberOfMissedPing
        };
        let xhr = new XMLHttpRequest();
        xhr.onerror = (ev) => { LoggingHelper_1.LoggingHelper.LogMessage("error sending ping: " + ev.message); this.SetCanSendLog(false); };
        xhr.ontimeout = (ev) => { LoggingHelper_1.LoggingHelper.LogMessage("timeout sending ping"); this.SetCanSendLog(false); };
        xhr.onload = (ev) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    this.SetCanSendLog(true);
                }
                else {
                    LoggingHelper_1.LoggingHelper.LogError("error sending ping: " + xhr.statusText);
                    this.SetCanSendLog(false);
                }
            }
        };
        var url = "/auditlog";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(pingMessage));
    }
    SetCanSendLog(enable) {
        if (enable) {
            this.canSendLog = true;
            this.numberOfMissedPing = 0;
        }
        else {
            this.canSendLog = false;
            this.numberOfMissedPing++;
        }
    }
    flushAuditQueue() {
        //if we cannot send logs then we just clear the thing
        if (!this.canSendLog) {
            this.auditLogQueue.length = 0;
        }
        let obj = this.auditLogQueue.shift();
        // while (obj && this.sockJS.readyState == SockJS.OPEN) {
        while (obj) {
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev) => LoggingHelper_1.LoggingHelper.LogMessage("error sending AuditLog: " + ev.message);
            xhr.ontimeout = (pe) => LoggingHelper_1.LoggingHelper.LogMessage("timeout sending AuditLog");
            xhr.onload = (pe) => {
                if (xhr.readyState == 4) {
                    if (xhr.status != 200) {
                        LoggingHelper_1.LoggingHelper.LogError("error sending AuditLog: " + xhr.statusText);
                    }
                }
            };
            var url = "/auditlog";
            //we make the request async
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(obj));
            obj = this.auditLogQueue.shift();
        }
    }
    convertToText(obj) {
        let stringArray = [];
        if (obj == undefined) {
            return String(obj);
        }
        else if (Array.isArray(obj)) {
            for (let prop in obj) {
                stringArray.push(this.convertToText(obj[prop]));
            }
            return "[" + stringArray.join(",") + "]";
        }
        if (typeof (obj) == "object") {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    stringArray.push(prop + ": " + this.convertToText(obj[prop]));
                }
            }
            return "{" + stringArray.join(",") + "}";
            //is function
        }
        else if (typeof (obj) == "function") {
            stringArray.push(obj.toString());
        }
        else {
            stringArray.push(String(obj));
        }
        return stringArray.join(",");
    }
}
exports.AuditLogService = AuditLogService;
