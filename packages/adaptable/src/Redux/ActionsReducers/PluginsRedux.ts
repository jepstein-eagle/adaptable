import * as Redux from 'redux';

export const PLUGINS_SET_PLUGIN_STATE = 'PLUGINS_SET_PLUGIN_STATE';

export interface PluginsAction extends Redux.Action {
  pluginState: any;
  pluginId: string;
}

export interface PluginsSetPluginStateAction extends PluginsAction {}

export interface PluginsState {
  [key: string]: any;
}

export const PluginsSetPluginState = (
  pluginId: string,
  pluginState: any
): PluginsSetPluginStateAction => ({
  type: PLUGINS_SET_PLUGIN_STATE,
  pluginId,
  pluginState,
});

const initialPluginsState: PluginsState = {};

export const PluginsReducer: Redux.Reducer<PluginsState> = (
  state: PluginsState = initialPluginsState,
  action: PluginsAction
): PluginsState => {
  switch (action.type) {
    case PLUGINS_SET_PLUGIN_STATE: {
      return { ...state, [action.pluginId]: action.pluginState };
    }

    default:
      return state;
  }
};
