import { ApiBase } from './ApiBase';
import { IChartApi } from './Interface/IChartApi';
import { ChartState } from '../PredefinedConfig/IUserState/ChartState';

export class ChartApi extends ApiBase implements IChartApi {
  public getChartState(): ChartState {
    return this.getBlotterState().Chart;
  }
}
