import {
  DataChangedDetails,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';

export enum AuditTrigger {
  CellEdit = 'Cell Edit',
  UserStateChange = 'User State Change',
  InternalStateChange = 'Internal State Change',
  FunctionApplied = 'Function Applied',
  TickingDataUpdate = 'Ticking Data Update',
  Ping = 'Ping',
}

export interface AuditLogEntry {
  audit_trigger: AuditTrigger;
  client_timestamp: Date;
  username: string;
  adaptable_id: string;
  function_applied_details?: FunctionAppliedDetails;
  state_change_details?: StateChangedDetails;
  data_change_details?: DataChangedDetails;
  number_of_missed_ping?: number;
}
