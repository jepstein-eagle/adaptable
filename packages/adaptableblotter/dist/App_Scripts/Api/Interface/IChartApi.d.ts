import { ChartState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IChartApi {
    GetState(): ChartState;
}
