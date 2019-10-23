import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { IAdaptableBlotter } from '../../types';
import { AuditLogEventArgs } from '../Events/AuditEvents';
import { IEvent } from '../../Utilities/Interface/IEvent';

/**
 * The Adaptable Blotter publishes 3 Audit Events that users can subscribe to as needed.
 *
 * - **onAuditStateChanged**: fired when the Internal or User state of the Application has changed
 *
 * - **onAuditCellEdited**: fired when a cell has been edited by the user
 *
 * - **onAuditFunctionApplied**: fired when a Function has been run
 *
 * **These events are only fired if the Audit Options have been configured with the property *auditAsEvent* set to true**
 */
export interface IAuditEventApi {
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
}
