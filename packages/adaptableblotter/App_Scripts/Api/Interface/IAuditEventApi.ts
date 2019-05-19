import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { IAdaptableBlotter } from '../../types';
import { IEvent } from '../../Utilities/Interface/IEvent';
import { IAuditLogEventArgs } from '../../Utilities/Interface/IAuditEvents';

export interface IAuditEventApi {
  _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;

  /**
   * Event fired whenever the state in the Blotter changes
   * Provides full coverage of what triggered the change and the new function state.
   * @returns IEvent<IAdaptableBlotter, IStateChangedEventArgs>
   */
  onAuditStateChanged(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
  onAuditCellEdited(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
  onAuditFunctionApplied(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
}
