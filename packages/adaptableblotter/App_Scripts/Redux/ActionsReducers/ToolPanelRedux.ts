import * as Redux from 'redux';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common/Enums';

const TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
export const TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';

export interface ToolPanelSetAvailableToolPanelsAction extends Redux.Action {
  StrategyIds: string[];
}

export interface ToolPanelSetToolPanelsAction extends Redux.Action {
  StrategyIds: string[];
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

const initialToolPanelState: ToolPanelState = {
  AvailableToolPanels: [
    StrategyConstants.AdvancedSearchStrategyId,
    //  StrategyConstants.AlertStrategyId,
    //   StrategyConstants.ApplicationStrategyId,
    //    StrategyConstants.BulkUpdateStrategyId,
    //   StrategyConstants.CellSummaryStrategyId,
    //    StrategyConstants.ChartStrategyId,//
    //   StrategyConstants.ColumnFilterStrategyId,/
    //   StrategyConstants.DataSourceStrategyId,
    ///   StrategyConstants.ExportStrategyId,
    //    StrategyConstants.LayoutStrategyId,//
    StrategyConstants.SmartEditStrategyId,
    StrategyConstants.QuickSearchStrategyId,
    //    StrategyConstants.ThemeStrategyId,
    //    StrategyConstants.SystemStatusStrategyId,
  ],
  VisibleToolPanels: [
    StrategyConstants.QuickSearchStrategyId,
    StrategyConstants.AdvancedSearchStrategyId,
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

    default:
      return state;
  }
};
