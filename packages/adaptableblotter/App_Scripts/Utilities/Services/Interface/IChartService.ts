import {
  CategoryChartDefinition,
  ChartData,
  PieChartDefinition,
  SparklinesChartDefinition,
} from '../../../PredefinedConfig/ChartState';
import { AdaptableBlotterColumn } from '../../Interface/AdaptableBlotterColumn';

export interface IChartService {
  BuildCategoryChartData(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableBlotterColumn[]
  ): ChartData;

  BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;

  BuildSparklinesChartData(
    chartDefinition: SparklinesChartDefinition,
    columns: AdaptableBlotterColumn[]
  ): ChartData;
}
