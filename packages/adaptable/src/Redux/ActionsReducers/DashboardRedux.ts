import * as Redux from 'redux';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ButtonStyle } from '../../PredefinedConfig/Common/ToolbarButton';
import {
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
import {
  DashboardState,
  CustomToolbar,
  AdaptableCoordinate,
  DashboardTab,
} from '../../PredefinedConfig/DashboardState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
const DASHBOARD_CUSTOM_TOOLBAR_EDIT = 'DASHBOARD_CUSTOM_TOOLBAR_EDIT';
export const DASHBOARD_SET_ACTIVE_TAB = 'DASHBOARD_SET_ACTIVE_TAB';
export const DASHBOARD_SET_IS_COLLAPSED = 'DASHBOARD_SET_IS_COLLAPSED';
export const DASHBOARD_SET_IS_FLOATING = 'DASHBOARD_SET_IS_FLOATING';
export const DASHBOARD_SET_IS_INLINE = 'DASHBOARD_SET_IS_INLINE';
const DASHBOARD_SET_FLOATING_POSITION = 'DASHBOARD_SET_FLOATING_POSITION';
export const DASHBOARD_SET_TABS = 'DASHBOARD_SET_TABS';
const DASHBOARD_CREATE_DEFAULT_TAB = 'DASHBOARD_CREATE_DEFAULT_TAB';

export interface DashboardShowToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar | string;
}

export interface DashboardHideToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar | string;
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

export interface DashboardShowFunctionsDropdownAction extends Redux.Action {}

export interface DashboardHideFunctionsDropdownAction extends Redux.Action {}

export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
  Title: string;
}

export interface DashboardSetMinimisedHomeToolbarButtonStyleAction extends Redux.Action {
  ButtonStyle: ButtonStyle;
}

export interface DashboardCustomToolbarEditAction extends Redux.Action {
  customToolbar: CustomToolbar;
}

export interface DashboardSetActiveTabAction extends Redux.Action {
  ActiveTab: number | null;
}

export interface DashboardSetIsCollapsedAction extends Redux.Action {
  IsCollapsed: boolean;
}

export interface DashboardSetIsFloatingAction extends Redux.Action {
  IsFloating: boolean;
}

export interface DashboardSetIsInlineAction extends Redux.Action {
  IsInline: boolean;
}

export interface DashboardSetFloatingPositionAction extends Redux.Action {
  FloatingPosition: AdaptableCoordinate;
}

export interface DashboardSetTabsAction extends Redux.Action {
  Tabs: DashboardTab[];
}

export interface DashboardCreateDefaultTabAction extends Redux.Action {}

export const DashboardSetFunctionButtons = (
  functionButtons: AdaptableFunctionButtons
): DashboardSetFunctionButtonsAction => ({
  type: DASHBOARD_SET_FUNCTION_BUTTONS,
  functionButtons,
});

export const DashboardSetHomeToolbarTitle = (
  Title: string
): DashboardSetHomeToolbarTitleAction => ({
  type: DASHBOARD_SET_HOME_TOOLBAR_TITLE,
  Title,
});

export const DashboardCustomToolbarEdit = (
  customToolbar: CustomToolbar
): DashboardCustomToolbarEditAction => ({
  type: DASHBOARD_CUSTOM_TOOLBAR_EDIT,
  customToolbar,
});

export const DashboardSetActiveTab = (ActiveTab: number | null): DashboardSetActiveTabAction => ({
  type: DASHBOARD_SET_ACTIVE_TAB,
  ActiveTab,
});

export const DashboardSetIsCollapsed = (IsCollapsed: boolean): DashboardSetIsCollapsedAction => ({
  type: DASHBOARD_SET_IS_COLLAPSED,
  IsCollapsed,
});

export const DashboardSetIsFloating = (IsFloating: boolean): DashboardSetIsFloatingAction => ({
  type: DASHBOARD_SET_IS_FLOATING,
  IsFloating,
});

export const DashboardSetIsInline = (IsInline: boolean): DashboardSetIsInlineAction => ({
  type: DASHBOARD_SET_IS_INLINE,
  IsInline,
});

export const DashboardSetFloatingPosition = (
  FloatingPosition: AdaptableCoordinate
): DashboardSetFloatingPositionAction => ({
  type: DASHBOARD_SET_FLOATING_POSITION,
  FloatingPosition,
});

export const DashboardSetTabs = (Tabs: DashboardTab[]): DashboardSetTabsAction => ({
  type: DASHBOARD_SET_TABS,
  Tabs,
});

export const DashboardCreateDefaultTab = (): DashboardCreateDefaultTabAction => ({
  type: DASHBOARD_CREATE_DEFAULT_TAB,
});

const initialDashboardState: DashboardState = {
  Tabs: undefined,
  ActiveTab: 0,
  IsCollapsed: false,
  IsFloating: false,
  IsInline: false,
  FloatingPosition: { x: 100, y: 100 },
  VisibleButtons: ['SystemStatus', 'GridInfo', 'ColumnChooser', 'ConditionalStyle'],
  CustomToolbars: EMPTY_ARRAY,
  ShowQuickSearchInHeader: true,
  ShowFunctionsDropdown: true,
  HomeToolbarTitle: '',

  // deprecated properties
  VisibleToolbars: ['Layout', 'Export', 'ColumnFilter'],
  AvailableToolbars: undefined,
  DashboardVisibility: undefined,
  ShowColumnsDropdown: undefined,
  ShowToolbarsDropdown: undefined,
  MinimisedHomeToolbarButtonStyle: undefined,
};

export const DashboardReducer: Redux.Reducer<DashboardState> = (
  state: DashboardState = initialDashboardState,
  action: Redux.Action
): DashboardState => {
  switch (action.type) {
    case DASHBOARD_SET_FUNCTION_BUTTONS: {
      const actionTyped = action as DashboardSetFunctionButtonsAction;
      const dashboardFunctionButtons = actionTyped.functionButtons;
      return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
    }

    case DASHBOARD_SET_HOME_TOOLBAR_TITLE: {
      const actionTyped = action as DashboardSetHomeToolbarTitleAction;
      return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
    }

    case DASHBOARD_CUSTOM_TOOLBAR_EDIT: {
      const actionTyped = action as DashboardCustomToolbarEditAction;
      const actionCustomSort: CustomToolbar = actionTyped.customToolbar;
      let customToolbars: CustomToolbar[] = state.CustomToolbars.map(abObject =>
        abObject.Uuid === actionCustomSort.Uuid ? actionCustomSort : abObject
      );
      return Object.assign({}, state, {
        CustomToolbars: customToolbars,
      });
    }

    case DASHBOARD_SET_ACTIVE_TAB: {
      const { ActiveTab } = action as DashboardSetActiveTabAction;
      return { ...state, ActiveTab };
    }

    case DASHBOARD_SET_IS_COLLAPSED: {
      const { IsCollapsed } = action as DashboardSetIsCollapsedAction;
      return { ...state, IsCollapsed };
    }

    case DASHBOARD_SET_IS_FLOATING: {
      const { IsFloating } = action as DashboardSetIsFloatingAction;
      return { ...state, IsFloating };
    }

    case DASHBOARD_SET_IS_INLINE: {
      const { IsInline } = action as DashboardSetIsInlineAction;
      return { ...state, IsInline };
    }

    case DASHBOARD_SET_FLOATING_POSITION: {
      const { FloatingPosition } = action as DashboardSetFloatingPositionAction;
      return { ...state, FloatingPosition };
    }

    case DASHBOARD_SET_TABS: {
      const { Tabs } = action as DashboardSetTabsAction;
      return { ...state, Tabs };
    }

    case DASHBOARD_CREATE_DEFAULT_TAB: {
      return {
        ...state,
        Tabs: [{ Name: 'Toolbars', Toolbars: state.VisibleToolbars }],
      };
    }

    default:
      return state;
  }
};
