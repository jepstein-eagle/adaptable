import { EventDispatcher } from '../Utilities/EventDispatcher';
import { IAdaptableBlotter } from '../types';
import { AuditLogEventArgs } from './Events/AuditEvents';
import { IEvent } from '../Utilities/Interface/IEvent';
import {
  AUDIT_STATE_CHANGED_EVENT,
  AUDIT_CELL_EDITED_EVENT,
  AUDIT_FUNCTION_APPLIED_EVENT,
} from '../Utilities/Constants/GeneralConstants';

/**
 * The Adaptable Blotter publishes 3 Audit Events that users can subscribe to as needed.
 *
 * - **AuditStateChanged**: fired when the Internal or User state of the Application has changed
 *
 * - **AuditCellEdited**: fired when a cell has been edited by the user
 *
 * - **AuditFunctionApplied**: fired when a Function has been run
 *
 * These events are **only fired if the Audit Log** has been configured with the property *auditAsEvent* set to **true** in [Audit Options](_blotteroptions_auditoptions_.auditoptions.html).
 *
 * The preferred way is as follows:
 *
 *  ```ts
 * adaptableblotter.api.auditEventApi
 *    .on('AuditCellEdited', auditLogEventArgs => {
 *        // listen to audit event as required
 *    }
 *  );
 * ```
 *
 */
export interface AuditEventApi {
  _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever the Redux state changes.
   *
   * This can be configured in **AuditOptions** to fire for User State changes, Internal State changes or both.
   */
  onAuditStateChanged(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever a cell is edited in the Blotter.
   *
   * It does **not** fire if the data changes outside of direct user action in the Grid (e.g. for ticking data)
   *
   * N.B. You are able to listen to ticking data changes via **other Audit options**
   */
  onAuditCellEdited(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever a function is directly applied by a User.
   *
   * For example its fired when a Smart Edit or Quick Search is performed or an Export takes place.
   */
  onAuditFunctionApplied(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;

  on(
    eventName: 'AuditStateChanged',
    callback: (auditStateChangedArgs: AuditLogEventArgs) => void
  ): () => void;

  on(
    eventName: 'AuditCellEdited',
    callback: (auditCellEditedArgs: AuditLogEventArgs) => void
  ): () => void;

  on(
    eventName: 'AuditFunctionApplied',
    callback: (auditFunctionAppliedArgs: AuditLogEventArgs) => void
  ): () => void;

  emit(
    eventName: AUDIT_STATE_CHANGED_EVENT | AUDIT_CELL_EDITED_EVENT | AUDIT_FUNCTION_APPLIED_EVENT,
    data?: any
  ): Promise<any>;
}
