/**
 * Options for managing Audit Log
 * ​​Note: Adaptable Blotter has no knowledge of which messages Audit Log is given and where they are sent.
 * And it has no ability to access this data: any data sent to the Audit Log is known only to our users, and is accessible only by them.​​
 * Each Audit event can be sent to an HTTP stream, the Console or fired as an Audit Event (or any combination thereor)
 * The default for each option for each Audit Type is false - meaning that audit is only triggered if you set some values to true
 */
export interface IAuditOptions {
  /**
   * Whether to audit cell edits
   * These include any edits made to the data in the grid but not outside (e.g. not a ticking stream)
   * Default Value: false
   */
  auditCellEdits?: IAuditDestinationOptions;
  /**
   * Whether to audit function events in the Blotter
   * (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)
   */
  auditFunctionEvents?: IAuditDestinationOptions;
  /**
   * Whether to audit all changes to the User State
   * Includes any objects (e.g. Conditional Styles) created, edited or deleted
   * Default Value: false
   */
  auditUserStateChanges?: IAuditDestinationOptions;
  /**
   * Whether to audit changes to the Adaptable Blotter's state
   * Includes things like which popups are active, what are the selected cells
   * Can potentially be very verbose
   * Default Value: false
   */
  auditInternalStateChanges?: IAuditDestinationOptions;
  /**
   * How often (in seconds) the Audit Log should ping to check that the listening service is up and running (if its been set)
   * Note: the Audit Log will only ping if at least one of the 4 audit optios has 'auditToHttpChannel' as set to true
   * Default Value: 60
   */
  pingInterval?: number;
  /**
   * The 'batch' time (in seconds) for pushing Audit Log messages if using the HTTP Channel
   * Default Value: 1
   */
  auditLogsSendInterval?: number;
}

/**
 * Interface which determines WHERE Audit messages get sent.
 * Each property is a boolean (defaulting to false), enabling you to choose more than one option
 */
export interface IAuditDestinationOptions {
  /**
   * Sends the Audit Messages to an (internal) HTTP channel for you to listen to
   * This is the most popular option though requires additional software like Elastic
   */
  auditToHttpChannel?: boolean;
  /**
   * Sends the Audit Message to the Console
   * Primarily used by Devs as a useful tool when building the app or by Support who are investigating user behaviour
   */
  auditToConsole?: boolean;
  /**
   * Fires the Audit Message as an Audit Log (IAuditLogEventArgs) event
   * You listen to this Event the same way that you would all other Adaptable Blotter events
   */
  auditAsEvent?: boolean;
}
