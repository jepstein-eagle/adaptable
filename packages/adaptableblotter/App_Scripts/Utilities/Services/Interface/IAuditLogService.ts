import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { IFunctionAppliedDetails, IStateChangedDetails } from '../../Interface/IAuditEvents';

export interface IAuditLogService {
  addEditCellAuditLogBatch(dataChangedEvents: IDataChangedInfo[]): void;
  addEditCellAuditLog(dataChangedEvent: IDataChangedInfo): void;
  addUserStateChangeAuditLog(stateChangeDetails: IStateChangedDetails): void;
  addInternalStateChangeAuditLog(stateChangeDetails: IStateChangedDetails): void;
  addFunctionAppliedAuditLog(functionAppliedDetails: IFunctionAppliedDetails): void;
  convertAuditMessageToText(obj: any): string; // needed?

  isAuditEnabled: boolean;
  isAuditStateChangesEnabled: boolean;
  isAuditCellEditsEnabled: boolean;
  isAuditFunctionEventsEnabled: boolean;
  isAuditUserStateChangesEnabled: boolean;
  isAuditInternalStateChangesEnabled: boolean;
}
