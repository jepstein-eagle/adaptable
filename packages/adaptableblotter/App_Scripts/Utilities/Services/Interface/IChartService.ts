import {
  CategoryChartDefinition,
  ChartData,
  PieChartDefinition,
  SparklinesChartDefinition,
} from '../../../PredefinedConfig/ChartState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';

export interface IChartService {
  BuildCategoryChartData(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData;

  BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;

  BuildSparklinesChartData(
    chartDefinition: SparklinesChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData;
}
