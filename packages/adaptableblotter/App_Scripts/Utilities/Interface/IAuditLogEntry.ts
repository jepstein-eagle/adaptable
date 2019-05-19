import { ICellEditDetails, IFunctionAppliedDetails, IStateChangedDetails } from './IAuditEvents';

export interface IAuditLogEntry {
  auditlog_trigger: string;
  client_timestamp: Date;
  username: string;
  blotter_id: string;
  cell_edit_details?: ICellEditDetails;
  function_applied_details?: IFunctionAppliedDetails;
  state_change_details?: IStateChangedDetails;
  number_of_missed_ping?: number;
}
