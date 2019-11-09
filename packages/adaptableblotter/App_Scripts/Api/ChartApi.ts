import { ChartState } from '../PredefinedConfig/ChartState';

export interface ChartApi {
  getChartState(): ChartState;

  /**
   * Opens the Chart popup screen
   */
  showChartPopup(): void;
}
