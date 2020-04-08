import {
  CategoryChartDefinition,
  ChartData,
  PieChartDefinition,
  SparklinesChartDefinition,
  FinancialChartDefinition,
} from '../../../PredefinedConfig/ChartState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';

export interface IChartService {
  BuildCategoryChartData(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData;

  BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;
  BuildFinancialChartData(chartDefinition: FinancialChartDefinition): ChartData;

  BuildSparklinesChartData(
    chartDefinition: SparklinesChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData;
}
