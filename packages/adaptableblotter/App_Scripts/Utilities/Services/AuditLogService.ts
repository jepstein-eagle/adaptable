import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IDataChangedInfo } from '../Interface/IDataChangedInfo';
import { AuditLogEntry, AuditLogType } from '../Interface/AuditLogEntry';
import { IAuditLogService } from './Interface/IAuditLogService';
import { IAdaptableBlotter } from '../../types';
import {
  StateChangedDetails,
  FunctionAppliedDetails,
  AuditLogEventData,
  AuditLogEventArgs,
} from '../../Api/Events/AuditEvents';
import { AuditDestinationOptions, AuditOptions } from '../../BlotterOptions/AuditOptions';

export class AuditLogService implements IAuditLogService {
  private auditLogQueue: Array<AuditLogEntry>;
  private canSendLog: boolean = true;
  private numberOfMissedPing: number = 0;
  private blotter: IAdaptableBlotter;

  public isAuditEnabled: boolean;
  public isAuditStateChangesEnabled: boolean;
  public isAuditCellEditsEnabled: boolean;
  public isAuditFunctionEventsEnabled: boolean;
  public isAuditUserStateChangesEnabled: boolean;
  public isAuditInternalStateChangesEnabled: boolean;

  constructor(blotter: IAdaptableBlotter) {
    this.auditLogQueue = [];
    this.blotter = blotter;

    // Internal State
    if (
      blotter.blotterOptions.auditOptions != null &&
      blotter.blotterOptions.auditOptions.auditInternalStateChanges != null
    ) {
      this.isAuditInternalStateChangesEnabled = this.isAuditOptionEnabled(
        blotter.blotterOptions.auditOptions.auditInternalStateChanges
      );
    } else {
      this.isAuditInternalStateChangesEnabled = false;
    }

    // User State
    if (
      blotter.blotterOptions.auditOptions != null &&
      blotter.blotterOptions.auditOptions.auditUserStateChanges != null
    ) {
      this.isAuditUserStateChangesEnabled = this.isAuditOptionEnabled(
        blotter.blotterOptions.auditOptions.auditUserStateChanges
      );
    } else {
      this.isAuditUserStateChangesEnabled = false;
    }

    // Function Events
    if (
      blotter.blotterOptions.auditOptions != null &&
      blotter.blotterOptions.auditOptions.auditFunctionEvents != null
    ) {
      this.isAuditFunctionEventsEnabled = this.isAuditOptionEnabled(
        blotter.blotterOptions.auditOptions.auditFunctionEvents
      );
    } else {
      this.isAuditFunctionEventsEnabled = false;
    }

    // Cell Edit
    if (
      blotter.blotterOptions.auditOptions != null &&
      blotter.blotterOptions.auditOptions.auditCellEdits != null
    ) {
      this.isAuditCellEditsEnabled = this.isAuditOptionEnabled(
        blotter.blotterOptions.auditOptions.auditCellEdits
      );
    } else {
      this.isAuditCellEditsEnabled = false;
    }

    // Log State
    this.isAuditStateChangesEnabled =
      this.isAuditInternalStateChangesEnabled || this.isAuditUserStateChangesEnabled;

    // General Audit Flag
    this.isAuditEnabled =
      this.isAuditStateChangesEnabled ||
      this.isAuditFunctionEventsEnabled ||
      this.isAuditCellEditsEnabled;

    // set up the Audit Queue if any of the Audits is set to use HTTP Channel
    if (this.isAuditEnabled) {
      if (blotter.blotterOptions.auditOptions != undefined) {
        if (this.shouldAuditToHttpChannel(blotter.blotterOptions.auditOptions)) {
          if (
            blotter.blotterOptions.auditOptions.pingInterval != undefined &&
            blotter.blotterOptions.auditOptions.auditLogsSendInterval != undefined
          ) {
            this.ping();
            setInterval(() => this.ping(), blotter.blotterOptions.auditOptions.pingInterval * 1000);
            setInterval(
              () => this.flushAuditQueue(),
              blotter.blotterOptions.auditOptions.auditLogsSendInterval * 1000
            );
          }
        }
      }
    }
  }

  public addEditCellAuditLogBatch(dataChangedEvents: IDataChangedInfo[]) {
    dataChangedEvents.forEach(dce => {
      this.addEditCellAuditLog(dce);
    });
  }

  public addEditCellAuditLog(dataChangedEvent: IDataChangedInfo) {
    if (this.isAuditCellEditsEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.CellEdit,
        client_timestamp: new Date(),
        username: this.blotter.blotterOptions.userName!,
        blotter_id: this.blotter.blotterOptions.blotterId!,
        cell_edit_details: {
          primarykey_column_value: String(dataChangedEvent.IdentifierValue),
          primarykey_column_id: this.blotter.blotterOptions.primaryKey,
          column_id: dataChangedEvent.ColumnId,
          previous_value: String(dataChangedEvent.OldValue),
          new_value: String(dataChangedEvent.NewValue),
        },
      };
      let auditDestinationOptions = this.blotter.blotterOptions.auditOptions!.auditCellEdits!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.CellEdit);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
    }
  }

  public addUserStateChangeAuditLog(stateChangeDetails: StateChangedDetails) {
    if (this.isAuditUserStateChangesEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.UserStateChange,
        client_timestamp: new Date(),
        username: this.blotter.blotterOptions.userName!,
        blotter_id: this.blotter.blotterOptions.blotterId!,
        state_change_details: stateChangeDetails,
      };
      let auditDestinationOptions = this.blotter.blotterOptions.auditOptions!
        .auditUserStateChanges!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.UserStateChange);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
    }
  }
  public addInternalStateChangeAuditLog(stateChangeDetails: StateChangedDetails) {
    if (this.isAuditInternalStateChangesEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.InternalStateChange,
        client_timestamp: new Date(),
        username: this.blotter.blotterOptions.userName!,
        blotter_id: this.blotter.blotterOptions.blotterId!,
        state_change_details: stateChangeDetails,
      };
      let auditDestinationOptions = this.blotter.blotterOptions.auditOptions!
        .auditInternalStateChanges!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.InternalStateChange);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
    }
  }

  public addFunctionAppliedAuditLog(functionAppliedDetails: FunctionAppliedDetails) {
    if (this.isAuditFunctionEventsEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.FunctionApplied,
        client_timestamp: new Date(),
        username: this.blotter.blotterOptions.userName!,
        blotter_id: this.blotter.blotterOptions.blotterId!,
        function_applied_details: functionAppliedDetails,
        //  adaptableblotter_function: {
        //   name: functionName,
        //   action: action,
        //   info: info,
        //not sure if it's best to leave undefined or null.... I think null is better
        //same as adaptableblotter_state_change we log the obj as a string
        //   data: data ? this.convertAuditMessageToText(data) : null,
        // },
      };
      let auditDestinationOptions = this.blotter.blotterOptions.auditOptions!.auditFunctionEvents!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.FunctionApplied);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
    }
  }

  private ping() {
    let pingMessage: AuditLogEntry = {
      auditlog_type: AuditLogType.Ping,
      client_timestamp: new Date(),
      username: this.blotter.blotterOptions.userName,
      blotter_id: this.blotter.blotterOptions.blotterId,
      number_of_missed_ping: this.numberOfMissedPing,
    };
    let xhr = new XMLHttpRequest();
    xhr.onerror = (ev: any) => {
      LoggingHelper.LogAdaptableBlotterError('error sending ping: ' + ev.message);
      this.SetCanSendLog(false);
    };
    xhr.ontimeout = (ev: ProgressEvent) => {
      LoggingHelper.LogAdaptableBlotterError('timeout sending ping');
      this.SetCanSendLog(false);
    };
    xhr.onload = (ev: ProgressEvent) => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          this.SetCanSendLog(true);
        } else {
          LoggingHelper.LogAdaptableBlotterError('error sending ping: ' + xhr.statusText);
          this.SetCanSendLog(false);
        }
      }
    };
    var url = '/auditlog';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(pingMessage));
  }

  private SetCanSendLog(enable: boolean) {
    if (enable) {
      this.canSendLog = true;
      this.numberOfMissedPing = 0;
    } else {
      this.canSendLog = false;
      this.numberOfMissedPing++;
    }
  }

  private flushAuditQueue() {
    //if we cannot send logs then we just clear the thing
    if (!this.canSendLog) {
      this.auditLogQueue.length = 0;
    }

    let obj = this.auditLogQueue.shift();
    // while (obj && this.sockJS.readyState == SockJS.OPEN) {
    while (obj) {
      let xhr = new XMLHttpRequest();
      xhr.onerror = (ev: any) =>
        LoggingHelper.LogAdaptableBlotterError('error sending AuditLog: ' + ev.message);
      xhr.ontimeout = (pe: ProgressEvent) =>
        LoggingHelper.LogAdaptableBlotterError('timeout sending AuditLog');
      xhr.onload = (pe: ProgressEvent) => {
        if (xhr.readyState == 4) {
          if (xhr.status != 200) {
            LoggingHelper.LogAdaptableBlotterError('error sending AuditLog: ' + xhr.statusText);
          }
        }
      };
      var url = '/auditlog';
      //we make the request async
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.send(JSON.stringify(obj));
      obj = this.auditLogQueue.shift();
    }
  }

  public convertAuditMessageToText(obj: any): string {
    let stringArray: string[] = [];

    if (obj == undefined) {
      return String(obj);
    } else if (Array.isArray(obj)) {
      for (let prop in obj) {
        stringArray.push(this.convertAuditMessageToText(obj[prop]));
      }
      return '[' + stringArray.join(',') + ']';
    }
    if (typeof obj == 'object') {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          stringArray.push(prop + ': ' + this.convertAuditMessageToText(obj[prop]));
        }
      }
      return '{' + stringArray.join(',') + '}';
      //is function
    } else if (typeof obj == 'function') {
      stringArray.push(obj.toString());
    } else {
      stringArray.push(String(obj));
    }

    return stringArray.join(',');
  }

  private isAuditOptionEnabled(auditDestinationOptions: AuditDestinationOptions): boolean {
    return (
      auditDestinationOptions.auditAsEvent ||
      auditDestinationOptions.auditToConsole ||
      auditDestinationOptions.auditToHttpChannel
    );
  }

  private shouldAuditToHttpChannel(auditLogOptions: AuditOptions | undefined): boolean {
    if (auditLogOptions) {
      if (auditLogOptions.auditCellEdits) {
        if (auditLogOptions.auditCellEdits.auditToHttpChannel) {
          return true;
        }
      }
      if (auditLogOptions.auditFunctionEvents) {
        if (auditLogOptions.auditFunctionEvents.auditToHttpChannel) {
          return true;
        }
      }
      if (auditLogOptions.auditInternalStateChanges) {
        if (auditLogOptions.auditInternalStateChanges.auditToHttpChannel) {
          return true;
        }
      }
      if (auditLogOptions.auditUserStateChanges) {
        if (auditLogOptions.auditUserStateChanges.auditToHttpChannel) {
          return true;
        }
      }
    }
    return false;
  }

  // not sure this is best place to put this but it shouldnt be in Strategy Base
  publishStateChanged(auditLogEntry: AuditLogEntry, auditLogType: AuditLogType): void {
    let stateEventData: AuditLogEventData = {
      name: 'Adaptable Blotter',
      type: 'Audit Log Event',
      id: auditLogEntry,
    };

    let stateChangedArgs: AuditLogEventArgs = {
      object: 'fdc3-context',
      definition: 'https://fdc3.org/context/1.0.0/',
      version: '1.0.0',
      data: [stateEventData],
    };

    switch (auditLogType) {
      case AuditLogType.CellEdit:
        this.blotter.api.auditEventApi._onAuditCellEdited.Dispatch(this.blotter, stateChangedArgs);
        break;
      case AuditLogType.FunctionApplied:
        this.blotter.api.auditEventApi._onAuditFunctionApplied.Dispatch(
          this.blotter,
          stateChangedArgs
        );
        break;
      case AuditLogType.InternalStateChange:
      case AuditLogType.UserStateChange:
        this.blotter.api.auditEventApi._onAuditStateChanged.Dispatch(
          this.blotter,
          stateChangedArgs
        );
        break;
    }
  }
}
