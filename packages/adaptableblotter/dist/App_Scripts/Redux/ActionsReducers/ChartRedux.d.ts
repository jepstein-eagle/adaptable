import * as Redux from 'redux';
import { ChartState } from './Interface/IState';
import { IChartDefinition } from '../../Core/Api/Interface/AdaptableBlotterObjects';
export declare const CHART_DEFINITION_SELECT = "CHART_DEFINITION_SELECT";
export declare const CHART_DEFINITION_ADD_UPDATE = "CHART_DEFINITION_ADD_UPDATE";
export declare const CHART_DEFINITION_EDIT = "CHART_DEFINITION_EDIT";
export declare const CHART_DEFINITION_DELETE = "CHART_DEFINITION_DELETE";
export interface ChartDefinitionAddUpdateAction extends Redux.Action {
    Index: number;
    ChartDefinition: IChartDefinition;
}
export interface ChartDefinitionDeleteAction extends Redux.Action {
    ChartDefinition: IChartDefinition;
}
export declare const ChartDefinitionAddUpdate: (Index: number, ChartDefinition: IChartDefinition) => ChartDefinitionAddUpdateAction;
export declare const ChartDefinitionDelete: (ChartDefinition: IChartDefinition) => ChartDefinitionDeleteAction;
export interface ChartDefinitionSelectAction extends Redux.Action {
    SelectedChartDefinitionName: string;
}
export declare const ChartDefinitionSelect: (SelectedChartDefinitionName: string) => ChartDefinitionSelectAction;
export declare const ChartReducer: Redux.Reducer<ChartState>;
