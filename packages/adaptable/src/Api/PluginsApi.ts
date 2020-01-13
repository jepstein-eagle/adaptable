import { PluginsState } from '../Redux/ActionsReducers/PluginsRedux';

/**
 * Provides full and comprehensive run-time access to the Alert function and associated state.
 *
 * **Further Adaptable Help Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/alertsmessages/aggridalertdemo/) | [State](_predefinedconfig_alertstate_.alertstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895731-Alerts-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 */
export interface PluginsApi {
  getPluginsState(): PluginsState;
  getPluginState(pluginId: string): any;
  registerPlugin(pluginId: string, initialPluginState: any): void;
  setPluginState(pluginId: string, pluginState: any): void;
}
