import {
  AdaptablePlugin,
  IAdaptable,
  AdaptableFunctionName,
  AdaptableState,
} from '@adaptabletools/adaptable/types';
import * as Redux from 'redux';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

import { SystemReducer } from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import { Glue42StrategyId } from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';

import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import { SystemState } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';
import {
  AdaptableViewFactory,
  AdaptableDashboardFactory,
} from '@adaptabletools/adaptable/src/View/AdaptableViewFactory';

import { Glue42Strategy } from './Strategy/Glue42Strategy';
import { Glue42Api } from '@adaptabletools/adaptable/src/Api/Glue42Api';
import { Glue42ApiImpl } from './Glue42ApiImpl';
import { Glue42Service } from './Utilities/Services/Glue42Service';

import { Glue42Reducer } from './Redux/ActionReducers/Glue42Redux';
import { Glue42ToolbarControl } from './View/Glue42ToolbarControl';
import { Glue42LoginPopup } from './View/Glue42LoginPopup';
import * as Glue42Redux from './Redux/ActionReducers/Glue42Redux';
import { IGlue42Strategy } from './Strategy/Interface/IGlue42Strategy';
import { PluginMiddlewareFunction } from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptablePlugin';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-glue42" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const defaultOptions: Glue42PluginOptions = {
  username: '',
  password: '',
  gatewayURL: '',
  glue: undefined,
  glue4Office: undefined,
  throttleTime: 2000,
};

export interface Glue42PluginOptions {
  username?: string;
  password?: string;
  gatewayURL?: string;
  glue?: any; // this is the glue object
  glue4Office?: any; // this is the Glue4Office object
  throttleTime?: number;
}

class Glue42Plugin extends AdaptablePlugin {
  public options: Glue42PluginOptions;
  public pluginId: string = 'glue42';
  public glue42Api?: Glue42Api;
  private Glue42Service?: Glue42Service;

  constructor(options?: Glue42PluginOptions) {
    super(options);
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  afterInitApi(adaptable: IAdaptable) {
    this.glue42Api = new Glue42ApiImpl(adaptable, this.options);
    this.Glue42Service = new Glue42Service(adaptable, this.options);

    this.registerProperty('api', () => this.glue42Api);
    this.registerProperty('service', () => this.Glue42Service);
  }

  rootReducer = {
    System: (state: SystemState, action: Redux.Action) => {
      const newState = SystemReducer(state, action);

      return Glue42Reducer(newState, action);
    },
  };

  reduxMiddleware(next: Redux.Dispatch<Redux.Action<AdaptableState>>): PluginMiddlewareFunction {
    return (action, adaptable, middlewareAPI) => {
      const api = adaptable.api.pluginsApi.getPluginApi('glue42');
      switch (action.type) {
        case Glue42Redux.GLUE42_LOGIN: {
          const actionTyped = action as Glue42Redux.Glue42LoginAction;
          this.glue42Api.loginToGlue42(actionTyped.username, actionTyped.password);
          return next(action);
        }

        case Glue42Redux.GLUE42_SEND_SNAPSHOT: {
          let glue42Strategy = <IGlue42Strategy>(
            adaptable.strategies.get(StrategyConstants.Glue42StrategyId)
          );
          const actionTyped = action as Glue42Redux.Glue42SendSnapshotAction;
          glue42Strategy.sendSnapshot(actionTyped.glue42Report);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case Glue42Redux.GLUE42_START_LIVE_DATA: {
          let glue42Strategy = <IGlue42Strategy>(
            adaptable.strategies.get(StrategyConstants.Glue42StrategyId)
          );
          const actionTyped = action as Glue42Redux.Glue42StartLiveDataAction;
          glue42Strategy.startLiveData(actionTyped.glue42Report);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case Glue42Redux.GLUE42_STOP_LIVE_DATA: {
          this.glue42Api.stopLiveData();
          return next(action);
        }

        default:
          return next(action);
      }
    };
  }

  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {
    strategies.set(Glue42StrategyId, new Glue42Strategy(adaptable));
    AdaptableViewFactory.Glue42LoginPopup = Glue42LoginPopup;
    AdaptableViewFactory.Glue42ToolbarControl = Glue42ToolbarControl;

    AdaptableDashboardFactory.set(Glue42StrategyId, Glue42ToolbarControl as any);
  }
}

export default (options?: any) => new Glue42Plugin(options);
