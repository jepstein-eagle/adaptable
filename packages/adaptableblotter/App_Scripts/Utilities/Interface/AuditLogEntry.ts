import {
  DataChangedDetails,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';

export enum AuditLogType {
  CellEdit = 'Cell Edit',
  UserStateChange = 'User State Change',
  InternalStateChange = 'Internal State Change',
  FunctionApplied = 'Function Applied',
  TickingDataChange = 'Ticking Data Change',
  Ping = 'Ping',
}

export interface AuditLogEntry {
  auditlog_type: AuditLogType;
  client_timestamp: Date;
  username: string;
  blotter_id: string;
  function_applied_details?: FunctionAppliedDetails;
  state_change_details?: StateChangedDetails;
  data_change_details?: DataChangedDetails;
  number_of_missed_ping?: number;
}
