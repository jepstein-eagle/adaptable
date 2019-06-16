import {
  CategoryChartDefinition,
  ChartData,
  PieChartDefinition,
} from '../../../PredefinedConfig/IUserState/ChartState';
import { IColumn } from '../../Interface/IColumn';

export interface IChartService {
  BuildCategoryChartData(chartDefinition: CategoryChartDefinition, columns: IColumn[]): ChartData;

  BuildPieChartData(chartDefinition: PieChartDefinition): ChartData;
}
