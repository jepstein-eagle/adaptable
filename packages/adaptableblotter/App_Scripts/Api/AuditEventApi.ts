import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IAuditEventApi } from './Interface/IAuditEventApi';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { AuditLogEventArgs } from './Events/AuditEvents';

export class AuditEventApi extends ApiBase implements IAuditEventApi {
  public _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  public _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  public _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);
    this._onAuditStateChanged = new EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>();
    this._onAuditCellEdited = new EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>();
    this._onAuditFunctionApplied = new EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>();
  }

  public onAuditStateChanged(): IEvent<IAdaptableBlotter, AuditLogEventArgs> {
    return this._onAuditStateChanged;
  }
  public onAuditCellEdited(): IEvent<IAdaptableBlotter, AuditLogEventArgs> {
    return this._onAuditCellEdited;
  }
  public onAuditFunctionApplied(): IEvent<IAdaptableBlotter, AuditLogEventArgs> {
    return this._onAuditFunctionApplied;
  }
}
