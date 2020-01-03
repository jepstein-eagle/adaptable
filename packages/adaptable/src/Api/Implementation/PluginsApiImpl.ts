import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as PluginsRedux from '../../Redux/ActionsReducers/PluginsRedux';
import { PluginsApi } from '../PluginsApi';
import { ApiBase } from './ApiBase';
import { PluginsState } from '../../Redux/ActionsReducers/PluginsRedux';

export class PluginsApiImpl extends ApiBase implements PluginsApi {
  public getPluginsState(): PluginsState {
    return this.getAdaptableState().Plugins;
  }

  public getPluginState(pluginId: string): any {
    return this.getPluginsState()[pluginId];
  }

  public registerPlugin(pluginId: string, initialPluginState: any): void {
    this.setPluginState(pluginId, initialPluginState);
  }

  public setPluginState(pluginId: string, newPluginState: any): void {
    this.dispatchAction(PluginsRedux.PluginsSetPluginState(pluginId, newPluginState));
  }
}
