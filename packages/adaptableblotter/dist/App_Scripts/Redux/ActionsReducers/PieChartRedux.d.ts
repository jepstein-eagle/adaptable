import * as Redux from 'redux';
import { PieChartState } from './Interface/IState';
export interface PieChartSelectAction extends Redux.Action {
    PieChart: string;
}
export declare const PieChartSelect: (PieChart: string) => PieChartSelectAction;
export declare const PieChartReducer: Redux.Reducer<PieChartState>;
