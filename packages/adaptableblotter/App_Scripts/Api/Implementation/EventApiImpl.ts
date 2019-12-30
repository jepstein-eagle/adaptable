import { ApiBase } from './ApiBase';
import { IAdaptable } from '../../BlotterInterfaces/IAdaptable';
import { EventApi } from '../EventApi';
import Emitter, { EmitterCallback } from '../../Utilities/Emitter';

export class EventApiImpl extends ApiBase implements EventApi {
  constructor(blotter: IAdaptable) {
    super(blotter);

    this.emitter = new Emitter();
  }

  // new way of doing this - much cleaner
  private emitter: Emitter;
  on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);

  public emit = (eventName: string, data?: any): Promise<any> => this.emitter.emit(eventName, data);
}
