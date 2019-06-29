import { ChartState } from '../../PredefinedConfig/RunTimeState/ChartState';

export interface IChartApi {
  getChartState(): ChartState;
}
