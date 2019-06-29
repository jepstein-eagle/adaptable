import { ApiBase } from './ApiBase';
import { IChartApi } from './Interface/IChartApi';
import { ChartState } from '../PredefinedConfig/RunTimeState/ChartState';

export class ChartApi extends ApiBase implements IChartApi {
  public getChartState(): ChartState {
    return this.getBlotterState().Chart;
  }
}
