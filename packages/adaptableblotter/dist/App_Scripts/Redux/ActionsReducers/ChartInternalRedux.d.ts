import * as Redux from 'redux';
import { ChartInternalState } from './Interface/IState';
import { IChartDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const CHART_INTERNAL_SHOW_CHART = "CHART_INTERNAL_SHOW_CHART";
export declare const CHART_INTERNAL_HIDE_CHART = "CHART_INTERNAL_HIDE_CHART";
export declare const CHART_INTERNAL_SET_CHART_DATA = "CHART_INTERNAL_SET_CHART_DATA";
export declare const CHART_INTERNAL_DEFINITION_SELECT = "CHART_INTERNAL_DEFINITION_SELECT";
export interface ChartInternalShowChartAction extends Redux.Action {
}
export interface ChartInternalHideChartAction extends Redux.Action {
}
export interface ChartInternalSetChartDataAction extends Redux.Action {
    chartData: any;
}
export declare const ChartInternalShowChart: () => ChartInternalShowChartAction;
export declare const ChartInternalHideChart: () => ChartInternalHideChartAction;
export declare const ChartInternalSetChartData: (chartData: any) => ChartInternalSetChartDataAction;
export interface ChartDefinitionSelectAction extends Redux.Action {
    CurrentChartDefinition: IChartDefinition;
}
export declare const ChartDefinitionSelect: (CurrentChartDefinition: IChartDefinition) => ChartDefinitionSelectAction;
export declare const ChartInternalReducer: Redux.Reducer<ChartInternalState>;
