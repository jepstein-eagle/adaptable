
export interface IAuditLogEntry {
    adaptableblotter_auditlog_trigger: string
    adaptableblotter_client_timestamp: Date
    adaptableblotter_username: string
    adaptableblotter_id: string
    adaptableblotter_editcell?: {
        primarykey: string
        primarykey_column_id: string
        column_id: string
        previous_value: string
        new_value: string
    }
    adaptableblotter_function?: {
        name: string
        action: string
        info: string
        data: any
    }
    adaptableblotter_state_change?: string
    adaptableblotter_state_change_action? : string
    adaptableblotter_number_of_missed_ping?: number
}
