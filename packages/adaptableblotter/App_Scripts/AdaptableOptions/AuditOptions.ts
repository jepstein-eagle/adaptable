/**
 * Options for managing Audit Log.
 *
 * ​​**Note: Adaptable has no knowledge of which messages Audit Log is given and where they are sent.**
 *
 * And it has no ability to access this data: any data sent to the Audit Log is known only to our users, and is accessible only by them.​​
 *
 * Each Audit event can be:
 *
 * - published to an HTTP stream
 *
 * - logged to the Console
 *
 * - fired as an Audit Event
 *
 * - shown as an Alert
 *
 * (or any combination thereof).
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
 *    auditAsAlert: true,
 *  },
 *  auditInternalStateChanges: {
 *    auditAsEvent: true,
 *  },
 *  auditUserStateChanges: {
 *    auditAsEvent: true,
 *    auditToHttpChannel: true,
 *  },
 * auditTickingDataChanges:{
 *    auditToConsole: true,
 * }
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
   * **Default Value: all destinations are false**
   */
  auditCellEdits?: AuditDestinationOptions;

  /**
   * Whether to audit function events in Adaptable.
   *
   * These are events that happen when a Function does something (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)
   *
   * **Default Value: all destinations are false**
   */
  auditFunctionEvents?: AuditDestinationOptions;

  /**
   * Whether or not to audit all changes to the User State.
   *
   * Includes any objects (e.g. Conditional Styles) created, edited or deleted.
   *
   * **Default Value: all destinations are false**
   */
  auditUserStateChanges?: AuditDestinationOptions;

  /**
   * Whether to audit changes to the Adaptable's *internal* state.
   *
   * Includes things like which popups are active, what are the selected cells etc.
   *
   * Can potentially be very verbose so use sparingly if required.
   *
   * **Default Value: all destinations are false**
   */
  auditInternalStateChanges?: AuditDestinationOptions;

  /**
   * Whether or not to audit changes to underlying Grid data (i.e. those not caused by a user edit)
   *
   * Note: The Adaptable is NOT a ticking database so  **this option should be used sparingly if you have very high-frequency ticking data**.
   *
   * The primary use case is where data changes rarely in the underlying data set but the user wishes to be notified (presumably) by Alert when that does happen.
   *
   * **Default Value: all destinations are false**
   */
  auditTickingDataChanges?: AuditDestinationOptions;

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

  /**
   * What Message Type any alerts sent should be.
   *
   * This is only used when sending Audit messages as Alerts
   */
  alertMessageType?: 'Success' | 'Info' | 'Warning' | 'Error';

  /**
   * Whether the Alert will show as a popup.
   *
   * This is only used when sending Audit messages as Alerts
   */
  alertShowAsPopup?: boolean;
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
   * You listen to this Event the same way that you do all other Adaptable events.
   *
   * **Default Value: false**
   */
  auditAsEvent?: boolean;

  /**
   * Fires the Audit Message as an Alert.
   *
   * This Alert will appear in the Alert toolbar and, optionally, also as a popup (based on the value of the *alertShowAsPopup* property).
   *
   * **Default Value: false**
   */
  auditAsAlert?: boolean;
}
