import {
  AdaptablePlugin,
  IAdaptable,
  AdaptableFunctionName,
  AdaptableState,
  AdaptableOptions,
  IAdaptableStore,
} from '@adaptabletools/adaptable/types';
import * as Redux from 'redux';

import env from '@adaptabletools/adaptable/src/env';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

import { SystemReducer } from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SystemRedux';
import { IPushPullStrategyId } from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';

import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import { SystemState } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';
import {
  AdaptableViewFactory,
  AdaptableDashboardFactory,
} from '@adaptabletools/adaptable/src/View/AdaptableViewFactory';

import { PushPullStrategy } from './Strategy/PushPullStrategy';
import { IPushPullToolbarControl } from './View/IPushPullToolbarControl';
import { IPushPullApi } from '@adaptabletools/adaptable/src/Api/IPushPullApi';
import { IPushPullApiImpl } from './IPushPullApiImpl';
import { PushPullService } from './Utilities/Services/PushPullService';

import ipushpull from 'ipushpull-js';
import { IIPPConfig } from 'ipushpull-js/dist/Config';
import { IPushPullReducer } from './Redux/ActionReducers/IPushPullRedux';
import { IPushPullLoginPopup } from './View/IPushPullLoginPopup';
import { IPushPullAddPagePopup } from './View/IPushPullAddPagePopup';
import * as IPushPullRedux from './Redux/ActionReducers/IPushPullRedux';
import { IPushPullStrategy } from './Strategy/Interface/IPushPullStrategy';
import { PluginMiddlewareFunction } from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptablePlugin';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-finance" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const getApiKey = (): string => {
  let key = env.IPUSHPULL_API_KEY; // need to make sure that is always there
  return key;
};

const getApiSecret = (): string => {
  let secret: string = env.IPUSHPULL_API_SECRET; // need to make sure that is always there
  return secret;
};
const defaultOptions: IPushPullPluginOptions = {
  ippConfig: {
    api_secret: getApiSecret() || '',
    api_key: getApiKey() || '',
    api_url: 'https://www.ipushpull.com/api/1.0',
    ws_url: 'https://www.ipushpull.com',
    web_url: 'https://www.ipushpull.com',
    docs_url: 'https://docs.ipushpull.com',
    storage_prefix: 'ipp_local',
    transport: 'polling',
    hsts: false, // strict cors policy
  },
  autoLogin: false,

  throttleTime: 2000,
  includeSystemReports: true,
};

// internal - would like not to save if possible... //TODO move into system state
// IsIPushPullAvailable?: boolean;
// IsIPushPullRunning?: boolean;
// IPushPullDomainsPages?: IPushPullDomain[];
// IPushPullLoginErrorMessage?: string;
// CurrentLiveIPushPullReport?: IPushPullReport;

export interface IPushPullPluginOptions {
  ippConfig?: IIPPConfig;

  /**
   * The user's ipushpull user name (usually an email address)
   *
   * If supplied then the ipushpull login screen's username textbox will be pre-populated
   */
  username?: string;
  /**
   * The user's ipushpull password
   *
   * If supplied then the ipushpull login screen's password textbox will be pre-populated
   */
  password?: string;
  /**
   * How long (in miliseconds) Adaptable should throttle when sending a data update to ipushpull.
   *
   * **Default Value: 2000**
   */
  throttleTime?: number;

  /**
   * Whether AdapTable will try log you in to ipushpull automatically at start-up
   *
   * **Default Value: false**
   */
  autoLogin?: boolean;

  /**
   * Whether AdapTable will include the System Reports (e.g. 'All Data', 'Selected Cells' etc) in the dropdown in the ipushpull toolbar
   *
   * **Default Value: true**
   */
  includeSystemReports?: boolean;
}

class IPushPullPlugin extends AdaptablePlugin {
  public options: IPushPullPluginOptions;
  public pluginId: string = 'ipushpull';
  public iPushPullApi?: IPushPullApi;
  private PushPullService?: PushPullService;

  constructor(options?: IPushPullPluginOptions) {
    super(options);
    this.options = {
      ...defaultOptions,
      ...options,
      ippConfig: {
        api_key: '',
        api_secret: '',
        ...defaultOptions.ippConfig,
        ...(options || {}).ippConfig,
      },
    };

    /**
     * Contains the objects required to export (snapshot or live) data to ipushpull from AdapTable.
     *
     * Includes ipushpull config and objects and, optionally, any ipushpull Reports (including schedules).
     */
    // IPushPull?: IPushPullState;

    ipushpull.config.set(this.options.ippConfig!);
  }

  afterInitApi(adaptable: IAdaptable) {
    this.iPushPullApi = new IPushPullApiImpl(adaptable, this.options);
    this.PushPullService = new PushPullService(adaptable);
    this.iPushPullApi.setIPushPullInstance(ipushpull);
    this.registerProperty('api', () => this.iPushPullApi);
    this.registerProperty('service', () => this.PushPullService);
  }

  rootReducer = {
    System: (state: SystemState, action: Redux.Action) => {
      const newState = SystemReducer(state, action);

      return IPushPullReducer(newState, action);
    },
  };

  reduxMiddleware(next: Redux.Dispatch<Redux.Action<AdaptableState>>): PluginMiddlewareFunction {
    return (action, adaptable, middlewareAPI) => {
      const api = adaptable.api.pluginsApi.getPluginApi('ipushpull');
      switch (action.type) {
        case IPushPullRedux.IPUSHPULL_LOGIN: {
          const actionTyped = action as IPushPullRedux.IPushPullLoginAction;
          api.loginToIPushPull(actionTyped.username, actionTyped.password);
          return next(action);
        }

        case IPushPullRedux.IPUSHPULL_SEND_SNAPSHOT: {
          let iPushPullStrategy = <IPushPullStrategy>(
            adaptable.strategies.get(StrategyConstants.IPushPullStrategyId)
          );
          const actionTyped = action as IPushPullRedux.IPushPullSendSnapshotAction;
          iPushPullStrategy.sendSnapshot(actionTyped.iPushPullReport);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case IPushPullRedux.IPUSHPULL_START_LIVE_DATA: {
          let iPushPullStrategy = <IPushPullStrategy>(
            adaptable.strategies.get(StrategyConstants.IPushPullStrategyId)
          );
          const actionTyped = action as IPushPullRedux.IPushPullStartLiveDataAction;
          iPushPullStrategy.startLiveData(actionTyped.iPushPullReport);
          middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
          return next(action);
        }

        case IPushPullRedux.IPUSHPULL_STOP_LIVE_DATA: {
          api.stopLiveData();
          return next(action);
        }

        case IPushPullRedux.IPUSHPULL_ADD_PAGE: {
          const actionTyped = action as IPushPullRedux.IPushPullAddPageAction;
          api.addNewIPushPullPage(actionTyped.folder, actionTyped.page);
          return next(action);
        }

        default:
          return next(action);
      }
    };
  }

  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {
    strategies.set(IPushPullStrategyId, new PushPullStrategy(adaptable));
    AdaptableViewFactory.IPushPullLoginPopup = IPushPullLoginPopup;
    AdaptableViewFactory.IPushPullAddPagePopup = IPushPullAddPagePopup;
    AdaptableViewFactory.IPushPullToolbarControl = IPushPullToolbarControl;

    AdaptableDashboardFactory.set(IPushPullStrategyId, IPushPullToolbarControl as any);
  }
}

export default (options?: any) => new IPushPullPlugin(options);
