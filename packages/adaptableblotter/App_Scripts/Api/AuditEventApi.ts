import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IAuditEventApi } from './Interface/IAuditEventApi';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { IAuditLogEntry } from '../Utilities/Interface/IAuditLogEntry';
import { IAuditLogEventArgs } from '../Utilities/Interface/IAuditEvents';

export class AuditEventApi extends ApiBase implements IAuditEventApi {
  public _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  public _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;
  public _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);
    this._onAuditStateChanged = new EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>();
    this._onAuditCellEdited = new EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>();
    this._onAuditFunctionApplied = new EventDispatcher<IAdaptableBlotter, IAuditLogEventArgs>();
  }

  public onAuditStateChanged(): IEvent<IAdaptableBlotter, IAuditLogEventArgs> {
    return this._onAuditStateChanged;
  }
  public onAuditCellEdited(): IEvent<IAdaptableBlotter, IAuditLogEventArgs> {
    return this._onAuditCellEdited;
  }
  public onAuditFunctionApplied(): IEvent<IAdaptableBlotter, IAuditLogEventArgs> {
    return this._onAuditFunctionApplied;
  }
}
