import {
  CellEditDetails,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';

export enum AuditLogType {
  CellEdit = 'Cell Edit',
  UserStateChange = 'User State Change',
  InternalStateChange = 'Internal State Change',
  FunctionApplied = 'Function Applied',
  Ping = 'Ping',
}

export interface AuditLogEntry {
  auditlog_type: AuditLogType;
  client_timestamp: Date;
  username: string;
  blotter_id: string;
  cell_edit_details?: CellEditDetails;
  function_applied_details?: FunctionAppliedDetails;
  state_change_details?: StateChangedDetails;
  number_of_missed_ping?: number;
}
