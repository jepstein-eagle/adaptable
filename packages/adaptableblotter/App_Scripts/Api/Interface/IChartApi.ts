import { ChartState } from '../../PredefinedConfig/RunTimeState/ChartState';

export interface IChartApi {
  getChartState(): ChartState;

  /**
   * Opens the Chart popup screen
   */
  showChartPopup(): void;
}
