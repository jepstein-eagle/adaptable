import * as Redux from 'redux';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import {
  AdaptableToolPanels,
  AdaptableToolPanel,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

const TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
export const TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';
const TOOLPANEL_SHOW_TOOLBAR = 'TOOLPANEL_SHOW_TOOLBAR';
const TOOLPANEL_HIDE_TOOLBAR = 'TOOLPANEL_HIDE_TOOLBAR';
const TOOLPANEL_SET_FUNCTION_BUTTONS = 'TOOLPANEL_SET_FUNCTION_BUTTONS';

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

export interface ToolPanelSetFunctionButtonsAction extends Redux.Action {
  functionButtons: AdaptableFunctionButtons;
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

export const ToolPanelSetFunctionButtons = (
  functionButtons: AdaptableFunctionButtons
): ToolPanelSetFunctionButtonsAction => ({
  type: TOOLPANEL_SET_FUNCTION_BUTTONS,
  functionButtons,
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
  //VisibleButtons: EMPTY_ARRAY,
  VisibleButtons: [
    'Dashboard',
    'SmartEdit',
    'ColumnChooser',
    'ConditionalStyle',
    'ColumnCategory',
    'DataSource',
    'PlusMinus',
    'Theme',
    'SystemStatus',
    'SparklineColumn',
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
    case TOOLPANEL_SET_FUNCTION_BUTTONS: {
      const actionTyped = action as ToolPanelSetFunctionButtonsAction;
      const dashboardFunctionButtons = actionTyped.functionButtons;
      return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
    }

    default:
      return state;
  }
};
