import { ChartState } from '../PredefinedConfig/RunTimeState/ChartState';

export interface ChartApi {
  getChartState(): ChartState;

  /**
   * Opens the Chart popup screen
   */
  showChartPopup(): void;
}
