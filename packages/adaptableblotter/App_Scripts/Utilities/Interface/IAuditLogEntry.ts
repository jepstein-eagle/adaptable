import { ICellEditDetails, IFunctionAppliedDetails, IStateChangedDetails } from './IAuditEvents';

export enum AuditLogType {
  CellEdit = 'Cell Edit',
  UserStateChange = 'User State Change',
  InternalStateChange = 'Internal State Change',
  FunctionApplied = 'Function Applied',
  Ping = 'Ping',
}

export interface IAuditLogEntry {
  auditlog_type: AuditLogType;
  client_timestamp: Date;
  username: string;
  blotter_id: string;
  cell_edit_details?: ICellEditDetails;
  function_applied_details?: IFunctionAppliedDetails;
  state_change_details?: IStateChangedDetails;
  number_of_missed_ping?: number;
}
