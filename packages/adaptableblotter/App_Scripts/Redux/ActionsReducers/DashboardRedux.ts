import * as Redux from 'redux';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ButtonStyle } from '../../PredefinedConfig/Common/ButtonStyle';
import {
  AdaptableDashboardToolbars,
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
import { DashboardState } from '../../PredefinedConfig/DashboardState';

const DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
export const DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
const DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
const DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
const DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON = 'DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
const DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON = 'DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON';
const DASHBOARD_SHOW_GRID_INFO_BUTTON = 'DASHBOARD_SHOW_GRID_INFO_BUTTON';
const DASHBOARD_HIDE_GRID_INFO_BUTTON = 'DASHBOARD_HIDE_GRID_INFO_BUTTON';
const DASHBOARD_SHOW_FUNCTIONS_DROPDOWN = 'DASHBOARD_SHOW_FUNCTIONS_DROPDOWN';
const DASHBOARD_HIDE_FUNCTIONS_DROPDOWN = 'DASHBOARD_HIDE_FUNCTIONS_DROPDOWN';
const DASHBOARD_SHOW_COLUMNS_DROPDOWN = 'DASHBOARD_SHOW_COLUMNS_DROPDOWN';
const DASHBOARD_HIDE_COLUMNS_DROPDOWN = 'DASHBOARD_HIDE_COLUMNS_DROPDOWN';
const DASHBOARD_SHOW_TOOLBARS_DROPDOWN = 'DASHBOARD_SHOW_TOOLBARS_DROPDOWN';
const DASHBOARD_HIDE_TOOLBARS_DROPDOWN = 'DASHBOARD_HIDE_TOOLBARS_DROPDOWN';
const DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
const DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE =
  'DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE';

export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
  toolbars: AdaptableDashboardToolbars;
}

export interface DashboardSetToolbarsAction extends Redux.Action {
  toolbars: AdaptableDashboardToolbars;
}

export interface DashboardShowToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar;
}

export interface DashboardHideToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar;
}

export interface DashboardMoveItemAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar;
  NewIndex: number;
}

export interface DashboardSetFunctionButtonsAction extends Redux.Action {
  functionButtons: AdaptableFunctionButtons;
}

export interface DashboardSetVisibilityAction extends Redux.Action {
  Visibility: Visibility;
}

export interface DashboardShowSystemStatusButtonAction extends Redux.Action {}

export interface DashboardHideSystemStatusButtonAction extends Redux.Action {}

export interface DashboardShowGridInfoButtonAction extends Redux.Action {}

export interface DashboardHideGridInfoButtonAction extends Redux.Action {}

export interface DashboardShowFunctionsDropdownAction extends Redux.Action {}

export interface DashboardHideFunctionsDropdownAction extends Redux.Action {}

export interface DashboardShowColumnsDropdownAction extends Redux.Action {}

export interface DashboardHideColumnsDropdownAction extends Redux.Action {}

export interface DashboardShowToolbarsDropdownAction extends Redux.Action {}

export interface DashboardHideToolbarsDropdownAction extends Redux.Action {}

export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
  Title: string;
}

export interface DashboardSetMinimisedHomeToolbarButtonStyleAction extends Redux.Action {
  ButtonStyle: ButtonStyle;
}

export const DashboardSetAvailableToolbars = (
  toolbars: AdaptableDashboardToolbars
): DashboardSetAvailableToolbarsAction => ({
  type: DASHBOARD_SET_AVAILABLE_TOOLBARS,
  toolbars,
});

export const DashboardSetToolbars = (
  toolbars: AdaptableDashboardToolbar[]
): DashboardSetToolbarsAction => ({
  type: DASHBOARD_SET_TOOLBARS,
  toolbars,
});

export const DashboardShowToolbar = (
  toolbar: AdaptableDashboardToolbar
): DashboardShowToolbarAction => ({
  type: DASHBOARD_SHOW_TOOLBAR,
  toolbar,
});

export const DashboardHideToolbar = (
  toolbar: AdaptableDashboardToolbar
): DashboardHideToolbarAction => ({
  type: DASHBOARD_HIDE_TOOLBAR,
  toolbar,
});

export const DashboardMoveItem = (
  toolbar: AdaptableDashboardToolbar,

  NewIndex: number
): DashboardMoveItemAction => ({
  type: DASHBOARD_MOVE_ITEM,
  toolbar,
  NewIndex,
});

export const DashboardSetFunctionButtons = (
  functionButtons: AdaptableFunctionButtons
): DashboardSetFunctionButtonsAction => ({
  type: DASHBOARD_SET_FUNCTION_BUTTONS,
  functionButtons,
});

export const DashboardSetVisibility = (Visibility: Visibility): DashboardSetVisibilityAction => ({
  type: DASHBOARD_SET_VISIBILITY,
  Visibility,
});

export const DashboardShowSystemStatusButton = (): DashboardShowSystemStatusButtonAction => ({
  type: DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON,
});

export const DashboardHideSystemStatusButton = (): DashboardHideSystemStatusButtonAction => ({
  type: DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON,
});

export const DashboardShowGridInfoButton = (): DashboardShowGridInfoButtonAction => ({
  type: DASHBOARD_SHOW_GRID_INFO_BUTTON,
});

export const DashboardHideGridInfoButton = (): DashboardHideGridInfoButtonAction => ({
  type: DASHBOARD_HIDE_GRID_INFO_BUTTON,
});

export const DashboardShowFunctionsDropdown = (): DashboardShowFunctionsDropdownAction => ({
  type: DASHBOARD_SHOW_FUNCTIONS_DROPDOWN,
});

export const DashboardHideFunctionsDropdown = (): DashboardHideFunctionsDropdownAction => ({
  type: DASHBOARD_HIDE_FUNCTIONS_DROPDOWN,
});

export const DashboardShowColumnsDropdown = (): DashboardShowColumnsDropdownAction => ({
  type: DASHBOARD_SHOW_COLUMNS_DROPDOWN,
});

export const DashboardHideColumnsDropdown = (): DashboardHideColumnsDropdownAction => ({
  type: DASHBOARD_HIDE_COLUMNS_DROPDOWN,
});

export const DashboardShowToolbarsDropdown = (): DashboardShowToolbarsDropdownAction => ({
  type: DASHBOARD_SHOW_TOOLBARS_DROPDOWN,
});

export const DashboardHideToolbarsDropdown = (): DashboardHideToolbarsDropdownAction => ({
  type: DASHBOARD_HIDE_TOOLBARS_DROPDOWN,
});

export const DashboardSetHomeToolbarTitle = (
  Title: string
): DashboardSetHomeToolbarTitleAction => ({
  type: DASHBOARD_SET_HOME_TOOLBAR_TITLE,
  Title,
});

export const DashboardSetMinimisedHomeToolbarButtonStyle = (
  ButtonStyle: ButtonStyle
): DashboardSetMinimisedHomeToolbarButtonStyleAction => ({
  type: DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE,
  ButtonStyle,
});

const initialDashboardState: DashboardState = {
  AvailableToolbars: [
    'AdvancedSearch',
    'Alert',
    'Application',
    'BulkUpdate',
    'CellSummary',
    'Chart',
    'ColumnFilter',
    'Export',
    'Layout',
    'SmartEdit',
    'QuickSearch',
    'SystemStatus',
    'Theme',
  ],
  VisibleToolbars: ['QuickSearch', 'Layout', 'Export', 'ColumnFilter'],
  VisibleButtons: ['Dashboard', 'SmartEdit', 'ColumnChooser', 'ConditionalStyle'],
  DashboardVisibility: Visibility.Visible,
  ShowSystemStatusButton: true,
  ShowGridInfoButton: true,
  ShowFunctionsDropdown: true,
  ShowColumnsDropdown: true,
  ShowToolbarsDropdown: true,
  HomeToolbarTitle: '',
  ApplicationToolbarTitle: '',
  MinimisedHomeToolbarButtonStyle: {
    Variant: 'outlined',
    Tone: 'neutral',
  },
};

export const DashboardReducer: Redux.Reducer<DashboardState> = (
  state: DashboardState = initialDashboardState,
  action: Redux.Action
): DashboardState => {
  let index: number;
  let dashboardControls: AdaptableDashboardToolbars;

  const setToolbars = (
    state: DashboardState,
    toolbars: AdaptableDashboardToolbars
  ): DashboardState => {
    return { ...state, VisibleToolbars: toolbars };
  };

  switch (action.type) {
    case DASHBOARD_SET_AVAILABLE_TOOLBARS:
      return Object.assign({}, state, {
        AvailableToolbars: (action as DashboardSetAvailableToolbarsAction).toolbars,
      });
    case DASHBOARD_SET_TOOLBARS: {
      const actionTyped = action as DashboardSetToolbarsAction;
      const dashboardToolbars = actionTyped.toolbars;

      return setToolbars(state, dashboardToolbars);
    }
    case DASHBOARD_MOVE_ITEM: {
      const actionTyped = action as DashboardMoveItemAction;
      dashboardControls = [...state.VisibleToolbars!];
      index = dashboardControls.findIndex(a => a == actionTyped.toolbar);
      ArrayExtensions.moveArray(dashboardControls, index, actionTyped.NewIndex);
      return setToolbars(state, dashboardControls);
    }
    case DASHBOARD_SHOW_TOOLBAR: {
      const actionTyped = action as DashboardShowToolbarAction;
      const dashboardToolbars = [...state.VisibleToolbars!];
      dashboardToolbars.push(actionTyped.toolbar);
      return setToolbars(state, dashboardToolbars);
    }
    case DASHBOARD_HIDE_TOOLBAR: {
      const actionTyped = action as DashboardHideToolbarAction;
      const dashboardToolbars = (state.VisibleToolbars || []).filter(
        a => a !== actionTyped.toolbar
      );
      return setToolbars(state, dashboardToolbars);
    }

    case DASHBOARD_SET_FUNCTION_BUTTONS: {
      const actionTyped = action as DashboardSetFunctionButtonsAction;
      const dashboardFunctionButtons = actionTyped.functionButtons;
      return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
    }
    case DASHBOARD_SET_VISIBILITY: {
      const actionTyped = action as DashboardSetVisibilityAction;
      return Object.assign({}, state, { DashboardVisibility: actionTyped.Visibility });
    }
    case DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON: {
      return Object.assign({}, state, { ShowSystemStatusButton: true });
    }

    case DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON: {
      return Object.assign({}, state, { ShowSystemStatusButton: false });
    }
    case DASHBOARD_SHOW_GRID_INFO_BUTTON: {
      return Object.assign({}, state, { ShowGridInfoButton: true });
    }

    case DASHBOARD_HIDE_GRID_INFO_BUTTON: {
      return Object.assign({}, state, { ShowGridInfoButton: false });
    }

    case DASHBOARD_SHOW_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: true });
    }
    case DASHBOARD_HIDE_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: false });
    }

    case DASHBOARD_SHOW_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: true });
    }
    case DASHBOARD_HIDE_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: false });
    }

    case DASHBOARD_SHOW_TOOLBARS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolbarsDropdown: true });
    }

    case DASHBOARD_HIDE_TOOLBARS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolbarsDropdown: false });
    }

    case DASHBOARD_SET_HOME_TOOLBAR_TITLE: {
      const actionTyped = action as DashboardSetHomeToolbarTitleAction;
      return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
    }

    case DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE: {
      const actionTyped = action as DashboardSetMinimisedHomeToolbarButtonStyleAction;
      return Object.assign({}, state, {
        MinimisedHomeToolbarButtonStyle: actionTyped.ButtonStyle,
      });
    }

    default:
      return state;
  }
};
