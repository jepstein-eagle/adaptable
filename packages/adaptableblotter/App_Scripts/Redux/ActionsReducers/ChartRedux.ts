import * as Redux from 'redux';
import { ChartState } from './Interface/IState'
import { IChartDefinition, ICategoryChartProperties, IChartProperties } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { EMPTY_ARRAY, EMPTY_STRING, CHART_DEFAULT_SHOW_MODAL, CHART_DEFAULT_REFRESH_RATE } from '../../Utilities/Constants/GeneralConstants';

export const CHART_DEFINITION_ADD_UPDATE = 'CHART_DEFINITION_ADD_UPDATE';
export const CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';
export const CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
export const CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
export const CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';

export interface ChartDefinitionAddUpdateAction extends Redux.Action {
    Index: number
    ChartDefinition: IChartDefinition
}

export interface ChartPropertiesUpdateAction extends Redux.Action {
    ChartName: string
    ChartProperties: IChartProperties
}


export interface ChartDefinitionDeleteAction extends Redux.Action {
    ChartDefinition: IChartDefinition
}

export interface ChartDefinitionSelectAction extends Redux.Action {
    CurrentChartName: string
}

export const ChartDefinitionAddUpdate = (Index: number, ChartDefinition: IChartDefinition): ChartDefinitionAddUpdateAction => ({
    type: CHART_DEFINITION_ADD_UPDATE,
    Index,
    ChartDefinition
})

export const ChartPropertiesUpdate = (ChartName: string, ChartProperties: IChartProperties): ChartPropertiesUpdateAction => ({
    type: CHART_PROPERTIES_UPDATE,
    ChartName,
    ChartProperties
})


export const ChartDefinitionDelete = (ChartDefinition: IChartDefinition): ChartDefinitionDeleteAction => ({
    type: CHART_DEFINITION_DELETE,
    ChartDefinition
})



export const ChartDefinitionSelect = (CurrentChartName: string): ChartDefinitionSelectAction => ({
    type: CHART_DEFINITION_SELECT,
    CurrentChartName
})

const initialChartState: ChartState = {
    ChartDefinitions: EMPTY_ARRAY,
    CurrentChartName: EMPTY_STRING,
    ShowModal: CHART_DEFAULT_SHOW_MODAL,
    RefreshRate: CHART_DEFAULT_REFRESH_RATE
}

export const ChartReducer: Redux.Reducer<ChartState> = (state: ChartState = initialChartState, action: Redux.Action): ChartState => {
    let chartDefinitions: IChartDefinition[]

    switch (action.type) {

        case CHART_DEFINITION_ADD_UPDATE:
            let actionTypedAddUpdate = (<ChartDefinitionAddUpdateAction>action)
            chartDefinitions = [].concat(state.ChartDefinitions)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                chartDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.ChartDefinition
            } else {
                chartDefinitions.push(actionTypedAddUpdate.ChartDefinition)
            }
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions })

        case CHART_PROPERTIES_UPDATE:
            let actionTypedPropertiesUpdate = (<ChartPropertiesUpdateAction>action)
            chartDefinitions = [].concat(state.ChartDefinitions)
            let chartDefinition: IChartDefinition = chartDefinitions.find(c => c.Name == actionTypedPropertiesUpdate.ChartName)
            chartDefinition.ChartProperties = actionTypedPropertiesUpdate.ChartProperties;
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions })

        case CHART_DEFINITION_DELETE:
            chartDefinitions = [].concat(state.ChartDefinitions);
            let index = chartDefinitions.findIndex(x => x.Name == (<ChartDefinitionDeleteAction>action).ChartDefinition.Name)
            chartDefinitions.splice(index, 1);
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

        case CHART_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartName: (<ChartDefinitionSelectAction>action).CurrentChartName })

        default:
            return state
    }
}