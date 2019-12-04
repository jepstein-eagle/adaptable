import * as Redux from 'redux';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common/Enums';

const TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
export const TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';

const TOOLPANEL_SHOW_TOOLBAR = 'TOOLPANEL_SHOW_TOOLBAR';
const TOOLPANEL_HIDE_TOOLBAR = 'TOOLPANEL_HIDE_TOOLBAR';

export interface ToolPanelSetAvailableToolPanelsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface ToolPanelSetToolPanelsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface ToolPanelShowToolPanelAction extends Redux.Action {
  StrategyId: string;
}

export interface ToolPanelHideToolPanelAction extends Redux.Action {
  StrategyId: string;
}

export const ToolPanelSetAvailableToolPanels = (
  StrategyIds: string[]
): ToolPanelSetAvailableToolPanelsAction => ({
  type: TOOLPANEL_SET_AVAILABLE_TOOLPANELS,
  StrategyIds,
});

export const ToolPanelSetToolPanels = (StrategyIds: string[]): ToolPanelSetToolPanelsAction => ({
  type: TOOLPANEL_SET_TOOLPANELS,
  StrategyIds,
});

export const ToolPanelShowToolPanel = (StrategyId: string): ToolPanelShowToolPanelAction => ({
  type: TOOLPANEL_SHOW_TOOLBAR,
  StrategyId,
});

export const ToolPanelHideToolPanel = (StrategyId: string): ToolPanelHideToolPanelAction => ({
  type: TOOLPANEL_HIDE_TOOLBAR,
  StrategyId,
});

const initialToolPanelState: ToolPanelState = {
  AvailableToolPanels: [
    StrategyConstants.DashboardStrategyId,
    StrategyConstants.AdvancedSearchStrategyId,
    //  StrategyConstants.AlertStrategyId,
    //   StrategyConstants.ApplicationStrategyId,
    //    StrategyConstants.BulkUpdateStrategyId,
    //   StrategyConstants.CellSummaryStrategyId,
    //    StrategyConstants.ChartStrategyId,//
    //   StrategyConstants.ColumnFilterStrategyId,/
    //   StrategyConstants.DataSourceStrategyId,
    ///   StrategyConstants.ExportStrategyId,
    StrategyConstants.LayoutStrategyId, //
    StrategyConstants.QuickSearchStrategyId,

    //    StrategyConstants.ThemeStrategyId,
    //    StrategyConstants.SystemStatusStrategyId,
  ],
  VisibleToolPanels: [
    StrategyConstants.DashboardStrategyId,
    StrategyConstants.QuickSearchStrategyId,
    StrategyConstants.AdvancedSearchStrategyId,
    StrategyConstants.LayoutStrategyId,
    // StrategyConstants.ExportStrategyId,
    //   StrategyConstants.ColumnFilterStrategyId,
  ],
};

export const ToolPanelReducer: Redux.Reducer<ToolPanelState> = (
  state: ToolPanelState = initialToolPanelState,
  action: Redux.Action
): ToolPanelState => {
  const setToolPanels = (state: ToolPanelState, toolPanels: string[]): ToolPanelState => {
    return { ...state, VisibleToolPanels: toolPanels };
  };

  switch (action.type) {
    case TOOLPANEL_SET_AVAILABLE_TOOLPANELS:
      return Object.assign({}, state, {
        AvailableToolPanels: (action as ToolPanelSetAvailableToolPanelsAction).StrategyIds,
      });
    case TOOLPANEL_SET_TOOLPANELS: {
      const actionTyped = action as ToolPanelSetToolPanelsAction;
      const toolPanels = actionTyped.StrategyIds;
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_SHOW_TOOLBAR: {
      const actionTyped = action as ToolPanelShowToolPanelAction;
      const toolPanels = [...state.VisibleToolPanels!];
      toolPanels.push(actionTyped.StrategyId);
      return setToolPanels(state, toolPanels);
    }
    case TOOLPANEL_HIDE_TOOLBAR: {
      const actionTyped = action as ToolPanelHideToolPanelAction;
      const toolPanels = (state.VisibleToolPanels || []).filter(a => a !== actionTyped.StrategyId);
      return setToolPanels(state, toolPanels);
    }

    default:
      return state;
  }
};
