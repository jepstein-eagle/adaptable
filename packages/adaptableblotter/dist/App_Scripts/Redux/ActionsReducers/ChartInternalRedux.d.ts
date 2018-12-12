import * as Redux from 'redux';
import { ChartInternalState } from './Interface/IState';
import { IChartDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
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
