import * as Redux from 'redux';
import { ChartState } from './Interface/IState';
import { IChartDefinition, IChartProperties } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
export declare const CHART_DEFINITION_ADD_UPDATE = "CHART_DEFINITION_ADD_UPDATE";
export declare const CHART_PROPERTIES_UPDATE = "CHART_PROPERTIES_UPDATE";
export declare const CHART_DEFINITION_EDIT = "CHART_DEFINITION_EDIT";
export declare const CHART_DEFINITION_DELETE = "CHART_DEFINITION_DELETE";
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
export interface ChartDefinitionSelectAction extends Redux.Action {
    CurrentChartDefinition: string;
}
export declare const ChartDefinitionAddUpdate: (Index: number, ChartDefinition: IChartDefinition) => ChartDefinitionAddUpdateAction;
export declare const ChartPropertiesUpdate: (ChartTitle: string, ChartProperties: IChartProperties) => ChartPropertiesUpdateAction;
export declare const ChartDefinitionDelete: (ChartDefinition: IChartDefinition) => ChartDefinitionDeleteAction;
export declare const ChartDefinitionSelect: (CurrentChartDefinition: string) => ChartDefinitionSelectAction;
export declare const ChartReducer: Redux.Reducer<ChartState>;
