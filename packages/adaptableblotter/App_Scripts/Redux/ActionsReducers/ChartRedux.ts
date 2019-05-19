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

export const CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
export const CHART_DEFINITION_ADD = 'CHART_DEFINITION_ADD';
export const CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
export const CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
export const CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';

export interface ChartDefinitionAddAction extends Redux.Action {
  ChartDefinition: IChartDefinition;
}

export interface ChartDefinitionEditAction extends Redux.Action {
  Index: number;
  ChartDefinition: IChartDefinition;
}

export interface ChartDefinitionDeleteAction extends Redux.Action {
  ChartDefinition: IChartDefinition;
}

export interface ChartDefinitionSelectAction extends Redux.Action {
  CurrentChartName: string;
}

export interface ChartPropertiesUpdateAction extends Redux.Action {
  ChartName: string;
  ChartProperties: IChartProperties;
}

export const ChartDefinitionAdd = (
  ChartDefinition: IChartDefinition
): ChartDefinitionAddAction => ({
  type: CHART_DEFINITION_ADD,
  ChartDefinition,
});

export const ChartDefinitionEdit = (
  Index: number,
  ChartDefinition: IChartDefinition
): ChartDefinitionEditAction => ({
  type: CHART_DEFINITION_EDIT,
  Index,
  ChartDefinition,
});

export const ChartDefinitionDelete = (
  ChartDefinition: IChartDefinition
): ChartDefinitionDeleteAction => ({
  type: CHART_DEFINITION_DELETE,
  ChartDefinition,
});

export const ChartDefinitionSelect = (CurrentChartName: string): ChartDefinitionSelectAction => ({
  type: CHART_DEFINITION_SELECT,
  CurrentChartName,
});

const initialChartState: ChartState = {
  ChartDefinitions: [],
  CurrentChartName: EMPTY_STRING,
  RefreshRate: CHART_DEFAULT_REFRESH_RATE,
};

export const ChartPropertiesUpdate = (
  ChartName: string,
  ChartProperties: IChartProperties
): ChartPropertiesUpdateAction => ({
  type: CHART_PROPERTIES_UPDATE,
  ChartName,
  ChartProperties,
});

export const ChartReducer: Redux.Reducer<ChartState> = (
  state: ChartState = initialChartState,
  action: Redux.Action
): ChartState => {
  let chartDefinitions: IChartDefinition[];

  switch (action.type) {
    case CHART_DEFINITION_ADD:
      let actionTypedAdd = <ChartDefinitionAddAction>action;
      chartDefinitions = [].concat(state.ChartDefinitions);
      chartDefinitions.push(actionTypedAdd.ChartDefinition);
      return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

    case CHART_DEFINITION_EDIT:
      let actionTypedEdit = <ChartDefinitionEditAction>action;
      chartDefinitions = [].concat(state.ChartDefinitions);
      chartDefinitions[actionTypedEdit.Index] = actionTypedEdit.ChartDefinition;
      return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

    case CHART_PROPERTIES_UPDATE:
      let actionTypedPropertiesUpdate = <ChartPropertiesUpdateAction>action;
      chartDefinitions = [].concat(state.ChartDefinitions);
      let chartDefinition: IChartDefinition = chartDefinitions.find(
        c => c.Name == actionTypedPropertiesUpdate.ChartName
      );
      chartDefinition.ChartProperties = actionTypedPropertiesUpdate.ChartProperties;
      return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

    case CHART_DEFINITION_DELETE:
      chartDefinitions = [].concat(state.ChartDefinitions);
      let index = chartDefinitions.findIndex(
        x => x.Name == (<ChartDefinitionDeleteAction>action).ChartDefinition.Name
      );
      chartDefinitions.splice(index, 1);
      return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

    case CHART_DEFINITION_SELECT:
      return Object.assign({}, state, {
        CurrentChartName: (<ChartDefinitionSelectAction>action).CurrentChartName,
      });

    default:
      return state;
  }
};
