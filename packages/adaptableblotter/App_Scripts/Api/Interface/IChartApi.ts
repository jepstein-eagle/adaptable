import { ChartState } from '../../PredefinedConfig/IUserState/ChartState';

export interface IChartApi {
  getChartState(): ChartState;
}
