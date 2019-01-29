import { IChartDefinition } from "../../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from "../../Interface/IColumn";

export interface IChartService {
  BuildChartData(chartDefinition: IChartDefinition , columns: IColumn[]): any // to change
}