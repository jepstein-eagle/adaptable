import { ApiBase } from './ApiBase';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AuditEventApi } from '../AuditEventApi';
import Emitter, { EmitterCallback } from '../../Utilities/Emitter';

export class AuditEventApiImpl extends ApiBase implements AuditEventApi {
  constructor(adaptable: IAdaptable) {
    super(adaptable);

    this.emitter = new Emitter();
  }

  // new way of doing this - much cleaner
  private emitter: Emitter;
  on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);

  public emit = (eventName: string, data?: any): Promise<any> => this.emitter.emit(eventName, data);
}
