import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { StateChangedDetails, FunctionAppliedDetails } from '../../../Api/Events/AuditEvents';

export interface IAuditLogService {
  addEditCellAuditLogBatch(dataChangedEvents: DataChangedInfo[]): void;
  addEditCellAuditLog(dataChangedEvent: DataChangedInfo): void;
  addUserStateChangeAuditLog(stateChangeDetails: StateChangedDetails): void;
  addInternalStateChangeAuditLog(stateChangeDetails: StateChangedDetails): void;
  addFunctionAppliedAuditLog(functionAppliedDetails: FunctionAppliedDetails): void;
  convertAuditMessageToText(obj: any): string; // needed?

  isAuditEnabled: boolean;
  isAuditStateChangesEnabled: boolean;
  isAuditCellEditsEnabled: boolean;
  isAuditFunctionEventsEnabled: boolean;
  isAuditUserStateChangesEnabled: boolean;
  isAuditInternalStateChangesEnabled: boolean;
}
