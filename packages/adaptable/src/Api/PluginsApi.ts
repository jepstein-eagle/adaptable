import { PluginsState } from '../Redux/ActionsReducers/PluginsRedux';
import { IPushPullApi } from './IPushPullApi';
import { Glue42Api } from './Glue42Api';
import { OpenFinApi } from './OpenFinApi';

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

  getPluginApi(pluginId: string): any;
  getPluginApi(pluginId: 'ipushpull'): IPushPullApi;
  getPluginApi(pluginId: 'glue42'): Glue42Api;
  getPluginApi(pluginId: 'openfin'): OpenFinApi;
}
