
import { ApiBase } from "./ApiBase";
import { IChartApi } from "./Interface/IChartApi";
import { ChartState } from "../Redux/ActionsReducers/Interface/IState";

export class ChartApi extends ApiBase implements IChartApi {

  public GetState(): ChartState {
    return this.getBlotterState().Chart;
}

  
}