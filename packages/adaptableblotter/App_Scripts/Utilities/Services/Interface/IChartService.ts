import {
  CategoryChartDefinition,
  ChartData,
  PieChartDefinition,
  SparklinesChartDefinition,
} from '../../../PredefinedConfig/RunTimeState/ChartState';
import { IColumn } from '../../Interface/IColumn';

export interface IChartService {
  BuildCategoryChartData(chartDefinition: CategoryChartDefinition, columns: IColumn[]): ChartData;

  BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;

  BuildSparklinesChartData(chartDefinition: SparklinesChartDefinition): ChartData;
}
