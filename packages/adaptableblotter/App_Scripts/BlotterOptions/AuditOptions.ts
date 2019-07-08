/**
 * Options for managing Audit Log.
 *
 * ​​**Note: Adaptable Blotter has no knowledge of which messages Audit Log is given and where they are sent.**
 *
 * And it has no ability to access this data: any data sent to the Audit Log is known only to our users, and is accessible only by them.​​
 *
 * Each Audit event can be sent to an HTTP stream, the Console or fired as an Audit Event (or any combination thereof).
 *
 * **The default for each option for each Audit Type is false** - meaning that audit is only triggered if you set some values to true.
 *
 * **Advanced Search Predefined Config Example**
 *
 * ```ts
 * auditOptions = {
 *  auditCellEdits: {
 *    auditToHttpChannel: true,
 *  },
 *  auditFunctionEvents: {
 *    auditToConsole: true,
 *  },
 *  auditInternalStateChanges: {
 *    auditAsEvent: true,
 *  },
 *  auditUserStateChanges: {
 *    auditAsEvent: true,
 *    auditToHttpChannel: true,
 *  },
 *  pingInterval: 50,
 *  auditLogsSendInterval: 3,
 *};
 * ```
 */
export interface AuditOptions {
  /**
   * Whether to audit cell edits (changes to cell data directy by user action).
   *
   * These include any edits made to the data in the grid but not outside (e.g. not a ticking stream).
   *
   * **Default Value: false**
   */
  auditCellEdits?: AuditDestinationOptions;

  /**
   * Whether to audit function events in the Blotter.
   *
   * These are events that happen when a Function does something (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)
   *
   * **Default Value: false**
   */
  auditFunctionEvents?: AuditDestinationOptions;

  /**
   * Whether or not to audit all changes to the User State.
   *
   * Includes any objects (e.g. Conditional Styles) created, edited or deleted.
   *
   * **Default Value: false**
   */
  auditUserStateChanges?: AuditDestinationOptions;

  /**
   * Whether to audit changes to the Adaptable Blotter's *internal* state.
   *
   * Includes things like which popups are active, what are the selected cells etc.
   *
   * Can potentially be very verbose so use sparingly if required.
   *
   * **Default Value: false**
   */
  auditInternalStateChanges?: AuditDestinationOptions;

  /**
   * How often (in seconds) the Audit Log should ping to check that the listening service is up and running (if its been set).
   *
   * **Note: the Audit Log will only ping if at least one of the 4 audit options has *auditToHttpChannel* as set to true.**
   *
   * **Default Value: 60**
   */
  pingInterval?: number;

  /**
   * The 'batch' time (in seconds) for pushing Audit Log messages.
   *
   * This is only used if using the HTTP Channel
   *
   * **Default Value: 1**
   */
  auditLogsSendInterval?: number;
}

/**
 * Interface which determines **where** Audit messages get sent.
 *
 * Each property is a boolean (defaulting to false), enabling you to choose more than one option if required.
 */
export interface AuditDestinationOptions {
  /**
   * Sends the Audit Messages to an (internal) HTTP channel for you to listen to.
   *
   * This is the most popular option though requires you to use your internal, listening software (like the Elastic stack) to wire it up.
   *
   * **Default Value: false**
   */
  auditToHttpChannel?: boolean;

  /**
   * Sends the Audit Message to the Console.
   *
   * Primarily used by developers as a useful design-time or debugging tool when building the application.
   *
   * But can also be used by Support when investigating user behaviour or Blotter activity.
   *
   * **Default Value: false**
   */
  auditToConsole?: boolean;

  /**
   * Fires the Audit Message as an Audit Log (AuditLogEventArgs) event.
   *
   * You listen to this Event the same way that you do all other Adaptable Blotter events.
   *
   * **Default Value: false**
   */
  auditAsEvent?: boolean;
}
