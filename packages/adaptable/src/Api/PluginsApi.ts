import { PluginsState } from '../Redux/ActionsReducers/PluginsRedux';

/**
 * Api methods dealing with AdapTable plugins
 *
 * **primarily intended for internal use**
 *
 */
export interface PluginsApi {
  getPluginsState(): PluginsState;
  getPluginState(pluginId: string): any;
  registerPlugin(pluginId: string, initialPluginState: any): void;
  setPluginState(pluginId: string, pluginState: any): void;
}
