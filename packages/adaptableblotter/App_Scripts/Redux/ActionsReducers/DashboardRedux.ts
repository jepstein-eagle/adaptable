import * as Redux from 'redux';
import { DashboardState } from '../../PredefinedConfig/IUserState Interfaces/DashboardState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common Objects/Enums';

const DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
const DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
const DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
const DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_ZOOM = 'DASHBOARD_SET_ZOOM';
const DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
const DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON = 'DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
const DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON = 'DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON';
const DASHBOARD_SHOW_ABOUT_BUTTON = 'DASHBOARD_SHOW_ABOUT_BUTTON';
const DASHBOARD_HIDE_ABOUT_BUTTON = 'DASHBOARD_HIDE_ABOUT_BUTTON';
const DASHBOARD_SHOW_FUNCTIONS_DROPDOWN = 'DASHBOARD_SHOW_FUNCTIONS_DROPDOWN';
const DASHBOARD_HIDE_FUNCTIONS_DROPDOWN = 'DASHBOARD_HIDE_FUNCTIONS_DROPDOWN';
const DASHBOARD_SHOW_COLUMNS_DROPDOWN = 'DASHBOARD_SHOW_COLUMNS_DROPDOWN';
const DASHBOARD_HIDE_COLUMNS_DROPDOWN = 'DASHBOARD_HIDE_COLUMNS_DROPDOWN';
const DASHBOARD_SHOW_TOOLBARS_DROPDOWN = 'DASHBOARD_SHOW_TOOLBARS_DROPDOWN';
const DASHBOARD_HIDE_TOOLBARS_DROPDOWN = 'DASHBOARD_HIDE_TOOLBARS_DROPDOWN';
const DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
const DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE = 'DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE';
const DASHBOARD_USE_SINGLE_COLOUR_FOR_BUTTONS = 'DASHBOARD_USE_SINGLE_COLOUR_FOR_BUTTONS';
const DASHBOARD_USE_MULTIPLE_COLOUR_FOR_BUTTONS = 'DASHBOARD_USE_MULTIPLE_COLOUR_FOR_BUTTONS';
const DASHBOARD_USE_EXTRA_SMALL_BUTTONS = 'DASHBOARD_USE_EXTRA_SMALL_BUTTONS';
const DASHBOARD_USE_DEFAULT_SIZE_BUTTONS = 'DASHBOARD_USE_DEFAULT_SIZE_BUTTONS';

export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface DashboardSetToolbarsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface DashboardShowToolbarAction extends Redux.Action {
  StrategyId: string;
}

export interface DashboardHideToolbarAction extends Redux.Action {
  StrategyId: string;
}

export interface DashboardMoveItemAction extends Redux.Action {
  StrategyId: string;
  NewIndex: number;
}

export interface DashboardCreateDefaultConfigurationItemAction extends Redux.Action {
  StrategyId: string;
}

export interface DashboardSetFunctionButtonsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface DashboardSetZoomAction extends Redux.Action {
  Zoom: Number;
}

export interface DashboardSetVisibilityAction extends Redux.Action {
  Visibility: Visibility;
}

export interface DashboardShowSystemStatusButtonAction extends Redux.Action {}

export interface DashboardHideSystemStatusButtonAction extends Redux.Action {}

export interface DashboardShowAboutButtonAction extends Redux.Action {}

export interface DashboardHideAboutButtonAction extends Redux.Action {}

export interface DashboardShowFunctionsDropdownAction extends Redux.Action {}

export interface DashboardHideFunctionsDropdownAction extends Redux.Action {}

export interface DashboardShowColumnsDropdownAction extends Redux.Action {}

export interface DashboardHideColumnsDropdownAction extends Redux.Action {}

export interface DashboardShowToolbarsDropdownAction extends Redux.Action {}

export interface DashboardHideToolbarsDropdownAction extends Redux.Action {}

export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
  Title: string;
}

export interface DashboardSetApplicationToolbarTitleAction extends Redux.Action {
  Title: string;
}

export interface DashboardUseSingleColourForButtonsAction extends Redux.Action {}

export interface DashboardUseMultipleColourForButtonsAction extends Redux.Action {}

export interface DashboardUseExtraSmallButtonsAction extends Redux.Action {}

export interface DashboardUseDefaultSizeButtonsAction extends Redux.Action {}

export const DashboardSetAvailableToolbars = (
  StrategyIds: string[]
): DashboardSetAvailableToolbarsAction => ({
  type: DASHBOARD_SET_AVAILABLE_TOOLBARS,
  StrategyIds,
});

export const DashboardSetToolbars = (StrategyIds: string[]): DashboardSetToolbarsAction => ({
  type: DASHBOARD_SET_TOOLBARS,
  StrategyIds,
});

export const DashboardShowToolbar = (StrategyId: string): DashboardShowToolbarAction => ({
  type: DASHBOARD_SHOW_TOOLBAR,
  StrategyId,
});

export const DashboardHideToolbar = (StrategyId: string): DashboardHideToolbarAction => ({
  type: DASHBOARD_HIDE_TOOLBAR,
  StrategyId,
});

export const DashboardMoveItem = (
  StrategyId: string,
  NewIndex: number
): DashboardMoveItemAction => ({
  type: DASHBOARD_MOVE_ITEM,
  StrategyId,
  NewIndex,
});

export const DashboardSetFunctionButtons = (
  StrategyIds: string[]
): DashboardSetFunctionButtonsAction => ({
  type: DASHBOARD_SET_FUNCTION_BUTTONS,
  StrategyIds,
});

export const DashboardSetZoom = (Zoom: Number): DashboardSetZoomAction => ({
  type: DASHBOARD_SET_ZOOM,
  Zoom,
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

export const DashboardShowAboutButton = (): DashboardShowAboutButtonAction => ({
  type: DASHBOARD_SHOW_ABOUT_BUTTON,
});

export const DashboardHideAboutButton = (): DashboardHideAboutButtonAction => ({
  type: DASHBOARD_HIDE_ABOUT_BUTTON,
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

export const DashboardSetApplicationToolbarTitle = (
  Title: string
): DashboardSetHomeToolbarTitleAction => ({
  type: DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE,
  Title,
});

export const DashboardUseSingleColourForButtons = (): DashboardUseSingleColourForButtonsAction => ({
  type: DASHBOARD_USE_SINGLE_COLOUR_FOR_BUTTONS,
});

export const DashboardUseMultipleColourForButtons = (): DashboardUseMultipleColourForButtonsAction => ({
  type: DASHBOARD_USE_MULTIPLE_COLOUR_FOR_BUTTONS,
});

export const DashboardUseExtraSmallButtons = (): DashboardUseExtraSmallButtonsAction => ({
  type: DASHBOARD_USE_EXTRA_SMALL_BUTTONS,
});

export const DashboardUseDefaultSizeButtons = (): DashboardUseDefaultSizeButtonsAction => ({
  type: DASHBOARD_USE_DEFAULT_SIZE_BUTTONS,
});

const initialDashboardState: DashboardState = {
  AvailableToolbars: [
    StrategyConstants.AdvancedSearchStrategyId,
    StrategyConstants.AlertStrategyId,
    StrategyConstants.ApplicationStrategyId,
    StrategyConstants.BulkUpdateStrategyId,
    StrategyConstants.CellSummaryStrategyId,
    StrategyConstants.ChartStrategyId,
    StrategyConstants.ColumnFilterStrategyId,
    StrategyConstants.DataSourceStrategyId,
    StrategyConstants.ExportStrategyId,
    StrategyConstants.LayoutStrategyId,
    StrategyConstants.SmartEditStrategyId,
    StrategyConstants.QuickSearchStrategyId,
    StrategyConstants.ThemeStrategyId,
  ],
  VisibleToolbars: [
    StrategyConstants.QuickSearchStrategyId,
    StrategyConstants.LayoutStrategyId,
    StrategyConstants.ExportStrategyId,
    StrategyConstants.ColumnFilterStrategyId,
  ],
  VisibleButtons: [
    StrategyConstants.DashboardStrategyId,
    StrategyConstants.SmartEditStrategyId,
    StrategyConstants.ColumnChooserStrategyId,
    StrategyConstants.ConditionalStyleStrategyId,
    StrategyConstants.TeamSharingStrategyId,
  ],
  Zoom: 0.9,
  DashboardVisibility: Visibility.Visible,
  ShowSystemStatusButton: true,
  ShowAboutButton: true,
  ShowFunctionsDropdown: true,
  ShowColumnsDropdown: true,
  ShowToolbarsDropdown: true,
  HomeToolbarTitle: '',
  ApplicationToolbarTitle: '',
  UseSingleColourForButtons: true,
  UseExtraSmallButtons: false,
};

export const DashboardReducer: Redux.Reducer<DashboardState> = (
  state: DashboardState = initialDashboardState,
  action: Redux.Action
): DashboardState => {
  let index: number;
  let dashboardControls: string[];

  switch (action.type) {
    case DASHBOARD_SET_AVAILABLE_TOOLBARS:
      return Object.assign({}, state, {
        AvailableToolbars: (<DashboardSetAvailableToolbarsAction>action).StrategyIds,
      });
    case DASHBOARD_SET_TOOLBARS: {
      let actionTyped = <DashboardSetToolbarsAction>action;
      let dashboardToolbars = actionTyped.StrategyIds;
      return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
    }
    case DASHBOARD_MOVE_ITEM: {
      let actionTyped = <DashboardMoveItemAction>action;
      dashboardControls = [].concat(state.VisibleToolbars);
      index = dashboardControls.findIndex(a => a == actionTyped.StrategyId);
      ArrayExtensions.moveArray(dashboardControls, index, actionTyped.NewIndex);
      return Object.assign({}, state, { VisibleToolbars: dashboardControls });
    }
    case DASHBOARD_SHOW_TOOLBAR: {
      let actionTyped = <DashboardShowToolbarAction>action;
      let dashboardToolbars = [].concat(state.VisibleToolbars);
      dashboardToolbars.push(actionTyped.StrategyId);
      return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
    }
    case DASHBOARD_HIDE_TOOLBAR: {
      let actionTyped = <DashboardHideToolbarAction>action;
      let dashboardToolbars = [].concat(state.VisibleToolbars);
      index = dashboardToolbars.findIndex(a => a == actionTyped.StrategyId);
      dashboardToolbars.splice(index, 1);
      return Object.assign({}, state, { VisibleToolbars: dashboardToolbars });
    }
    case DASHBOARD_SET_FUNCTION_BUTTONS: {
      let actionTyped = <DashboardSetFunctionButtonsAction>action;
      let dashboardFunctionButtons = actionTyped.StrategyIds;
      return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
    }
    case DASHBOARD_SET_ZOOM: {
      let actionTyped = <DashboardSetZoomAction>action;
      return Object.assign({}, state, { Zoom: actionTyped.Zoom });
    }
    case DASHBOARD_SET_VISIBILITY: {
      let actionTyped = <DashboardSetVisibilityAction>action;
      return Object.assign({}, state, { DashboardVisibility: actionTyped.Visibility });
    }
    case DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON: {
      return Object.assign({}, state, { ShowSystemStatusButton: true });
    }

    case DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON: {
      return Object.assign({}, state, { ShowSystemStatusButton: false });
    }
    case DASHBOARD_SHOW_ABOUT_BUTTON: {
      return Object.assign({}, state, { ShowAboutButton: true });
    }

    case DASHBOARD_HIDE_ABOUT_BUTTON: {
      return Object.assign({}, state, { ShowAboutButton: false });
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
      let actionTyped = <DashboardSetHomeToolbarTitleAction>action;
      return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
    }

    case DASHBOARD_SET_APPLICATION_TOOLBAR_TITLE: {
      let actionTyped = <DashboardSetApplicationToolbarTitleAction>action;
      return Object.assign({}, state, { ApplicationToolbarTitle: actionTyped.Title });
    }
    case DASHBOARD_USE_SINGLE_COLOUR_FOR_BUTTONS: {
      return Object.assign({}, state, { UseSingleColourForButtons: true });
    }
    case DASHBOARD_USE_MULTIPLE_COLOUR_FOR_BUTTONS: {
      return Object.assign({}, state, { UseSingleColourForButtons: false });
    }
    case DASHBOARD_USE_EXTRA_SMALL_BUTTONS: {
      return Object.assign({}, state, { UseExtraSmallButtons: true });
    }
    case DASHBOARD_USE_DEFAULT_SIZE_BUTTONS: {
      return Object.assign({}, state, { UseExtraSmallButtons: false });
    }

    default:
      return state;
  }
};
