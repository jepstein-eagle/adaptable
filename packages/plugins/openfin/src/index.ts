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
import { OpenFinStrategyId } from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';

import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import { SystemState } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';
import {
  AdaptableViewFactory,
  AdaptableDashboardFactory,
} from '@adaptabletools/adaptable/src/View/AdaptableViewFactory';

import { OpenFinStrategy } from './Strategy/OpenFinStrategy';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';
import { OpenFinApiImpl } from './OpenFinApiImpl';
import { OpenFinService } from './Utilities/Services/OpenFinService';

import { OpenFinReducer } from './Redux/ActionReducers/OpenFinRedux';
import { OpenFinToolbarControl } from './View/OpenFinToolbarControl';
import * as OpenFinRedux from './Redux/ActionReducers/OpenFinRedux';
import { IOpenFinStrategy } from './Strategy/Interface/IOpenFinStrategy';
import { PluginMiddlewareFunction } from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptablePlugin';
import { OpenFinState } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-openfin" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const defaultOptions: OpenFinPluginOptions = {
  throttleTime: 2000,
};

export interface OpenFinPluginOptions {
  throttleTime?: number;
}

class OpenFinPlugin extends AdaptablePlugin {
  public options: OpenFinPluginOptions;
  public pluginId: string = 'openfin';
  public openFinApi?: OpenFinApi;
  private OpenFinService?: OpenFinService;

  constructor(options?: OpenFinPluginOptions) {
    super(options);
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  afterInitApi(adaptable: IAdaptable) {
    this.openFinApi = new OpenFinApiImpl(adaptable, this.options);
    this.OpenFinService = new OpenFinService(adaptable, this.options);

    this.registerProperty('api', () => this.openFinApi);
    this.registerProperty('service', () => this.OpenFinService);
  }

  rootReducer = (rootReducer: any) => {
    return {
      System: (state: SystemState, action: Redux.Action): SystemState => {
        const newState = rootReducer.System(state, action);

        return OpenFinReducer(newState, action) as SystemState;
      },
    };
  };

  reduxMiddleware(next: Redux.Dispatch<Redux.Action<AdaptableState>>): PluginMiddlewareFunction {
    return (action, adaptable, middlewareAPI) => {
      const api = adaptable.api.pluginsApi.getPluginApi('openfin');
      let openFinStrategy = <IOpenFinStrategy>(
        adaptable.strategies.get(StrategyConstants.OpenFinStrategyId)
      );
      switch (action.type) {
        case OpenFinRedux.OPENFIN_START_LIVE_DATA: {
          const actionTyped = action as OpenFinRedux.OpenFinStartLiveDataAction;
          openFinStrategy.startLiveData(actionTyped.openFinReport);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case OpenFinRedux.OPENFIN_STOP_LIVE_DATA: {
          const actionTyped = action as OpenFinRedux.OpenFinStartLiveDataAction;
          openFinStrategy.stopLiveData(actionTyped.openFinReport);
          return next(action);
        }

        default:
          return next(action);
      }
    };
  }

  /* This was in Adaptalbe Store but just taken out
 case SystemRedux.REPORT_START_LIVE: {
            let ret = next(action);
            const actionTyped = action as SystemRedux.ReportStartLiveAction;
            // fire the Live Report event for Export Started
            adaptable.ReportService.PublishLiveLiveDataChangedEvent(
              actionTyped.ReportDestination,
              'LiveDataStarted'
            );
            // set livereport on
            //  adaptable.api.internalApi.setLiveReportRunningOn();
            return ret;
          }

          // Not doing this for ipushpull any more either
          case SystemRedux.REPORT_STOP_LIVE: {
            const actionTyped = action as SystemRedux.ReportStopLiveAction;

            let ret = next(action);
            // fire the Live Report event for Export Stopped
            adaptable.ReportService.PublishLiveLiveDataChangedEvent(
              actionTyped.ReportDestination,
              'LiveDataStopped'
            );
            // set livereport off
            //   adaptable.api.internalApi.setLiveReportRunningOff();
            return ret;
          }
          */

  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {
    strategies.set(OpenFinStrategyId, new OpenFinStrategy(adaptable));
    AdaptableViewFactory.OpenFinToolbarControl = OpenFinToolbarControl;

    AdaptableDashboardFactory.set(OpenFinStrategyId, OpenFinToolbarControl as any);
  }
}

export default (options?: any) => new OpenFinPlugin(options);
