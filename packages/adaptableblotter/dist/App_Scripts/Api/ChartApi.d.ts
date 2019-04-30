import { ApiBase } from "./ApiBase";
import { IChartApi } from "./Interface/IChartApi";
import { ChartState } from "../Redux/ActionsReducers/Interface/IState";
export declare class ChartApi extends ApiBase implements IChartApi {
    getChartState(): ChartState;
}
