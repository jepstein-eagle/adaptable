import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { StateChangedDetails, FunctionAppliedDetails } from '../../../Api/Events/AuditEvents';

export interface IAuditLogService {
  addEditCellAuditLogBatch(dataChangedEvents: IDataChangedInfo[]): void;
  addEditCellAuditLog(dataChangedEvent: IDataChangedInfo): void;
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
