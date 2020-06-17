import * as Redux from 'redux';
import { AdaptableOptions } from './AdaptableOptions';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableApi } from '../types';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';

import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { IStrategy } from '../Strategy/Interface/IStrategy';

type AdaptableReducerObject = {
  [key: string]: (...args: any[]) => any;
};
export type PluginMiddlewareFunction = (
  action: Redux.Action,
  adaptable: IAdaptable,
  middlewareAPI: Redux.MiddlewareAPI<Redux.Dispatch<Redux.Action<AdaptableState>>, AdaptableState>
) => Redux.Action<any>;

export abstract class AdaptablePlugin {
  public options?: any;

  private values: { [key: string]: any };
  public pluginId: string = '';

  constructor(options?: any) {
    this.options = options;

    this.values = {};
  }

  registerProperty(name: string, fn: (...args: any) => any) {
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

  rootReducer?: (rootReducer: AdaptableReducerObject) => AdaptableReducerObject;

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

  afterInitOptions(adaptable: IAdaptable, adaptableOptions: AdaptableOptions): void {}
  afterInitApi(adaptable: IAdaptable, api: AdaptableApi) {}
  afterInitServices(adaptable: IAdaptable) {}
  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {}

  afterInit(ab: IAdaptable) {}

  reduxMiddleware(
    next: Redux.Dispatch<Redux.Action<AdaptableState>>
  ): void | PluginMiddlewareFunction {
    return;
  }

  onStoreEvent(
    eventName: string,
    data: { action: Redux.Action; state: AdaptableState; newState: AdaptableState },
    adaptableStore: IAdaptableStore
  ) {}
  onAdaptableReady(adaptable: IAdaptable, adaptableOptions: AdaptableOptions) {}
}
