import { ICategoryChartDefinition, IPieChartDefinition, IPieChartDataItem, IChartData } from "../../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from "../../Interface/IColumn";

export interface IChartService {
  BuildCategoryChartData(chartDefinition: ICategoryChartDefinition , columns: IColumn[]): IChartData

  BuildPieChartData(chartDefinition:IPieChartDefinition): IChartData 
}
