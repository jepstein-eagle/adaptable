import { ApiBase } from './ApiBase';
import { IEvent } from '../../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AuditEventApi } from '../AuditEventApi';
import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { AuditLogEventArgs } from '../Events/AuditEvents';
import Emitter, { EmitterCallback } from '../../Utilities/Emitter';

export class AuditEventApiImpl extends ApiBase implements AuditEventApi {
  public _onAuditStateChanged: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  public _onAuditCellEdited: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;
  public _onAuditFunctionApplied: EventDispatcher<IAdaptableBlotter, AuditLogEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);

    this.emitter = new Emitter();

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

  // new way of doing this - much cleaner
  private emitter: Emitter;
  on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);

  public emit = (eventName: string, data?: any): Promise<any> => this.emitter.emit(eventName, data);
}
