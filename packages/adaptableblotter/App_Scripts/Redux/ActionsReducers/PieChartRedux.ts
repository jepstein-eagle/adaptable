import * as Redux from 'redux';
import { PieChartState } from './Interface/IState'
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

const PIE_CHART_SELECT = 'PIE_CHART_SELECT';

export interface PieChartSelectAction extends Redux.Action {
    PieChart: string;
}

export const PieChartSelect = (PieChart: string): PieChartSelectAction => ({
    type: PIE_CHART_SELECT,
    PieChart
})

const initialPieChartState: PieChartState = {
    PieCharts: EMPTY_ARRAY
}

export const PieChartReducer: Redux.Reducer<PieChartState> = (state: PieChartState = initialPieChartState, action: Redux.Action): PieChartState => {
    switch (action.type) {
       case PIE_CHART_SELECT:
            return Object.assign({}, state, { CurrentPieChart: (<PieChartSelectAction>action).PieChart })
        default:
            return state
    }
}