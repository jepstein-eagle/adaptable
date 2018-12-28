import * as Redux from 'redux';
import { ChartState } from './Interface/IState';
import { IChartDefinition, IChartProperties } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const CHART_DEFINITION_ADD_UPDATE = "CHART_DEFINITION_ADD_UPDATE";
export declare const CHART_PROPERTIES_UPDATE = "CHART_PROPERTIES_UPDATE";
export declare const CHART_DEFINITION_EDIT = "CHART_DEFINITION_EDIT";
export declare const CHART_DEFINITION_DELETE = "CHART_DEFINITION_DELETE";
export declare const CHART_SHOW_CHART = "CHART_SHOW_CHART";
export declare const CHART_HIDE_CHART = "CHART_HIDE_CHART";
export declare const CHART_DEFINITION_SELECT = "CHART_DEFINITION_SELECT";
export interface ChartDefinitionAddUpdateAction extends Redux.Action {
    Index: number;
    ChartDefinition: IChartDefinition;
}
export interface ChartPropertiesUpdateAction extends Redux.Action {
    ChartTitle: string;
    ChartProperties: IChartProperties;
}
export interface ChartDefinitionDeleteAction extends Redux.Action {
    ChartDefinition: IChartDefinition;
}
export interface ChartShowChartAction extends Redux.Action {
}
export interface ChartHideChartAction extends Redux.Action {
}
export interface ChartDefinitionSelectAction extends Redux.Action {
    CurrentChartDefinition: IChartDefinition;
}
export declare const ChartDefinitionAddUpdate: (Index: number, ChartDefinition: IChartDefinition) => ChartDefinitionAddUpdateAction;
export declare const ChartPropertiesUpdate: (ChartTitle: string, ChartProperties: IChartProperties) => ChartPropertiesUpdateAction;
export declare const ChartDefinitionDelete: (ChartDefinition: IChartDefinition) => ChartDefinitionDeleteAction;
export declare const ChartShowChart: () => ChartShowChartAction;
export declare const ChartHideChart: () => ChartHideChartAction;
export declare const ChartDefinitionSelect: (CurrentChartDefinition: IChartDefinition) => ChartDefinitionSelectAction;
export declare const ChartReducer: Redux.Reducer<ChartState>;
