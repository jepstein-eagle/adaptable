
import * as Redux from 'redux';
import { ChartInternalState } from './Interface/IState';

const CHART_INTERNAL_SHOW_CHART = 'CHART_INTERNAL_SHOW_CHART';
const CHART_INTERNAL_HIDE_CHART = 'CHART_INTERNAL_HIDE_CHART';
const CHART_INTERNAL_SET_CHART_DATA = 'CHART_INTERNAL_SET_CHART_DATA';



export interface ChartInternalShowChartAction extends Redux.Action {

}

export interface ChartInternalHideChartAction extends Redux.Action {

}

export interface ChartInternalSetChartDataAction extends Redux.Action {
    chartData: any
}

export const ChartInternalShowChart = (): ChartInternalShowChartAction => ({
    type: CHART_INTERNAL_SHOW_CHART
})

export const ChartInternalHideChart = (): ChartInternalHideChartAction => ({
    type: CHART_INTERNAL_HIDE_CHART,
})

export const ChartInternalSetChartData = (chartData: any): ChartInternalSetChartDataAction => ({
    type: CHART_INTERNAL_SET_CHART_DATA,
    chartData
})

const initialChartInternalState: ChartInternalState = {
    ChartData: null,
    ChartVisible: false
}

export const ChartInternalReducer: Redux.Reducer<ChartInternalState> = (state: ChartInternalState = initialChartInternalState, action: Redux.Action): ChartInternalState => {
    switch (action.type) {
        case CHART_INTERNAL_SHOW_CHART:
            return Object.assign({}, state, { ChartVisible: true })
        case CHART_INTERNAL_HIDE_CHART:
            return Object.assign({}, state, { ChartVisible: false })
        case CHART_INTERNAL_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: (<ChartInternalSetChartDataAction>action).chartData })
        default:
            return state
    }
}