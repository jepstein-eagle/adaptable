import * as Redux from 'redux';
import { ChartState } from './Interface/IState'
import { IChartDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';

export const CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
export const CHART_DEFINITION_ADD_UPDATE = 'CHART_DEFINITION_ADD_UPDATE';
export const CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
export const CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';

export interface ChartDefinitionAddUpdateAction extends Redux.Action {
    Index: number
    ChartDefinition: IChartDefinition
}


export interface ChartDefinitionDeleteAction extends Redux.Action {
    ChartDefinition: IChartDefinition
}

export const ChartDefinitionAddUpdate = (Index: number, ChartDefinition: IChartDefinition): ChartDefinitionAddUpdateAction => ({
    type: CHART_DEFINITION_ADD_UPDATE,
    Index,
    ChartDefinition
})


export const ChartDefinitionDelete = (ChartDefinition: IChartDefinition): ChartDefinitionDeleteAction => ({
    type: CHART_DEFINITION_DELETE,
    ChartDefinition
})

export interface ChartDefinitionSelectAction extends Redux.Action {
    SelectedChartDefinitionTitle: string
}

export const ChartDefinitionSelect = (SelectedChartDefinitionTitle: string): ChartDefinitionSelectAction => ({
    type: CHART_DEFINITION_SELECT,
    SelectedChartDefinitionTitle
})

const initialChartState: ChartState = {
    ChartDefinitions: [],
    CurrentChart: '',
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
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions })//, CurrentAdvancedSearch: currentSearchName })

        case CHART_DEFINITION_DELETE:
            chartDefinitions = [].concat(state.ChartDefinitions);
            let index = chartDefinitions.findIndex(x => x.Title == (<ChartDefinitionDeleteAction>action).ChartDefinition.Title)
            chartDefinitions.splice(index, 1);
            return Object.assign({}, state, {
                ChartDefinitions: chartDefinitions
            });

        case CHART_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChart: (<ChartDefinitionSelectAction>action).SelectedChartDefinitionTitle })

        default:
            return state
    }
}