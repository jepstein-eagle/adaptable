import {
  ICategoryChartDefinition,
  IChartData,
  IPieChartDefinition,
} from '../../../PredefinedConfig/IUserState Interfaces/ChartState';
import { IColumn } from '../../Interface/IColumn';

export interface IChartService {
  BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): IChartData;

  BuildPieChartData(chartDefinition: IPieChartDefinition): IChartData;
}
