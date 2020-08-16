import * as Redux from 'redux';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import {
  AdaptableToolPanels,
  AdaptableToolPanel,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
const TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
export const TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';
const TOOLPANEL_SHOW_TOOLPANEL = 'TOOLPANEL_SHOW_TOOLPANEL';
const TOOLPANEL_HIDE_TOOLPANEL = 'TOOLPANEL_HIDE_TOOLPANEL';
const TOOLPANEL_SET_FUNCTION_BUTTONS = 'TOOLPANEL_SET_FUNCTION_BUTTONS';
const TOOLPANEL_MOVE_ITEM = 'TOOLPANEL_MOVE_ITEM';
const TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN = 'TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN';
const TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN = 'TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN';
const TOOLPANEL_SHOW_COLUMNS_DROPDOWN = 'TOOLPANEL_SHOW_COLUMNS_DROPDOWN';
const TOOLPANEL_HIDE_COLUMNS_DROPDOWN = 'TOOLPANEL_HIDE_COLUMNS_DROPDOWN';
const TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN = 'TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN';
const TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN = 'TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN';
const TOOLPANEL_SET_TOOLPANEL_TITLE = 'TOOLPANEL_SET_TOOLPANEL_TITLE';

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

export interface ToolPanelMoveItemAction extends Redux.Action {
  toolPanel: AdaptableToolPanel;
  NewIndex: number;
}

export interface ToolPanelShowFunctionsDropdownAction extends Redux.Action {}

export interface ToolPanelHideFunctionsDropdownAction extends Redux.Action {}

export interface ToolPanelShowColumnsDropdownAction extends Redux.Action {}

export interface ToolPanelHideColumnsDropdownAction extends Redux.Action {}

export interface ToolPanelShowToolPanelsDropdownAction extends Redux.Action {}

export interface ToolPanelHideToolPanelsDropdownAction extends Redux.Action {}

export interface ToolPanelSetToolPanelTitleAction extends Redux.Action {
  Title: string;
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
  type: TOOLPANEL_SHOW_TOOLPANEL,
  toolPanel,
});

export const ToolPanelHideToolPanel = (
  toolPanel: AdaptableToolPanel
): ToolPanelHideToolPanelAction => ({
  type: TOOLPANEL_HIDE_TOOLPANEL,
  toolPanel,
});

export const ToolPanelSetFunctionButtons = (
  functionButtons: AdaptableFunctionButtons
): ToolPanelSetFunctionButtonsAction => ({
  type: TOOLPANEL_SET_FUNCTION_BUTTONS,
  functionButtons,
});

export const ToolPanelMoveItem = (
  toolPanel: AdaptableToolPanel,
  NewIndex: number
): ToolPanelMoveItemAction => ({
  type: TOOLPANEL_MOVE_ITEM,
  toolPanel,
  NewIndex,
});

export const ToolPanelShowFunctionsDropdown = (): ToolPanelShowFunctionsDropdownAction => ({
  type: TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN,
});

export const ToolPanelHideFunctionsDropdown = (): ToolPanelHideFunctionsDropdownAction => ({
  type: TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN,
});

export const ToolPanelShowColumnsDropdown = (): ToolPanelShowColumnsDropdownAction => ({
  type: TOOLPANEL_SHOW_COLUMNS_DROPDOWN,
});

export const ToolPanelHideColumnsDropdown = (): ToolPanelHideColumnsDropdownAction => ({
  type: TOOLPANEL_HIDE_COLUMNS_DROPDOWN,
});

export const ToolPanelShowToolPanelsDropdown = (): ToolPanelShowToolPanelsDropdownAction => ({
  type: TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN,
});

export const ToolPanelHideToolPanelsDropdown = (): ToolPanelHideToolPanelsDropdownAction => ({
  type: TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN,
});

export const ToolPanelSetToolPanelTitle = (Title: string): ToolPanelSetToolPanelTitleAction => ({
  type: TOOLPANEL_SET_TOOLPANEL_TITLE,
  Title,
});

const initialToolPanelState: ToolPanelState = {
  AvailableToolPanels: [
    'AdvancedSearch',
    'Alert',
    'BulkUpdate',
    'CellSummary',
    'Chart',
    'Filter',
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
    'Filter',
    'Dashboard',
    'Export',
    'Layout',
    'QuickSearch',
    'SmartEdit',
    'SystemStatus',
    'Theme',
  ],
  VisibleButtons: [],
  ShowFunctionsDropdown: true,
  ShowColumnsDropdown: true,
  ShowToolPanelsDropdown: true,
  // ToolPanelTitle: '',
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
    case TOOLPANEL_SHOW_TOOLPANEL: {
      const actionTyped = action as ToolPanelShowToolPanelAction;
      const toolPanels = [...state.VisibleToolPanels!];
      toolPanels.push(actionTyped.toolPanel);
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_HIDE_TOOLPANEL: {
      const actionTyped = action as ToolPanelHideToolPanelAction;
      const toolPanels = (state.VisibleToolPanels || []).filter(a => a !== actionTyped.toolPanel);
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_SET_FUNCTION_BUTTONS: {
      const actionTyped = action as ToolPanelSetFunctionButtonsAction;
      const TOOLPANELFunctionButtons = actionTyped.functionButtons;
      return Object.assign({}, state, { VisibleButtons: TOOLPANELFunctionButtons });
    }

    case TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: true });
    }
    case TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: false });
    }

    case TOOLPANEL_SHOW_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: true });
    }

    case TOOLPANEL_HIDE_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: false });
    }

    case TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolPanelsDropdown: true });
    }

    case TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolPanelsDropdown: false });
    }

    //  case TOOLPANEL_SET_TOOLPANEL_TITLE: {
    //    const actionTyped = action as ToolPanelSetToolPanelTitleAction;
    //    return Object.assign({}, state, { ToolPanelTitle: actionTyped.Title });
    //  }

    default:
      return state;
  }
};
