import * as Redux from 'redux';
import { ChartState } from './Interface/IState';
import {
  IChartDefinition,
  IChartProperties,
} from '../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition';
import {
  EMPTY_STRING,
  CHART_DEFAULT_REFRESH_RATE,
} from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
export const CHART_DEFINITION_ADD = 'CHART_DEFINITION_ADD';
export const CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
export const CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
export const CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';

export interface ChartDefinitionAction extends Redux.Action {
  chartDefinition: IChartDefinition;
}
export interface ChartDefinitionAddAction extends ChartDefinitionAction {}

export interface ChartDefinitionEditAction extends ChartDefinitionAction {}

export interface ChartDefinitionDeleteAction extends ChartDefinitionAction {}

export interface ChartDefinitionSelectAction extends Redux.Action {
  chartName: string;
}

export interface ChartPropertiesUpdateAction extends Redux.Action {
  chartUuid: string;
  chartProperties: IChartProperties;
}

export const ChartDefinitionAdd = (
  chartDefinition: IChartDefinition
): ChartDefinitionAddAction => ({
  type: CHART_DEFINITION_ADD,
  chartDefinition,
});

export const ChartDefinitionEdit = (
  chartDefinition: IChartDefinition
): ChartDefinitionEditAction => ({
  type: CHART_DEFINITION_EDIT,
  chartDefinition,
});

export const ChartDefinitionDelete = (
  chartDefinition: IChartDefinition
): ChartDefinitionDeleteAction => ({
  type: CHART_DEFINITION_DELETE,
  chartDefinition,
});

export const ChartDefinitionSelect = (chartName: string): ChartDefinitionSelectAction => ({
  type: CHART_DEFINITION_SELECT,
  chartName,
});

export const ChartPropertiesUpdate = (
  chartUuid: string,
  chartProperties: IChartProperties
): ChartPropertiesUpdateAction => ({
  type: CHART_PROPERTIES_UPDATE,
  chartUuid,
  chartProperties,
});

const initialChartState: ChartState = {
  ChartDefinitions: [],
  CurrentChartName: EMPTY_STRING,
  RefreshRate: CHART_DEFAULT_REFRESH_RATE,
};

export const ChartReducer: Redux.Reducer<ChartState> = (
  state: ChartState = initialChartState,
  action: Redux.Action
): ChartState => {
  let chartDefinitions: IChartDefinition[];

  switch (action.type) {
    case CHART_DEFINITION_ADD: {
      const actionChartDefinition: IChartDefinition = (action as ChartDefinitionAction)
        .chartDefinition;

      if (!actionChartDefinition.Uuid) {
        actionChartDefinition.Uuid = createUuid();
      }
      chartDefinitions = [].concat(state.ChartDefinitions);
      chartDefinitions.push(actionChartDefinition);
      return { ...state, ChartDefinitions: chartDefinitions };
    }
    case CHART_DEFINITION_EDIT: {
      const actionChartDefinition: IChartDefinition = (action as ChartDefinitionAction)
        .chartDefinition;

      return {
        ...state,
        ChartDefinitions: state.ChartDefinitions.map(abObject =>
          abObject.Uuid === actionChartDefinition.Uuid ? actionChartDefinition : abObject
        ),
      };
    }

    case CHART_DEFINITION_DELETE: {
      const actionChartDefinition: IChartDefinition = (action as ChartDefinitionAction)
        .chartDefinition;
      return {
        ...state,
        ChartDefinitions: state.ChartDefinitions.filter(
          abObject => abObject.Uuid !== actionChartDefinition.Uuid
        ),
      };
    }

    case CHART_PROPERTIES_UPDATE: {
      let actionTypedPropertiesUpdate = <ChartPropertiesUpdateAction>action;
      chartDefinitions = [].concat(state.ChartDefinitions);
      let chartDefinition: IChartDefinition = chartDefinitions.find(
        c => c.Uuid == actionTypedPropertiesUpdate.chartUuid
      );
      chartDefinition.ChartProperties = actionTypedPropertiesUpdate.chartProperties;
      return Object.assign({}, state, { ChartDefinitions: chartDefinitions });
    }

    case CHART_DEFINITION_SELECT: {
      return Object.assign({}, state, {
        CurrentChartName: (<ChartDefinitionSelectAction>action).chartName,
      });
    }
    default:
      return state;
  }
};
