/**
 * Options for managing the AdapTable Audit Log.
 *
 * Every single action in AdapTable can, optionally, be fully audited for internal review purposes: each keystroke, menu click, configuration change, data edit and ticking data change.
 *
 * This provides you with complete oversight over everything that ever happens in AdapTable.
 *
 * For instance you can set up an alert to be informed whenever a value changes in a particular column, or if the new value exceeds set limits; or you can run reports showing a particular user's activity, or how data has changed over any time period.
 *
 *  > **Note: AdapTable has no knowledge of the messages Audit Log sends, nor where they are sent.  Information sent to Audit Log lives entirely within your systems at a destination specified by you.**
 *
 * Likewise, AdapTable has no ability to access Audit Log messages: they are only visible to, and accessible by, our users.​​
 *
 * Each Audit Log message is essentially a combination of an `AuditMessage`, an `AuditTrigger` and an `AuditDestination`, packaged as a simple JSON object and sent to destination(s) you specify.
 *
 * There are 5 AuditTriggers and 4 AuditDestinations.
 *
 * You can set as many AuditTriggers as you want, and for each `AuditTrigger`, select as many AuditDestinations as you require.
 *
 * It no AuditTriggers are set, then AuditLog will be turned off.
 *
 * The 5 Audit Triggers are:
 *
 * - **CellEdit**: whenever a cell in AdapTable is changed as a result of user action
 *
 * - **TickingDataUpdate**: whenever the data in AdapTable is updated as a result of external action
 *
 * - **FunctionEvent**: whenever an AdapTable function is run (e.g. Quick Search, Smart Edit, Export etc.)
 *
 * - **UserStateChange**: whenever a change is made to the User's state (e.g. selected a new layout)
 *
 * - **InternalStateChange**: whenever a change is made to AdapTable's internal state (e.g. new cells selected, a popup displayed). Note that this can be quite verbose.
 *
 * The 4 available Audit Destinations are:
 *
 * - **Http Channel**: If you choose this then you need to set up the channel, on which you can subsequently listen to Audit messages using your own internal reporting software (e.g. the Elastic Stack).  You can also, optionally, set the name of the Http Channel (or use the default of '/auditlog').
 *
 * - **Console**: Audits messages to the console - useful for testing, support and debug purposes
 *
 * - **Alert**: If you set this option for any Trigger, then you can should also choose the Type (e.g. 'Success', 'Info' etc) and whether to show it as a Popup.
 *
 * - **Event**: If selected, you will be able to listen to the the `Audit Event` using the {@link AuditEventApi|Audit Event API}
 *
 * **The default for each option for each Audit Type is false** - meaning that audit is **only triggered** if you set at least one destination for one trigger to `true`.
 *
 * **Audit Options Example**
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
 *    auditAsAlert: true,
 *  },
 *  auditUserStateChanges: {
 *    auditAsEvent: true,
 *    auditToHttpChannel: true,
 *    auditAsAlert: true,
 *  },
 * auditTickingDataUpdates:{
 *    auditToConsole: true,
 * }
 *  httpChannel: '/MyChannel',
 *  pingInterval: 120,
 *  auditLogsSendInterval: 3,
 *};
 * ```
 *
 * In this example we have chosen to listen to all 5 of the Audit types (corresponding to each of the Audit Triggers).
 *
 * We have selected different Audit Destinations for each type (sometimes choosing more than one destination).
 *
 * We have also changed the default values so that Audit Log will send messages every 3 seconds, and - when using the Http Channel - will ping to test the connection every 2 minutes, using the the channel name that we provided.
 *
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
   * Whether to audit changes to Adaptable's *internal* state.
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
   * Note: Adaptable is NOT a ticking database so  **this option should be used sparingly if you have very high-frequency ticking data**.
   *
   * The primary use case is where data changes rarely in the underlying data set but the user wishes to be notified (presumably) by Alert when that does happen.
   *
   * **Default Value: all destinations are false**
   */
  auditTickingDataUpdates?: AuditDestinationOptions;

  /**
   *  The name of the channnel to use if auditing to an Http Channel.
   *
   * **Note: the Audit Log will only send audit updates to the Http Channel if one of the 4 audit options has *auditToHttpChannel* as set to true.**
   *
   *  **Default Value: '/auditlog' **
   */
  httpChannel?: string;

  /**
   * How often (in seconds) the Audit Log should ping to check that the Http Channel is up and running (if its been set).
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
   * Sends the Audit Log Message to an (internal) HTTP channel for you to listen to.
   *
   * This is the most popular option, though it requires you to use your internal, listening software (like the Elastic stack) to wire it up.
   *
   * **Default Value: false**
   */
  auditToHttpChannel?: boolean;

  /**
   * Sends the Audit Log Message to the Console.
   *
   * Primarily used by developers as a useful design-time or debugging tool when building the application.
   *
   * But can also be used by Support when investigating user behaviour or Blotter activity.
   *
   * **Default Value: false**
   */
  auditToConsole?: boolean;

  /**
   * Fires the Audit Log Message as an Audit Log (AuditLogEventArgs) event.
   *
   * You listen to this Event the same way that you do all other Adaptable events.
   *
   * **Default Value: false**
   */
  auditAsEvent?: boolean;

  /**
   * Fires the Audit Log Message as an Alert.
   *
   * This Alert will appear in the Alert toolbar and, optionally, also as a popup (based on the value of the *alertShowAsPopup* property).
   *
   * **Default Value: false**
   */
  auditAsAlert?: boolean;
}
