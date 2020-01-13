import { DataChangedInfo } from '../../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { StateChangedDetails, FunctionAppliedDetails } from '../../../Api/Events/AuditEvents';

export interface IAuditLogService {
  addEditCellAuditLog(dataChangedEvent: DataChangedInfo): void;
  addUserStateChangeAuditLog(stateChangeDetails: StateChangedDetails): void;
  addInternalStateChangeAuditLog(stateChangeDetails: StateChangedDetails): void;
  addFunctionAppliedAuditLog(functionAppliedDetails: FunctionAppliedDetails): void;
  convertAuditMessageToText(obj: any): string; // needed?

  isAuditEnabled: boolean;
  isAuditStateChangesEnabled: boolean;
  isAuditCellEditsEnabled: boolean;
  isAuditTickingDataUpdatesEnabled: boolean;
  isAuditFunctionEventsEnabled: boolean;
  isAuditUserStateChangesEnabled: boolean;
  isAuditInternalStateChangesEnabled: boolean;
}
