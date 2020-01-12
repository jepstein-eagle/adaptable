import { LoggingHelper } from '../Helpers/LoggingHelper';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AuditLogEntry, AuditLogType } from '../Interface/AuditLogEntry';
import { IAuditLogService } from './Interface/IAuditLogService';
import { IAdaptable } from '../../types';
import {
  StateChangedDetails,
  FunctionAppliedDetails,
  AuditLogEventData,
  AuditLogEventArgs,
} from '../../Api/Events/AuditEvents';
import { AuditDestinationOptions, AuditOptions } from '../../AdaptableOptions/AuditOptions';
import { AdaptableAlert } from '../Interface/IMessage';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import ColumnHelper from '../Helpers/ColumnHelper';
import ObjectFactory from '../ObjectFactory';
import AdaptableHelper from '../Helpers/AdaptableHelper';

export class AuditLogService implements IAuditLogService {
  private auditLogQueue: Array<AuditLogEntry>;
  private canSendLog: boolean = true;
  private numberOfMissedPing: number = 0;
  private adaptable: IAdaptable;

  public isAuditEnabled: boolean;
  public isAuditStateChangesEnabled: boolean;
  public isAuditCellEditsEnabled: boolean;
  public isAuditFunctionEventsEnabled: boolean;
  public isAuditUserStateChangesEnabled: boolean;
  public isAuditInternalStateChangesEnabled: boolean;
  public isAuditTickingDataChangesEnabled: boolean;

  constructor(adaptable: IAdaptable) {
    this.auditLogQueue = [];
    this.adaptable = adaptable;

    // Internal State
    if (
      adaptable.adaptableOptions.auditOptions != null &&
      adaptable.adaptableOptions.auditOptions.auditInternalStateChanges != null
    ) {
      this.isAuditInternalStateChangesEnabled = this.isAuditOptionEnabled(
        adaptable.adaptableOptions.auditOptions.auditInternalStateChanges
      );
    } else {
      this.isAuditInternalStateChangesEnabled = false;
    }

    // User State
    if (
      adaptable.adaptableOptions.auditOptions != null &&
      adaptable.adaptableOptions.auditOptions.auditUserStateChanges != null
    ) {
      this.isAuditUserStateChangesEnabled = this.isAuditOptionEnabled(
        adaptable.adaptableOptions.auditOptions.auditUserStateChanges
      );
    } else {
      this.isAuditUserStateChangesEnabled = false;
    }

    // Function Events
    if (
      adaptable.adaptableOptions.auditOptions != null &&
      adaptable.adaptableOptions.auditOptions.auditFunctionEvents != null
    ) {
      this.isAuditFunctionEventsEnabled = this.isAuditOptionEnabled(
        adaptable.adaptableOptions.auditOptions.auditFunctionEvents
      );
    } else {
      this.isAuditFunctionEventsEnabled = false;
    }

    // Cell Edit
    if (
      adaptable.adaptableOptions.auditOptions != null &&
      adaptable.adaptableOptions.auditOptions.auditCellEdits != null
    ) {
      this.isAuditCellEditsEnabled = this.isAuditOptionEnabled(
        adaptable.adaptableOptions.auditOptions.auditCellEdits
      );
    } else {
      this.isAuditCellEditsEnabled = false;
    }

    // Ticking Data Changes
    if (
      adaptable.adaptableOptions.auditOptions != null &&
      adaptable.adaptableOptions.auditOptions.auditTickingDataChanges != null
    ) {
      this.isAuditTickingDataChangesEnabled = this.isAuditOptionEnabled(
        adaptable.adaptableOptions.auditOptions.auditTickingDataChanges
      );
    } else {
      this.isAuditTickingDataChangesEnabled = false;
    }

    // Log State
    this.isAuditStateChangesEnabled =
      this.isAuditInternalStateChangesEnabled || this.isAuditUserStateChangesEnabled;

    // General Audit Flag
    this.isAuditEnabled =
      this.isAuditStateChangesEnabled ||
      this.isAuditFunctionEventsEnabled ||
      this.isAuditCellEditsEnabled;

    // set up the listener if we are auditing Data Changes
    if (this.isAuditTickingDataChangesEnabled) {
      this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
        this.handleDataSourceChanged(dataChangedInfo);
      });
    }

    // set up the Audit Queue if any of the Audits is set to use HTTP Channel
    if (this.isAuditEnabled) {
      if (adaptable.adaptableOptions.auditOptions != undefined) {
        if (this.shouldAuditToHttpChannel(adaptable.adaptableOptions.auditOptions)) {
          if (
            adaptable.adaptableOptions.auditOptions.pingInterval != undefined &&
            adaptable.adaptableOptions.auditOptions.auditLogsSendInterval != undefined
          ) {
            this.ping();
            setInterval(
              () => this.ping(),
              adaptable.adaptableOptions.auditOptions.pingInterval * 1000
            );
            setInterval(
              () => this.flushAuditQueue(),
              adaptable.adaptableOptions.auditOptions.auditLogsSendInterval * 1000
            );
          }
        }
      }
    }
  }

  public addEditCellAuditLog(dataChangedInfo: DataChangedInfo) {
    if (this.isAuditCellEditsEnabled) {
      let auditLogEntry = this.createAuditLogEntryFromDataChangedInfo(
        dataChangedInfo,
        AuditLogType.CellEdit
      );
      let auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions!.auditCellEdits!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.CellEdit);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsAlert) {
        let message: string =
          'Column: ' +
          ColumnHelper.getFriendlyNameFromColumnId(
            dataChangedInfo.ColumnId,
            this.adaptable.api.gridApi.getColumns()
          ) +
          '.  Identifier: ' +
          dataChangedInfo.PrimaryKeyValue +
          '.  Old Value: ' +
          dataChangedInfo.OldValue +
          '.  New Value: ' +
          dataChangedInfo.NewValue;
        this.showAlert('Data Changed', message);
      }
    }
  }

  public addUserStateChangeAuditLog(stateChangeDetails: StateChangedDetails) {
    if (this.isAuditUserStateChangesEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.UserStateChange,
        client_timestamp: new Date(),
        username: this.adaptable.adaptableOptions.userName!,
        adaptable_id: this.adaptable.adaptableOptions.adaptableId!,
        state_change_details: stateChangeDetails,
      };
      let auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions!
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
      if (auditDestinationOptions.auditAsAlert) {
        let message: string = 'Action: ' + stateChangeDetails.actionType;
        this.showAlert(stateChangeDetails.name + ' StateChange', message);
      }
    }
  }
  public addInternalStateChangeAuditLog(stateChangeDetails: StateChangedDetails) {
    if (this.isAuditInternalStateChangesEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.InternalStateChange,
        client_timestamp: new Date(),
        username: this.adaptable.adaptableOptions.userName!,
        adaptable_id: this.adaptable.adaptableOptions.adaptableId!,
        state_change_details: stateChangeDetails,
      };
      let auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions!
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
      if (auditDestinationOptions.auditAsAlert) {
        let message: string = 'Action: ' + stateChangeDetails.actionType;
        this.showAlert(stateChangeDetails.name + ' StateChange', message);
      }
    }
  }

  public addFunctionAppliedAuditLog(functionAppliedDetails: FunctionAppliedDetails) {
    if (this.isAuditFunctionEventsEnabled) {
      let auditLogEntry: AuditLogEntry = {
        auditlog_type: AuditLogType.FunctionApplied,
        client_timestamp: new Date(),
        username: this.adaptable.adaptableOptions.userName!,
        adaptable_id: this.adaptable.adaptableOptions.adaptableId!,
        function_applied_details: functionAppliedDetails,
      };
      let auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions!
        .auditFunctionEvents!;

      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.FunctionApplied);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsAlert) {
        let message: string =
          'Action: ' + functionAppliedDetails.action + '.  Details: ' + functionAppliedDetails.info;
        this.showAlert(functionAppliedDetails.name + ' Function Applied', message);
      }
    }
  }

  private handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    if (this.isAuditTickingDataChangesEnabled) {
      let auditLogEntry = this.createAuditLogEntryFromDataChangedInfo(
        dataChangedInfo,
        AuditLogType.TickingDataChange
      );

      let auditDestinationOptions = this.adaptable.adaptableOptions.auditOptions!
        .auditTickingDataChanges!;
      if (auditDestinationOptions.auditToConsole) {
        LoggingHelper.LogObject(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsEvent) {
        this.publishStateChanged(auditLogEntry, AuditLogType.FunctionApplied);
      }
      if (auditDestinationOptions.auditToHttpChannel) {
        this.auditLogQueue.push(auditLogEntry);
      }
      if (auditDestinationOptions.auditAsAlert) {
        let message: string =
          'Column: ' +
          ColumnHelper.getFriendlyNameFromColumnId(
            dataChangedInfo.ColumnId,
            this.adaptable.api.gridApi.getColumns()
          ) +
          '.  Identifier: ' +
          dataChangedInfo.PrimaryKeyValue +
          '.  Old Value: ' +
          dataChangedInfo.OldValue +
          '.  New Value: ' +
          dataChangedInfo.NewValue;
        this.showAlert('Data Changed', message);
      }
    }
  }

  private createAuditLogEntryFromDataChangedInfo(
    dataChangedInfo: DataChangedInfo,
    auditLogType: AuditLogType
  ): AuditLogEntry {
    return {
      auditlog_type: auditLogType,
      client_timestamp: new Date(),
      username: this.adaptable.adaptableOptions.userName!,
      adaptable_id: this.adaptable.adaptableOptions.adaptableId!,
      data_change_details: {
        primarykey_column_value: String(dataChangedInfo.PrimaryKeyValue),
        primarykey_column_id: this.adaptable.adaptableOptions.primaryKey,
        column_id: dataChangedInfo.ColumnId,
        previous_value: String(dataChangedInfo.OldValue),
        new_value: String(dataChangedInfo.NewValue),
        row_data: this.adaptable.getDataRowFromRowNode(dataChangedInfo.RowNode),
      },
    };
  }

  private ping() {
    let pingMessage: AuditLogEntry = {
      auditlog_type: AuditLogType.Ping,
      client_timestamp: new Date(),
      username: this.adaptable.adaptableOptions.userName,
      adaptable_id: this.adaptable.adaptableOptions.adaptableId,
      number_of_missed_ping: this.numberOfMissedPing,
    };
    let xhr = new XMLHttpRequest();
    xhr.onerror = (ev: any) => {
      LoggingHelper.LogAdaptableError('error sending ping: ' + ev.message);
      this.SetCanSendLog(false);
    };
    xhr.ontimeout = (ev: ProgressEvent) => {
      LoggingHelper.LogAdaptableError('timeout sending ping');
      this.SetCanSendLog(false);
    };
    xhr.onload = (ev: ProgressEvent) => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          this.SetCanSendLog(true);
        } else {
          LoggingHelper.LogAdaptableError('error sending ping: ' + xhr.statusText);
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
        LoggingHelper.LogAdaptableError('error sending AuditLog: ' + ev.message);
      xhr.ontimeout = (pe: ProgressEvent) =>
        LoggingHelper.LogAdaptableError('timeout sending AuditLog');
      xhr.onload = (pe: ProgressEvent) => {
        if (xhr.readyState == 4) {
          if (xhr.status != 200) {
            LoggingHelper.LogAdaptableError('error sending AuditLog: ' + xhr.statusText);
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
      auditDestinationOptions.auditToHttpChannel ||
      auditDestinationOptions.auditAsAlert
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

  showAlert(header: string, message: string) {
    let alert: AdaptableAlert = {
      Header: header,
      Msg: message,
      AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
        MessageType.Error,
        this.adaptable.adaptableOptions.auditOptions!.alertShowAsPopup as boolean
      ),
    };
    this.adaptable.api.alertApi.displayAlert(alert);
  }

  publishStateChanged(auditLogEntry: AuditLogEntry, auditLogType: AuditLogType): void {
    const stateChangedArgs: AuditLogEventArgs = AdaptableHelper.createFDC3Message(
      'Audit Log Event',
      auditLogEntry
    );

    switch (auditLogType) {
      case AuditLogType.CellEdit:
        this.adaptable.api.auditEventApi.emit('AuditCellEdited', stateChangedArgs);
        break;
      case AuditLogType.FunctionApplied:
        this.adaptable.api.auditEventApi.emit('AuditFunctionApplied', stateChangedArgs);
        break;
      case AuditLogType.InternalStateChange:
      case AuditLogType.UserStateChange:
        this.adaptable.api.auditEventApi.emit('AuditStateChanged', stateChangedArgs);
        break;
    }
  }
}
