import * as Redux from 'redux';
import {
  ToolPanelState,
  AdaptableToolPanels,
  AdaptableToolPanel,
} from '../../PredefinedConfig/ToolPanelState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common/Enums';

const TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
export const TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';
const TOOLPANEL_SHOW_TOOLBAR = 'TOOLPANEL_SHOW_TOOLBAR';
const TOOLPANEL_HIDE_TOOLBAR = 'TOOLPANEL_HIDE_TOOLBAR';

export interface ToolPanelSetAvailableToolPanelsAction extends Redux.Action {
  toolPanels: AdaptableToolPanels;
}

export interface ToolPanelSetToolPanelsAction extends Redux.Action {
  toolPanels: AdaptableToolPanels;
}

export interface ToolPanelShowToolPanelAction extends Redux.Action {
  toolPanel: AdaptableToolPanel;
}

export interface ToolPanelHideToolPanelAction extends Redux.Action {
  toolPanel: AdaptableToolPanel;
}

export const ToolPanelSetAvailableToolPanels = (
  toolPanels: AdaptableToolPanels
): ToolPanelSetAvailableToolPanelsAction => ({
  type: TOOLPANEL_SET_AVAILABLE_TOOLPANELS,
  toolPanels,
});

export const ToolPanelSetToolPanels = (
  toolPanels: AdaptableToolPanels
): ToolPanelSetToolPanelsAction => ({
  type: TOOLPANEL_SET_TOOLPANELS,
  toolPanels,
});

export const ToolPanelShowToolPanel = (
  toolPanel: AdaptableToolPanel
): ToolPanelShowToolPanelAction => ({
  type: TOOLPANEL_SHOW_TOOLBAR,
  toolPanel,
});

export const ToolPanelHideToolPanel = (
  toolPanel: AdaptableToolPanel
): ToolPanelHideToolPanelAction => ({
  type: TOOLPANEL_HIDE_TOOLBAR,
  toolPanel,
});

const initialToolPanelState: ToolPanelState = {
  AvailableToolPanels: [
    'AdvancedSearch',
    'Alert',
    'BulkUpdate',
    'CellSummary',
    'Chart',
    'ColumnFilter',
    'Dashboard',
    'Export',
    'Layout',
    'QuickSearch',
    'SmartEdit',
    'SystemStatus',
    'Theme',
  ],
  VisibleToolPanels: [
    'AdvancedSearch',
    'Alert',
    'BulkUpdate',
    'CellSummary',
    'Chart',
    'ColumnFilter',
    'Dashboard',
    'Export',
    'Layout',
    'SmartEdit',
    'QuickSearch',
    'SystemStatus',
    'Theme',
  ],
};

export const ToolPanelReducer: Redux.Reducer<ToolPanelState> = (
  state: ToolPanelState = initialToolPanelState,
  action: Redux.Action
): ToolPanelState => {
  const setToolPanels = (
    state: ToolPanelState,
    toolPanels: AdaptableToolPanels
  ): ToolPanelState => {
    return { ...state, VisibleToolPanels: toolPanels };
  };

  switch (action.type) {
    case TOOLPANEL_SET_AVAILABLE_TOOLPANELS:
      return Object.assign({}, state, {
        AvailableToolPanels: (action as ToolPanelSetAvailableToolPanelsAction).toolPanels,
      });
    case TOOLPANEL_SET_TOOLPANELS: {
      const actionTyped = action as ToolPanelSetToolPanelsAction;
      const toolPanels = actionTyped.toolPanels;
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_SHOW_TOOLBAR: {
      const actionTyped = action as ToolPanelShowToolPanelAction;
      const toolPanels = [...state.VisibleToolPanels!];
      toolPanels.push(actionTyped.toolPanel);
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_HIDE_TOOLBAR: {
      const actionTyped = action as ToolPanelHideToolPanelAction;
      const toolPanels = (state.VisibleToolPanels || []).filter(a => a !== actionTyped.toolPanel);
      return setToolPanels(state, toolPanels);
    }

    default:
      return state;
  }
};
