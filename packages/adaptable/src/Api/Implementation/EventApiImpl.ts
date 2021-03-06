import { ApiBase } from './ApiBase';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { EventApi } from '../EventApi';
import Emitter, { EmitterCallback } from '../../Utilities/Emitter';

export class EventApiImpl extends ApiBase implements EventApi {
  constructor(adaptable: IAdaptable) {
    super(adaptable);

    this.emitter = new Emitter();
  }

  // new way of doing this - much cleaner
  private emitter: Emitter;
  on = (eventName: string, callback: EmitterCallback): (() => void) => {
    let result: () => void;
    if (eventName === 'AdaptableReady') {
      result = this.emitter.onIncludeFired(eventName, callback);
    } else {
      result = this.emitter.on(eventName, callback);
    }

    return result;
  };

  off = (eventName: string, callback: EmitterCallback): void =>
    this.emitter.off(eventName, callback);

  public emit = (eventName: string, data?: any): Promise<any> => this.emitter.emit(eventName, data);
}
