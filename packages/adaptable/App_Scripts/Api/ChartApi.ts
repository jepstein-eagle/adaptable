import { ChartState, ChartDefinition } from '../PredefinedConfig/ChartState';

export interface ChartApi {
  getChartState(): ChartState;

  /**
   * Returns all the Chart Definitions in the State
   */
  getAllChartDefinitions(): ChartDefinition[];

  /**
   * Opens the Chart popup screen
   */
  showChartPopup(): void;
}
