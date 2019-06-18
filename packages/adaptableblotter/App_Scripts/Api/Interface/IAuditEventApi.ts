import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { IAdaptableBlotter } from '../../types';
import { AuditLogEventArgs } from '../Events/AuditEvents';
import { IEvent } from '../../Utilities/Interface/IEvent';

export interface IAuditEventApi {
  /**
   * The Adaptable Blotter publishes 3 Audit Events that users can subscribe to as needed.
   *
   * This is an elment of the **Audit Log**
   */

  _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever the Redux state changes.
   *
   * This can be configured to fire for User State changes, Internal State changes or both.
   */
  onAuditStateChanged(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever a cell is edited in the Blotter.
   *
   * It does **not** fire if the data ticks outside of user actiion in the Grid.
   */
  onAuditCellEdited(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;

  /**
   * Fired whenever a function is directly applied by a User.
   *
   * For example its fired when a Smart Edit or Quick Search is performed or an Export takes place.
   */
  onAuditFunctionApplied(): IEvent<IAdaptableBlotter, AuditLogEventArgs>;
}
