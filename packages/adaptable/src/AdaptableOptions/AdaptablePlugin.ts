import { AdaptableOptions } from './AdaptableOptions';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableApi } from '../types';

import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { IStrategy } from '../Strategy/Interface/IStrategy';

export abstract class AdaptablePlugin {
  public options?: any;

  private values: { [key: string]: any };

  constructor(options?: any) {
    this.options = options;

    this.values = {};
  }

  registerValue(name: string, fn: (...args: any) => any) {
    this.values[name] = fn;
  }

  getProperty(name: string): any {
    return (...args: any[]) => {
      const fn = this.values[name];

      if (fn) {
        return fn(...args);
      }
    };
  }

  hasProperty(name: string): boolean {
    return !!this.values[name];
  }

  beforeInit(
    adaptableOptions: AdaptableOptions,
    extraOptions: {
      renderGrid: boolean;
      runtimeConfig: any;
    }
  ): void {}

  afterInitStore(adaptable: IAdaptable, adaptableStore: IAdaptableStore): void {}
  afterInitOptions(adaptable: IAdaptable, adaptableOptions: AdaptableOptions): void {}
  afterInitApi(adaptable: IAdaptable, api: AdaptableApi) {}
  afterInitServices(adaptable: IAdaptable) {}
  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {}

  afterInit(ab: IAdaptable) {}

  onStoreEvent(eventName: string, data: any, adaptableStore: IAdaptableStore) {}
  onAdaptableReady(adaptable: IAdaptable, adaptableOptions: AdaptableOptions) {}
}
