import * as Redux from 'redux';
import { PieChartState } from './Interface/IState'
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

//const PIE_CHART_SELECT = 'PIE_CHART_SELECT';


const initialPieChartState: PieChartState = {
    PieCharts: EMPTY_ARRAY
}

export const PieChartReducer: Redux.Reducer<PieChartState> = (state: PieChartState = initialPieChartState, action: Redux.Action): PieChartState => {
    switch (action.type) {
          default:
            return state
    }
}