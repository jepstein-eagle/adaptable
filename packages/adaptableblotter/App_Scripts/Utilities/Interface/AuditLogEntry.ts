import {
  DataChangedDetails,
  FunctionAppliedDetails,
  StateChangedDetails,
} from '../../Api/Events/AuditEvents';
import { DataChangedInfo } from './DataChangedInfo';

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
  cell_edit_details?: DataChangedDetails;
  function_applied_details?: FunctionAppliedDetails;
  state_change_details?: StateChangedDetails;
  ticking_data_change_details?: DataChangedDetails;
  number_of_missed_ping?: number;
}
