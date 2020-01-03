import { AdaptableOptions } from './AdaptableOptions';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableApi } from '../types';

export class AdaptablePlugin {
  public options?: any;

  constructor(options?: any) {
    this.options = options;
  }

  beforeInit(
    adaptableOptions: AdaptableOptions,
    extraOptions: {
      renderGrid: boolean;
      runtimeConfig: any;
    }
  ) {}

  afterInitStore(adaptable: IAdaptable, adaptableStore: IAdaptableStore) {}
  afterInitOptions(adaptable: IAdaptable, adaptableOptions: AdaptableOptions) {}
  afterInitApi(adaptable: IAdaptable, api: AdaptableApi) {}
  afterInitServices(adaptable: IAdaptable) {}

  afterInit(ab: IAdaptable) {}

  onStoreEvent(eventName: string, data: any, adaptableStore: IAdaptableStore) {}
  onAdaptableReady(adaptable: IAdaptable, adaptableOptions: AdaptableOptions) {}
}
