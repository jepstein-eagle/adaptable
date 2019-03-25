import { ICategoryChartDefinition, IPieChartDefinition } from "../../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from "../../Interface/IColumn";

export interface IChartService {
  BuildCategoryChartData(chartDefinition: ICategoryChartDefinition , columns: IColumn[]): any // to change

  BuildPieChartData(chartDefinition:IPieChartDefinition): any[]
}
