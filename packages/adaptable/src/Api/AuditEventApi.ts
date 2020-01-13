import { AuditLogEventArgs } from './Events/AuditEvents';

/**
 * AdapTable publishes 4 Audit Events that users can subscribe to as needed.
 *
 * - **AuditStateChanged**: fired when the Internal or User state of the Application has changed
 *
 * - **AuditCellEdited**: fired when a cell has been edited by the user
 *
 * - **AuditFunctionApplied**: fired when an AdapTable Function has been run
 *
 * - **AuditTickingDataUpdated**: fired when data in the grid changes as result of external action
 *
 * These events are **only fired if the Audit Log** has been configured with the property *auditAsEvent* set to **true** in [Audit Options](_adaptableOptions_auditoptions_.auditoptions.html).
 *
 *  AdapTable uses **FDC3 Standard for messaging** so to get the full audit data, you will need to access the auditLogEventArgs.data[0].id property e.g.:
 *
 *  ```ts
 *  const auditLogEntry: AuditLogEntry = auditLogEventArgs.data[0].id
 *  ```
 *
 * The way to listen to the Audit Event is as follows:
 *
 *  ```ts
 * adaptableApi.auditEventApi.on('AuditCellEdited', auditLogEventArgs => {
 *        // listen to audit event as required
 *        const auditLogEntry: AuditLogEntry = auditLogEventArgs.data[0].id
 *    }
 *  );
 * ```
 *
 */
export interface AuditEventApi {
  /**
   * Fired whenever the Redux state changes.
   *
   * This can be configured in **AuditOptions** to fire for User State changes, Internal State changes or both.
   */
  on(
    eventName: 'AuditStateChanged',
    callback: (auditStateChangedArgs: AuditLogEventArgs) => void
  ): () => void;

  /**
   * Fired whenever a cell is edited in AdapTable.
   *
   * It does **not** fire if the data changes outside of direct user action in the Grid (e.g. for ticking data)
   *
   * N.B. You are able to listen to ticking data changes via **other Audit options**
   */
  on(
    eventName: 'AuditCellEdited',
    callback: (auditLogEventArgs: AuditLogEventArgs) => void
  ): () => void;

  /**
   * Fired whenever the data in AdapTable updates as the result of a ticking / external change.
   */
  on(
    eventName: 'AuditTickingDataUpdated',
    callback: (auditLogEventArgs: AuditLogEventArgs) => void
  ): () => void;

  /**
   * Fired whenever a function is directly applied by a User.
   *
   * For example its fired when a Smart Edit or Quick Search is performed or an Export takes place.
   */
  on(
    eventName: 'AuditFunctionApplied',
    callback: (auditLogEventArgs: AuditLogEventArgs) => void
  ): () => void;

  /**
   * The emit function used internally to fire the events
   * @param eventName
   * @param data
   */
  emit(
    eventName:
      | 'AuditStateChanged'
      | 'AuditCellEdited'
      | 'AuditFunctionApplied'
      | 'AuditTickingDataUpdated',
    data?: any
  ): Promise<any>;
}
