import { AuditLogTrigger } from '../Enums';

export interface IAuditLogEntry {
    adaptableblotter_auditlog_trigger: string
    adaptableblotter_client_timestamp: Date
    adaptableblotter_username: string
    adaptableblotter_editcell?: {
        primarykey: string
        column_id: string
        old_value_string: string
        new_value_string: string
        old_value_numeric?: number
        new_value_numeric?: number
        old_value_date?: Date
        new_value_date?: Date
        old_value_boolean?: boolean
        new_value_boolean?: boolean
    }
    adaptableblotter_function?: {
        name: string
        action: string
        info: string
        data: any
    }
    adaptableblotter_state_change?: string
    adaptableblotter_number_of_missed_ping?: number
}
