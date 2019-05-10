/**
 * Options for managing Audit Log
 * ​​Note: Adaptable Blotter has no knowledge of which messages Audit Log is given and where they are sent.
 * And it has no ability to access this data: any data sent to the Audit Log is known only to our users, and is accessible only by them.​​
 */
export interface IAuditOptions {
  /**
   * Whether to audit cell edits
   * These include any edits made to the data in the grid but not outside (e.g. not a ticking stream)
   * Default Value: false
   * */
  auditCellEdits?: boolean;
  /**
   * Whether to audit function events in the Blotter
   * (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)
   * Default Value: false
    */
  auditFunctionEvents?: boolean;
  /**
    * Whether to audit all changes to the User State
    * Includes any objects (e.g. Conditional Styles) created, edited or deleted
    * Default Value: false
  */
  auditUserStateChanges?: boolean;
  /**
    * Whether to audit changes to the Adaptable Blotter's state
    * Includes things like which popups are active, what are the selected cells
    * Can potentially be very verbose
    * Default Value: false
  */
  auditInternalStateChanges?: boolean;
  /**
    * How often (in seconds) the Audit Log should ping to check that the listening service is up and running
    * Note: the Audit Log will only ping if at least one of the 4 options above is set to true
    * Default Value: 60
   */
  pingInterval?: number;
  /**
    * The 'batch' time (in seconds) for pushing Audit Log messages
    * Default Value: 1
   */
  auditLogsSendInterval?: number;
  /**
   * Whether to audit to the console or to the HTTP Channel. 
   * HTTP Channel is recommended so that the audit messages can be used in software like the Elastic Stack
   * Default Value: false
   */
  auditToConsole?: boolean;
}
