import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { IAdaptableBlotter } from '../../types';
import { IEvent } from '../../Utilities/Interface/IEvent';
import { IAuditLogEventArgs } from '../../Utilities/Interface/IAuditEvents';

export interface IAuditEventApi {
  _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;

  onAuditStateChanged(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
  onAuditCellEdited(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
  onAuditFunctionApplied(): IEvent<IAdaptableBlotter, IAuditLogEventArgs>;
}
